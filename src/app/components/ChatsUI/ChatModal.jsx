import React from 'react';
import ChatsUI from '../ChatsUI/ChatsUI'; // Adjust the path as needed

function ChatModal({ isOpen, onClose, chatId, onReplyChange, reply, onSendReply }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white w-full max-w-3xl mx-auto rounded-lg shadow-lg p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <ChatsUI
          chatId={chatId}
          onReplyChange={onReplyChange}
          reply={reply}
          onSendReply={onSendReply}
        />
      </div>
    </div>
  );
}

export default ChatModal;
