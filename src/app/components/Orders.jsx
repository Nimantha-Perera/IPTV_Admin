import React from 'react';
import { getFirestore, doc, updateDoc } from "firebase/firestore";
import { firebaseApp } from "../firebase_connected/firebase"; // Ensure you have firebase configured

export default function Orders({ orders }) {
  const db = getFirestore(firebaseApp);

  const handleConfirm = async (id) => {
    const orderRef = doc(db, "orders", id);
    await updateDoc(orderRef, {
      status: "Confirmed"
    });
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
                <td className="px-4 py-2 border">{order.order_id}</td>
                <td className="px-4 py-2 border">{order.customerName}</td>
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
    case 'Confirmed':
      return 'bg-purple-200 text-purple-800';
    default:
      return 'bg-gray-200 text-gray-800';
  }
}
