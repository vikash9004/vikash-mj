
import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Minimize2 } from 'lucide-react';
import { useChat } from '../hooks/useChat';

interface ChatWindowProps {
  isOpen: boolean;
  onClose: () => void;
  user: any;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ isOpen, onClose, user }) => {
  const [message, setMessage] = useState('');
  const [isMinimized, setIsMinimized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { messages, sendMessage, loading } = useChat(user?.id);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    await sendMessage(message);
    setMessage('');
  };

  if (!isOpen) return null;

  return (
    <div className={`fixed bottom-6 right-6 w-96 bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 transition-all duration-300 ${isMinimized ? 'h-16' : 'h-96'} animate-slide-in-right`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-green-50 rounded-t-2xl">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-bold">V</span>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Vikash MJ</h3>
            <p className="text-xs text-green-600">Usually replies within minutes</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="text-gray-400 hover:text-gray-600 p-1"
          >
            <Minimize2 size={16} />
          </button>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 p-1"
          >
            <X size={16} />
          </button>
        </div>
      </div>

      {/* Messages */}
      {!isMinimized && (
        <>
          <div className="flex-1 overflow-y-auto p-4 space-y-4 h-64">
            {messages.length === 0 && (
              <div className="text-center text-gray-500 py-8">
                <p>👋 Hey there! I'm Vikash.</p>
                <p className="text-sm mt-1">Feel free to ask me anything about my work or experience!</p>
              </div>
            )}
            
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.sender_id === user?.id ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-xs px-4 py-2 rounded-2xl ${
                  msg.sender_id === user?.id 
                    ? 'bg-green-500 text-white' 
                    : 'bg-gray-100 text-gray-900'
                }`}>
                  <p className="text-sm">{msg.content}</p>
                  <p className={`text-xs mt-1 ${
                    msg.sender_id === user?.id ? 'text-green-100' : 'text-gray-500'
                  }`}>
                    {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200">
            <div className="flex gap-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                disabled={loading}
              />
              <button
                type="submit"
                disabled={loading || !message.trim()}
                className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-full transition-colors disabled:opacity-50"
              >
                <Send size={16} />
              </button>
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default ChatWindow;
