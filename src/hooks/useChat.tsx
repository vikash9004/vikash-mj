
import { useState, useEffect } from 'react';
import { supabase } from './useAuth';

interface Message {
  id: string;
  sender_id: string;
  sender_name: string;
  content: string;
  created_at: string;
  conversation_id: string;
}

interface Conversation {
  id: string;
  user_id: string;
  user_name: string;
  user_email: string;
  last_message: string;
  last_message_at: string;
  unread_count: number;
}

export const useChat = (userId: string, isAdmin = false) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null);

  // Load conversations (for admin)
  useEffect(() => {
    if (isAdmin) {
      loadConversations();
    }
  }, [isAdmin]);

  // Load messages for specific conversation
  useEffect(() => {
    if (userId) {
      const conversationId = isAdmin ? selectedConversationId : `user_${userId}`;
      if (conversationId) {
        loadMessages(conversationId);
        subscribeToMessages(conversationId);
      }
    }
  }, [userId, selectedConversationId, isAdmin]);

  const loadConversations = async () => {
    try {
      const { data, error } = await supabase
        .from('conversations')
        .select(`
          *,
          user_profiles!conversations_user_id_fkey(name, email)
        `)
        .order('last_message_at', { ascending: false });

      if (error) throw error;

      const formattedConversations = data.map((conv: any) => ({
        id: conv.id,
        user_id: conv.user_id,
        user_name: conv.user_profiles.name,
        user_email: conv.user_profiles.email,
        last_message: conv.last_message,
        last_message_at: conv.last_message_at,
        unread_count: conv.unread_count
      }));

      setConversations(formattedConversations);
    } catch (error) {
      console.error('Error loading conversations:', error);
    }
  };

  const loadMessages = async (conversationId: string) => {
    try {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .eq('conversation_id', conversationId)
        .order('created_at', { ascending: true });

      if (error) throw error;
      setMessages(data || []);
    } catch (error) {
      console.error('Error loading messages:', error);
    }
  };

  const subscribeToMessages = (conversationId: string) => {
    const subscription = supabase
      .channel(`messages:${conversationId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `conversation_id=eq.${conversationId}`
        },
        (payload) => {
          setMessages(current => [...current, payload.new as Message]);
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  };

  const sendMessage = async (content: string, recipientId?: string) => {
    if (!userId || !content.trim()) return;

    setLoading(true);
    
    try {
      const conversationId = isAdmin && recipientId ? `user_${recipientId}` : `user_${userId}`;
      
      // Ensure conversation exists
      await ensureConversation(conversationId, recipientId || userId);

      // Get sender info
      const { data: senderData } = await supabase
        .from('user_profiles')
        .select('name')
        .eq('id', userId)
        .single();

      // Send message
      const { error } = await supabase
        .from('messages')
        .insert([
          {
            conversation_id: conversationId,
            sender_id: userId,
            sender_name: senderData?.name || 'User',
            content
          }
        ]);

      if (error) throw error;

      // Update conversation
      await supabase
        .from('conversations')
        .upsert({
          id: conversationId,
          user_id: recipientId || userId,
          last_message: content,
          last_message_at: new Date().toISOString(),
          unread_count: isAdmin ? 0 : 1
        });

    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setLoading(false);
    }
  };

  const ensureConversation = async (conversationId: string, targetUserId: string) => {
    const { error } = await supabase
      .from('conversations')
      .upsert({
        id: conversationId,
        user_id: targetUserId,
        last_message: '',
        last_message_at: new Date().toISOString(),
        unread_count: 0
      }, {
        onConflict: 'id'
      });

    if (error) {
      console.error('Error ensuring conversation:', error);
    }
  };

  const markAsRead = async (conversationId: string) => {
    await supabase
      .from('conversations')
      .update({ unread_count: 0 })
      .eq('id', conversationId);
  };

  return { 
    messages, 
    conversations,
    sendMessage, 
    loading,
    selectedConversationId,
    setSelectedConversationId,
    markAsRead,
    loadConversations
  };
};
