// components/Orders.js
import React from 'react';

const orders = [
  { id: '1', customer: 'John Doe', food: 'Pizza', quantity: 2, status: 'Pending' },
  { id: '2', customer: 'Jane Smith', food: 'Burger', quantity: 1, status: 'Delivered' },
  { id: '3', customer: 'Michael Johnson', food: 'Pasta', quantity: 3, status: 'Preparing' },
];

export default function Orders() {
  const handleConfirm = (id) => {
    // Add your confirm logic here
    console.log(`Order ${id} confirmed`);
  };

  return (
    <div className="max-w-6xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold text-gray-900 mb-4">Food Orders</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="px-4 py-2 border">Order ID</th>
              <th className="px-4 py-2 border">Customer</th>
              <th className="px-4 py-2 border">Food Item</th>
              <th className="px-4 py-2 border">Quantity</th>
              <th className="px-4 py-2 border">Status</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td className="px-4 py-2 border">{order.id}</td>
                <td className="px-4 py-2 border">{order.customer}</td>
                <td className="px-4 py-2 border">{order.food}</td>
                <td className="px-4 py-2 border">{order.quantity}</td>
                <td className="px-4 py-2 border">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClass(order.status)}`}>
                    {order.status}
                  </span>
                </td>
                <td className="px-4 py-2 border text-center">
                  {order.status === 'Pending' && (
                    <button
                      onClick={() => handleConfirm(order.id)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                      Confirm
                    </button>
                  )}
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
    case 'Pending':
      return 'bg-yellow-200 text-yellow-800';
    case 'Delivered':
      return 'bg-green-200 text-green-800';
    case 'Preparing':
      return 'bg-blue-200 text-blue-800';
    default:
      return 'bg-gray-200 text-gray-800';
  }
}
