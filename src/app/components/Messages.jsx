import React, { useState } from 'react';
import { useFetchMessages, deleteChat } from '../hooks/useFetchMessages'; // Adjust the path as needed
import useSendAdminMessage from '../hooks/send_messages_hook'; // Adjust the path as needed
import ChatsUI from '../components/ChatsUI/ChatsUI'; // Adjust the path as needed


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


  const handleDeleteChat = async () => {
    await deleteChat(chatId);
  };

  const handleSendReply = async () => {
    if (selectedChat && reply.trim() !== '') {
      await sendAdminMessage(reply);
      setReply('');
      console.log('Reply sent successfully for chat:', selectedChat.chatId);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching chats: {error.message}</p>;

  return (
    <div className="max-w-6xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Chats</h1>
      {selectedChat && (
        <ChatsUI
          chatId={selectedChat.chatId}
          reply={reply}
          onReplyChange={handleReplyChange}
          onSendReply={handleSendReply}
        />
      )}
      <div className="overflow-x-auto mt-10">
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
                  {/* <button
                    onClick={(e) => e.stopPropagation()}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    View
                  </button> */}

                  <button
                    onClick={handleDeleteChat}
                    className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                  >
                    Delete
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
