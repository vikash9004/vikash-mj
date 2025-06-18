
import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import AuthModal from './AuthModal';
import ChatWindow from './ChatWindow';
import { useAuth } from '../hooks/useAuth';

const ChatSystem = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const { user, isAuthenticated } = useAuth();

  const handleChatButtonClick = () => {
    if (isAuthenticated) {
      setIsChatOpen(true);
    } else {
      setIsAuthModalOpen(true);
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={handleChatButtonClick}
          className="bg-green-500 hover:bg-green-600 text-white px-6 py-4 rounded-2xl shadow-2xl hover:shadow-green-200 transition-all duration-300 hover:scale-105 flex items-center gap-3 animate-pulse hover:animate-none"
        >
          <MessageCircle size={24} />
          <span className="font-medium text-lg">Chat with Vikash</span>
        </button>
      </div>

      {/* Auth Modal */}
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)}
        onSuccess={() => {
          setIsAuthModalOpen(false);
          setIsChatOpen(true);
        }}
      />

      {/* Chat Window */}
      {isAuthenticated && (
        <ChatWindow 
          isOpen={isChatOpen}
          onClose={() => setIsChatOpen(false)}
          user={user}
        />
      )}
    </>
  );
};

export default ChatSystem;
