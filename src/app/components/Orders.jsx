import React, { useState } from "react";
import { getFirestore } from "firebase/firestore";
import { firebaseApp } from "../firebase_connected/firebase"; // Ensure you have firebase configured
import useOrders from "../hooks/oders_hook"; // Ensure you have the custom hook
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faTimesCircle,
  faUtensils,
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";
import ConfirmationModal from "../ConformationModal/ConfirmationModal"; // Import the modal component

export default function Orders() {
  const {
    orders,
    handleConfirm,
    handleCancel,
    handleDelete,
    handleSendToKitchen,
  } = useOrders();
  const db = getFirestore(firebaseApp);

  const [modalOpen, setModalOpen] = useState(false);
  const [currentAction, setCurrentAction] = useState(null);
  const [currentOrderId, setCurrentOrderId] = useState(null);
  const [message, setMessage] = useState("");

  function getStatusClass(status) {
    switch (status) {
      case "Pending":
        return "bg-yellow-200 text-yellow-800";
      case "Delivered":
        return "bg-green-200 text-green-800";
      case "Preparing":
        return "bg-blue-200 text-blue-800";
      case "Confirmed":
        return "bg-purple-200 text-purple-800";
      default:
        return "bg-gray-200 text-gray-800";
    }
  }

  function openModal(action, order_id, msg) {
    setCurrentAction(action);
    setCurrentOrderId(order_id);
    setMessage(msg);
    setModalOpen(true);
  }

  function handleModalConfirm() {
    if (currentAction === "delete") {
      handleDelete(currentOrderId);
    } else if (currentAction === "cancel") {
      handleCancel(currentOrderId);
    }
    setModalOpen(false);
  }

  function handleModalCancel() {
    setModalOpen(false);
  }

  return (
    <div className="max-w-6xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-6">
        Food Orders
      </h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Order ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Customer
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Room Number
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Food Item
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Quantity
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total Price (LKR)
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {orders.map((order) => (
              <tr key={order.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {order.order_id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {order.customerName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {order.roomNumber}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {order.food}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {order.quantity}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {order.totalPrice}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span
                    className={`px-3 py-1 inline-flex text-xs font-semibold rounded-full ${getStatusClass(
                      order.status
                    )}`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex space-x-2">
                  {order.status === "Pending" && (
                    <>
                      <button
                        onClick={() => handleConfirm(order.order_id)}
                        className="p-2 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        title="Confirm Order"
                      >
                        <FontAwesomeIcon
                          icon={faCheckCircle}
                          className="text-white"
                        />
                      </button>
                      <button
                        onClick={() => openModal("cancel", order.order_id, "Are you sure you want to cancel this order?")}
                        className="p-2 bg-red-500 text-white rounded-md shadow hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                        title="Cancel Order"
                      >
                        <FontAwesomeIcon
                          icon={faTimesCircle}
                          className="text-white"
                        />
                      </button>
                      <button
                        onClick={() => openModal("delete", order.order_id, "Are you sure you want to delete this order?")}
                        className="p-2 bg-gray-500 text-white rounded-md shadow hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                        title="Delete Order"
                      >
                        <FontAwesomeIcon
                          icon={faTrash}
                          className="text-white"
                        />
                      </button>
                      <button
                        onClick={() => handleSendToKitchen(order.order_id)}
                        className="p-2 bg-green-500 text-white rounded-md shadow hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                        title="Send to Kitchen"
                      >
                        <FontAwesomeIcon
                          icon={faUtensils}
                          className="text-white"
                        />
                      </button>
                    </>
                  )}
                  {order.status === "Confirmed" && (
                    <>
                      <button
                        onClick={() => handleSendToKitchen(order.order_id)}
                        className="p-2 bg-green-500 text-white rounded-md shadow hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                        title="Send to Kitchen"
                      >
                        <FontAwesomeIcon
                          icon={faUtensils}
                          className="text-white"
                        />
                      </button>
                      <button
                        onClick={() => openModal("delete", order.order_id, "Are you sure you want to delete this order?")}
                        className="p-2 bg-gray-500 text-white rounded-md shadow hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                        title="Delete Order"
                      >
                        <FontAwesomeIcon
                          icon={faTrash}
                          className="text-white"
                        />
                      </button>
                    </>
                  )}
                  {order.status === "Preparing" && (
                    <>
                      <button
                        onClick={() => openModal("cancel", order.order_id, "Are you sure you want to cancel this order?")}
                        className="p-2 bg-red-500 text-white rounded-md shadow hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                        title="Cancel Order"
                      >
                        <FontAwesomeIcon
                          icon={faTimesCircle}
                          className="text-white"
                        />
                      </button>
                      <button
                        onClick={() => openModal("delete", order.order_id, "Are you sure you want to delete this order?")}
                        className="p-2 bg-gray-500 text-white rounded-md shadow hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                        title="Delete Order"
                      >
                        <FontAwesomeIcon
                          icon={faTrash}
                          className="text-white"
                        />
                      </button>
                    </>
                  )}
                  {order.status === "Delivered" && (
                    <button
                      onClick={() => openModal("delete", order.order_id, "Are you sure you want to delete this order?")}
                      className="p-2 bg-gray-500 text-white rounded-md shadow hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                      title="Delete Order"
                    >
                      <FontAwesomeIcon icon={faTrash} className="text-white" />
                    </button>
                  )}

                  {order.status === "Canceled" && (
                    <button
                      onClick={() => openModal("delete", order.order_id, "Are you sure you want to delete this order?")}
                      className="p-2 bg-gray-500 text-white rounded-md shadow hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                      title="Delete Order"
                    >
                      <FontAwesomeIcon icon={faTrash} className="text-white" />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Render the ConfirmationModal */}
      <ConfirmationModal
        isOpen={modalOpen}
        onConfirm={handleModalConfirm}
        onCancel={handleModalCancel}
        message={message}
      />
    </div>
  );
}
