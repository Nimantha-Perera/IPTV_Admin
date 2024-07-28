import React, { useState } from 'react';
import useUsers from '../hooks/customers_hook';
import Modal from '../forms/customer_register';
import Alert from '../alerts/alert';

export default function Customers() {
  const { count, users, addCustomer, updateCustomer } = useUsers();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [alert, setAlert] = useState(null); // State for alert

  const handleAddNewCustomer = () => {
    setEditingCustomer(null); // Clear any editing state
    setIsModalOpen(true);
  };

  const handleEditCustomer = (customer) => {
    setEditingCustomer(customer);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingCustomer(null); // Clear editing state on close
  };

  const handleSaveCustomer = (customer) => {
    if (customer.id) {
      updateCustomer(customer); // Update existing customer
    } else {
      addCustomer(customer); // Add new customer
    }
    setAlert({ type: 'success', message: 'Customer saved successfully!' });
    handleCloseModal();
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
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveCustomer}
        customer={editingCustomer}
      />
    </div>
  );
}
