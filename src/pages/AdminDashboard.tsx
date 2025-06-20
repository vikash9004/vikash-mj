
import React, { useState, useEffect } from 'react';
import { MessageCircle, Users, Clock, Send, LogOut } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useChat } from '../hooks/useChat';
import { Navigate } from 'react-router-dom';

const AdminDashboard = () => {
  const { user, isAdmin, logout } = useAuth();
  const { conversations, messages, sendMessage, selectedConversationId, setSelectedConversationId, markAsRead, loadConversations } = useChat(user?.id || '', true);
  const [newMessage, setNewMessage] = useState('');
  const [selectedConversation, setSelectedConversation] = useState<any>(null);

  useEffect(() => {
    if (isAdmin) {
      loadConversations();
    }
  }, [isAdmin]);

  useEffect(() => {
    if (selectedConversationId && conversations.length > 0) {
      const conversation = conversations.find(c => c.id === selectedConversationId);
      setSelectedConversation(conversation);
      if (conversation) {
        markAsRead(selectedConversationId);
      }
    }
  }, [selectedConversationId, conversations]);

  const handleSelectConversation = (conversation: any) => {
    setSelectedConversationId(conversation.id);
    setSelectedConversation(conversation);
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedConversation || !newMessage.trim()) return;

    await sendMessage(newMessage, selectedConversation.user_id);
    setNewMessage('');
  };

  // Redirect if not admin
  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
              <MessageCircle className="text-green-600" />
              Admin Chat Dashboard
            </h1>
            <p className="text-gray-600 mt-1">Manage conversations with website visitors</p>
          </div>
          <button
            onClick={logout}
            className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </header>

      <div className="flex h-[calc(100vh-80px)]">
        {/* Conversations List */}
        <div className="w-1/3 bg-white border-r border-gray-200">
          <div className="p-4 border-b border-gray-200">
            <h2 className="font-semibold text-gray-900 flex items-center gap-2">
              <Users size={18} />
              Active Conversations ({conversations.length})
            </h2>
          </div>
          
          <div className="overflow-y-auto">
            {conversations.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                <MessageCircle size={48} className="mx-auto mb-4 opacity-30" />
                <p>No conversations yet</p>
                <p className="text-sm">New chats will appear here</p>
              </div>
            ) : (
              conversations.map((conversation) => (
                <div
                  key={conversation.id}
                  onClick={() => handleSelectConversation(conversation)}
                  className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 ${
                    selectedConversation?.id === conversation.id ? 'bg-green-50 border-l-4 border-l-green-500' : ''
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium text-gray-900">{conversation.user_name}</h3>
                    <span className="text-xs text-gray-500 flex items-center gap-1">
                      <Clock size={12} />
                      {new Date(conversation.last_message_at).toLocaleTimeString([], { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 truncate">{conversation.user_email}</p>
                  <p className="text-sm text-gray-700 truncate mt-1">{conversation.last_message}</p>
                  {conversation.unread_count > 0 && (
                    <span className="inline-block bg-green-500 text-white text-xs px-2 py-1 rounded-full mt-2">
                      {conversation.unread_count} new
                    </span>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Chat Window */}
        <div className="flex-1 flex flex-col">
          {selectedConversation ? (
            <>
              {/* Chat Header */}
              <div className="p-4 bg-white border-b border-gray-200">
                <h3 className="font-semibold text-gray-900">{selectedConversation.user_name}</h3>
                <p className="text-sm text-gray-600">{selectedConversation.user_email}</p>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                {messages.map((message) => (
                  <div key={message.id} className={`flex ${message.sender_id === user?.id ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                      message.sender_id === user?.id
                        ? 'bg-green-500 text-white'
                        : 'bg-white text-gray-900 border border-gray-200'
                    }`}>
                      <p className="text-sm">{message.content}</p>
                      <p className={`text-xs mt-1 ${
                        message.sender_id === user?.id ? 'text-green-100' : 'text-gray-500'
                      }`}>
                        {new Date(message.created_at).toLocaleTimeString([], { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <form onSubmit={handleSendMessage} className="p-4 bg-white border-t border-gray-200">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your reply..."
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                  <button
                    type="submit"
                    disabled={!newMessage.trim()}
                    className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-full transition-colors disabled:opacity-50 flex items-center gap-2"
                  >
                    <Send size={16} />
                    Send
                  </button>
                </div>
              </form>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center bg-gray-50">
              <div className="text-center text-gray-500">
                <MessageCircle size={64} className="mx-auto mb-4 opacity-30" />
                <h3 className="text-lg font-medium mb-2">Select a conversation</h3>
                <p>Choose a chat from the sidebar to start messaging</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
