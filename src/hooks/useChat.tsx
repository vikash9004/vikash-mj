
import { useState, useEffect } from 'react';

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  content: string;
  timestamp: string;
}

export const useChat = (userId: string) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (userId) {
      // Load chat history from localStorage (in real app, this would be from backend)
      const storedMessages = localStorage.getItem(`chat_${userId}`);
      if (storedMessages) {
        setMessages(JSON.parse(storedMessages));
      }
    }
  }, [userId]);

  const sendMessage = async (content: string) => {
    if (!userId || !content.trim()) return;

    setLoading(true);
    
    const newMessage: Message = {
      id: Date.now().toString(),
      senderId: userId,
      senderName: 'User',
      content,
      timestamp: new Date().toISOString()
    };

    const updatedMessages = [...messages, newMessage];
    setMessages(updatedMessages);
    
    // Store in localStorage (in real app, this would be sent to backend)
    localStorage.setItem(`chat_${userId}`, JSON.stringify(updatedMessages));

    // Simulate auto-reply from Vikash (in real app, this would be real-time)
    setTimeout(() => {
      const autoReply: Message = {
        id: (Date.now() + 1).toString(),
        senderId: 'vikash',
        senderName: 'Vikash',
        content: "Thanks for your message! I'll get back to you soon. Feel free to tell me more about what you're looking for or ask any questions about my work experience.",
        timestamp: new Date().toISOString()
      };

      const finalMessages = [...updatedMessages, autoReply];
      setMessages(finalMessages);
      localStorage.setItem(`chat_${userId}`, JSON.stringify(finalMessages));
      setLoading(false);
    }, 1500);
  };

  return { messages, sendMessage, loading };
};
