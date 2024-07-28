// components/Messages.js
import React, { useState } from 'react';

const initialMessages = [
  { id: '1', sender: 'John Doe', content: 'Hello, I need help with my order.', date: '2024-07-01', status: 'Read' },
  { id: '2', sender: 'Jane Smith', content: 'Can I get a refund?', date: '2024-07-05', status: 'Unread' },
  { id: '3', sender: 'Michael Johnson', content: 'The delivery was delayed.', date: '2024-07-10', status: 'Read' },
];

export default function Messages() {
  const [messages, setMessages] = useState(initialMessages);
  const [newMessage, setNewMessage] = useState({
    id: '',
    sender: '',
    content: '',
    date: '',
    status: 'Unread'
  });
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [reply, setReply] = useState('');

  const handleAddNewMessage = () => {
    setShowForm(!showForm);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMessage((prevMessage) => ({
      ...prevMessage,
      [name]: value
    }));
  };

  const handleAddMessage = () => {
    setMessages((prevMessages) => [...prevMessages, { ...newMessage, id: (prevMessages.length + 1).toString() }]);
    setNewMessage({
      id: '',
      sender: '',
      content: '',
      date: '',
      status: 'Unread'
    });
    setShowForm(false);
  };

  const handleEditMessage = (id) => {
    // Add logic for editing a message
    console.log(`Edit message ${id}`);
  };

  const handleSelectMessage = (message) => {
    setSelectedMessage(message);
  };

  const handleReplyChange = (e) => {
    setReply(e.target.value);
  };

  const handleSendReply = () => {
    if (selectedMessage) {
      console.log(`Reply to ${selectedMessage.sender}: ${reply}`);
      // Add logic for sending the reply
      setReply('');
    }
  };

  return (
    <div className="max-w-6xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Messages</h1>
        <div className="flex space-x-4">
          <button
            onClick={handleAddNewMessage}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            {showForm ? 'Cancel' : 'Add New Message'}
          </button>
        </div>
      </div>
      {showForm && (
        <div className="mb-6 p-4 bg-gray-50 rounded-md shadow">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Add New Message</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Sender</label>
              <input
                type="text"
                name="sender"
                value={newMessage.sender}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Content</label>
              <textarea
                name="content"
                value={newMessage.content}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                rows="4"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Date</label>
              <input
                type="date"
                name="date"
                value={newMessage.date}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Status</label>
              <select
                name="status"
                value={newMessage.status}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="Unread">Unread</option>
                <option value="Read">Read</option>
              </select>
            </div>
            <button
              onClick={handleAddMessage}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Add Message
            </button>
          </div>
        </div>
      )}
      <div className="flex space-x-4 mb-6">
        {selectedMessage && (
          <div className="w-full bg-gray-50 p-4 rounded-md shadow">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Message Details</h2>
            <p><strong>Sender:</strong> {selectedMessage.sender}</p>
            <p><strong>Content:</strong> {selectedMessage.content}</p>
            <p><strong>Date:</strong> {selectedMessage.date}</p>
            <p><strong>Status:</strong> {selectedMessage.status}</p>
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
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Message ID</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Sender</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Content</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Date</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Status</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {messages.map((message) => (
              <tr key={message.id} onClick={() => handleSelectMessage(message)} className="cursor-pointer hover:bg-gray-100">
                <td className="px-4 py-2 text-sm text-gray-900">{message.id}</td>
                <td className="px-4 py-2 text-sm text-gray-900">{message.sender}</td>
                <td className="px-4 py-2 text-sm text-gray-900">{message.content}</td>
                <td className="px-4 py-2 text-sm text-gray-900">{message.date}</td>
                <td className="px-4 py-2 text-sm text-gray-900">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClass(message.status)}`}>
                    {message.status}
                  </span>
                </td>
                <td className="px-4 py-2 text-sm text-gray-900 text-center">
                  <button
                    onClick={() => handleEditMessage(message.id)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    Edit
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

function getStatusClass(status) {
  switch (status) {
    case 'Read':
      return 'bg-green-200 text-green-800';
    case 'Unread':
      return 'bg-red-200 text-red-800';
    default:
      return 'bg-gray-200 text-gray-800';
  }
}
