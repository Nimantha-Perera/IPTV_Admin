import React, { useEffect } from 'react';

export default function Alert({ type, message, onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000); // Hide the alert after 20 seconds

    return () => clearTimeout(timer); // Cleanup timer on component unmount
  }, [onClose]);

  if (!message) return null;

  return (
    <div className={`fixed right-0 top-0 mt-6 mr-6 p-4 bg-${type === 'success' ? 'green-600' : 'red-600'} text-white rounded-md shadow-lg`}>
      <p>{message}</p>
      {/* <button
        onClick={onClose}
        className="ml-4 px-2 py-1 bg-gray-800 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
      >
        Close
      </button> */}
    </div>
  );
}
