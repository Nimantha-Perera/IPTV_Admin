// components/Channels.js
import React from 'react';

const channels = [
  { id: '1', name: 'Channel A', description: 'Description for Channel A', status: 'Active' },
  { id: '2', name: 'Channel B', description: 'Description for Channel B', status: 'Inactive' },
  { id: '3', name: 'Channel C', description: 'Description for Channel C', status: 'Active' },
];

export default function Channels() {
  const handleAddNewChannel = () => {
    // Add logic for adding a new channel
    console.log('Add new channel');
  };

  const handleEditChannel = (id) => {
    // Add logic for editing a channel
    console.log(`Edit channel ${id}`);
  };

  return (
    <div className="max-w-6xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Channels</h1>
        <button
          onClick={handleAddNewChannel}
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        >
          Add New Channel
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Channel ID</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Name</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Description</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Status</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {channels.map((channel) => (
              <tr key={channel.id}>
                <td className="px-4 py-2 text-sm text-gray-900">{channel.id}</td>
                <td className="px-4 py-2 text-sm text-gray-900">{channel.name}</td>
                <td className="px-4 py-2 text-sm text-gray-900">{channel.description}</td>
                <td className="px-4 py-2 text-sm text-gray-900">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClass(channel.status)}`}>
                    {channel.status}
                  </span>
                </td>
                <td className="px-4 py-2 text-sm text-gray-900 text-center">
                  <button
                    onClick={() => handleEditChannel(channel.id)}
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
    case 'Active':
      return 'bg-green-200 text-green-800';
    case 'Inactive':
      return 'bg-red-200 text-red-800';
    default:
      return 'bg-gray-200 text-gray-800';
  }
}
