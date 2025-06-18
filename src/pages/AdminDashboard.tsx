
import React, { useState, useEffect } from 'react';
import { MessageCircle, Users, Clock, Send } from 'lucide-react';

interface ChatSession {
  userId: string;
  userName: string;
  userEmail: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  messages: any[];
}

const AdminDashboard = () => {
  const [chatSessions, setChatSessions] = useState<ChatSession[]>([]);
  const [selectedChat, setSelectedChat] = useState<ChatSession | null>(null);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    // Load all chat sessions from localStorage
    const loadChatSessions = () => {
      const sessions: ChatSession[] = [];
      
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key?.startsWith('chat_')) {
          const userId = key.replace('chat_', '');
          const messages = JSON.parse(localStorage.getItem(key) || '[]');
          const userInfo = JSON.parse(localStorage.getItem('chatUser') || '{}');
          
          if (messages.length > 0) {
            const lastMessage = messages[messages.length - 1];
            sessions.push({
              userId,
              userName: userInfo.name || userId,
              userEmail: userInfo.email || `${userId}@example.com`,
              lastMessage: lastMessage.content,
              lastMessageTime: lastMessage.timestamp,
              unreadCount: messages.filter((m: any) => m.senderId !== 'vikash').length,
              messages
            });
          }
        }
      }
      
      setChatSessions(sessions.sort((a, b) => 
        new Date(b.lastMessageTime).getTime() - new Date(a.lastMessageTime).getTime()
      ));
    };

    loadChatSessions();
    
    // Refresh every 5 seconds to check for new messages
    const interval = setInterval(loadChatSessions, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedChat || !newMessage.trim()) return;

    const message = {
      id: Date.now().toString(),
      senderId: 'vikash',
      senderName: 'Vikash',
      content: newMessage,
      timestamp: new Date().toISOString()
    };

    const updatedMessages = [...selectedChat.messages, message];
    localStorage.setItem(`chat_${selectedChat.userId}`, JSON.stringify(updatedMessages));
    
    setSelectedChat({
      ...selectedChat,
      messages: updatedMessages,
      lastMessage: newMessage,
      lastMessageTime: message.timestamp
    });
    
    setNewMessage('');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
          <MessageCircle className="text-green-600" />
          Admin Chat Dashboard
        </h1>
        <p className="text-gray-600 mt-1">Manage conversations with website visitors</p>
      </header>

      <div className="flex h-[calc(100vh-80px)]">
        {/* Chat Sessions List */}
        <div className="w-1/3 bg-white border-r border-gray-200">
          <div className="p-4 border-b border-gray-200">
            <h2 className="font-semibold text-gray-900 flex items-center gap-2">
              <Users size={18} />
              Active Conversations ({chatSessions.length})
            </h2>
          </div>
          
          <div className="overflow-y-auto">
            {chatSessions.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                <MessageCircle size={48} className="mx-auto mb-4 opacity-30" />
                <p>No conversations yet</p>
                <p className="text-sm">New chats will appear here</p>
              </div>
            ) : (
              chatSessions.map((session) => (
                <div
                  key={session.userId}
                  onClick={() => setSelectedChat(session)}
                  className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 ${
                    selectedChat?.userId === session.userId ? 'bg-green-50 border-l-4 border-l-green-500' : ''
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium text-gray-900">{session.userName}</h3>
                    <span className="text-xs text-gray-500 flex items-center gap-1">
                      <Clock size={12} />
                      {new Date(session.lastMessageTime).toLocaleTimeString([], { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 truncate">{session.userEmail}</p>
                  <p className="text-sm text-gray-700 truncate mt-1">{session.lastMessage}</p>
                  {session.unreadCount > 0 && (
                    <span className="inline-block bg-green-500 text-white text-xs px-2 py-1 rounded-full mt-2">
                      {session.unreadCount} new
                    </span>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Chat Window */}
        <div className="flex-1 flex flex-col">
          {selectedChat ? (
            <>
              {/* Chat Header */}
              <div className="p-4 bg-white border-b border-gray-200">
                <h3 className="font-semibold text-gray-900">{selectedChat.userName}</h3>
                <p className="text-sm text-gray-600">{selectedChat.userEmail}</p>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                {selectedChat.messages.map((message, index) => (
                  <div key={index} className={`flex ${message.senderId === 'vikash' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                      message.senderId === 'vikash'
                        ? 'bg-green-500 text-white'
                        : 'bg-white text-gray-900 border border-gray-200'
                    }`}>
                      <p className="text-sm">{message.content}</p>
                      <p className={`text-xs mt-1 ${
                        message.senderId === 'vikash' ? 'text-green-100' : 'text-gray-500'
                      }`}>
                        {new Date(message.timestamp).toLocaleTimeString([], { 
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
