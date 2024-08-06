import React, { useState } from 'react';
import useUsers from '../hooks/customers_hook';
import Modal from '../forms/customer_register';
import Alert from '../alerts/alert';
import ChatModal from '../../app/components/ChatsUI/ChatModal'; // Adjust the path as needed
import useSendAdminMessage from '../hooks/send_messages_hook'; // Import the hook

export default function Customers() {
  const { count, users, addCustomer, updateCustomer } = useUsers();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [alert, setAlert] = useState(null);
  const [showChatModal, setShowChatModal] = useState(false); // Manage chat modal visibility
  const [selectedChatId, setSelectedChatId] = useState(null); // Manage selected chat
  const [reply, setReply] = useState(''); // Manage reply state

  const sendAdminMessage = useSendAdminMessage(selectedChatId, 'adminUID'); // Adjust 'adminUID' as needed

  const handleAddNewCustomer = () => {
    setEditingCustomer(null);
    setIsModalOpen(true);
  };

  const handleEditCustomer = (customer) => {
    setEditingCustomer(customer);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingCustomer(null);
  };

  const handleSaveCustomer = (customer) => {
    if (customer.id) {
      updateCustomer(customer);
    } else {
      addCustomer(customer);
    }
    setAlert({ type: 'success', message: 'Customer saved successfully!' });
    handleCloseModal();
  };

  const handleShowChatModal = (customerId) => {
    setSelectedChatId(customerId);
    setShowChatModal(true);
  };

  const handleCloseChatModal = () => {
    setShowChatModal(false);
    setSelectedChatId(null);
  };

  const handleSendReply = async () => {
    if (reply.trim() === '') {
      console.error('Reply cannot be empty');
      return;
    }
    await sendAdminMessage(reply);
    setReply('');
    console.log('Reply sent successfully for chat:', selectedChatId);
  };

  return (
    <div className="max-w-6xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg relative">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Customers</h1>
        <button
          onClick={handleAddNewCustomer}
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        >
          Add New Customer
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Customer ID</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Name</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Room Number</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Phone</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Joined</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((customer) => (
              <tr key={customer.id}>
                <td className="px-4 py-2 text-sm text-gray-900">{customer.id}</td>
                <td className="px-4 py-2 text-sm text-gray-900">{customer.customerName}</td>
                <td className="px-4 py-2 text-sm text-gray-900">{customer.roomNumber}</td>
                <td className="px-4 py-2 text-sm text-gray-900">{customer.phone}</td>
                <td className="px-4 py-2 text-sm text-gray-900">{customer.joined}</td>
                <td className="px-4 py-2 text-sm text-gray-900 text-center">
                  <button
                    onClick={() => handleEditCustomer(customer)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleShowChatModal(customer.id)} // Show chat modal with customer ID
                    className="ml-2 px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                  >
                    Chat
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showChatModal && (
        <ChatModal
          isOpen={showChatModal}
          onClose={handleCloseChatModal}
          chatId={selectedChatId}
          reply={reply}
          onReplyChange={(e) => setReply(e.target.value)}
          onSendReply={handleSendReply}
        />
      )}
      {alert && (
        <Alert
          type={alert.type}
          message={alert.message}
          onClose={() => setAlert(null)}
        />
      )}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveCustomer}
        customer={editingCustomer}
      />
    </div>
  );
}
