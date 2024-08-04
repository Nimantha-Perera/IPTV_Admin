// components/Messages.js
import React, { useState } from 'react';
import useFetchMessages from '../hooks/useFetchMessages'; // Adjust the path as needed
import useSendAdminMessage from '../hooks/send_messages_hook'; // Adjust the path as needed

export default function Messages() {
  const { chats, loading, error } = useFetchMessages();
  const [selectedChat, setSelectedChat] = useState(null);
  const [reply, setReply] = useState('');
  const adminUid = 'admin_uid'; // Replace with actual admin UID or get it dynamically
  const sendAdminMessage = useSendAdminMessage(selectedChat ? selectedChat.chatId : '', adminUid);

  const handleSelectChat = (chat) => {
    setSelectedChat(chat);
  };

  const handleReplyChange = (e) => {
    setReply(e.target.value);
  };

  const handleSendReply = async () => {
    if (selectedChat && reply.trim() !== '') {
      await sendAdminMessage(reply);
      setReply('');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching chats: {error.message}</p>;

  return (
    <div className="max-w-6xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Chats</h1>
      {selectedChat && (
        <div className="mb-6 p-6 bg-gray-50 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Chat ID: {selectedChat.chatId}</h2>
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Messages</h3>
            {selectedChat.messages.map((message) => (
              <div key={message.id} className="mb-4 p-4 bg-gray-100 rounded-md">
                <p><strong>Sender ID:</strong> {message.senderId}</p>
                <p><strong>Text:</strong> {message.text}</p>
                <p><strong>Timestamp:</strong> {new Date(message.timestamp.seconds * 1000).toLocaleString()}</p>
                <p><strong>Type:</strong> {message.isUserMessage ? 'User' : message.isAdminResponse ? 'Admin' : message.isBotResponse ? 'Bot' : 'Unknown'}</p>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">Reply</label>
            <textarea
              value={reply}
              onChange={handleReplyChange}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              rows="4"
            />
            <button
              onClick={handleSendReply}
              className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Send Reply
            </button>
          </div>
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Chat ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Participants</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Messages Count</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {chats.map((chat) => (
              <tr key={chat.chatId} onClick={() => handleSelectChat(chat)} className="cursor-pointer hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-900">{chat.chatId}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{chat.participants.join(', ')}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{chat.messages.length}</td>
                <td className="px-6 py-4 text-sm text-gray-900 text-center">
                  <button
                    onClick={(e) => e.stopPropagation()}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
