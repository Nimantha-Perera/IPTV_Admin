import React, { useEffect, useRef, useState } from 'react';
import { useFetchMessages } from '../../hooks/fetch messages/useFetchMessages'; // Adjust the path as needed

export default function ChatsUI({ chatId, onReplyChange, reply, onSendReply }) {
  const { chats, loading, error } = useFetchMessages(chatId); // Ensure chatId is correctly passed
  const messagesEndRef = useRef(null);
  const [validationError, setValidationError] = useState('');

  useEffect(() => {
    // Scroll to the bottom of the messages container when new messages arrive
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chats]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching chats: {error.message}</p>;
  if (chats.length === 0) return <p>No messages found for this chat.</p>;

  const selectedChat = chats[0];

  // Debug: Check if selectedChat and messages are being fetched
  console.log('Selected chat:', selectedChat);

  // Sort messages by timestamp
  const sortedMessages = selectedChat.messages
    .filter(message => message.timestamp && message.timestamp.seconds)
    .sort((a, b) => a.timestamp.seconds - b.timestamp.seconds);

  // Debug: Check sorted messages
  console.log('Sorted messages:', sortedMessages);

  const handleSendReply = () => {
    if (reply.trim() === '') {
      setValidationError('Reply cannot be empty');
      return;
    }
    setValidationError('');
    onSendReply();
  };

  return (
    <div className="flex flex-col max-w-6xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      
      {/* <div className="flex flex-col bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-200 mb-6"> */}
        <h2 className="text-xl font-semibold text-white mb-4 text-center p-6 bg-cyan-700 shadow-lg rounded-lg">Chat ID: {chatId}</h2>
        <div className="flex flex-col-reverse space-y-reverse overflow-y-auto max-h-80">
          <div className="space-y-4">
            {sortedMessages.length === 0 ? (
              <p>No messages found</p>
            ) : (
              sortedMessages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isUserMessage ? 'justify-start' : 'justify-end'} mb-4`}
                >
                  <div
                    className={`p-4 max-w-xs rounded-lg shadow-sm ${message.isUserMessage ? 'bg-gray-100' : 'bg-blue-100'}`}
                  >
                    <p className="text-sm text-gray-900">{message.text}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(message.timestamp.seconds * 1000).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">Reply</label>
          <textarea
            value={reply}
            onChange={(e) => {
              onReplyChange(e);
              if (e.target.value.trim() !== '') setValidationError('');
            }}
            className={`mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${validationError ? 'border-red-500' : ''}`}
            rows="4"
          />
          {validationError && (
            <p className="mt-2 text-sm text-red-600">{validationError}</p>
          )}
          <button
            onClick={handleSendReply}
            className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Send Reply
          </button>
        </div>
      {/* </div> */}
     </div> 
  );
}
