// components/Report.js
import React, { useState } from 'react';

const initialReports = [
  { id: '1', title: 'Sales Report', date: '2024-07-01', status: 'Completed' },
  { id: '2', title: 'Customer Feedback', date: '2024-07-05', status: 'Pending' },
  { id: '3', title: 'Inventory Status', date: '2024-07-10', status: 'In Progress' },
];

export default function Report() {
  const [reports, setReports] = useState(initialReports);
  const [newReport, setNewReport] = useState({
    id: '',
    title: '',
    date: '',
    status: 'Pending'
  });
  const [showForm, setShowForm] = useState(false);

  const handleAddNewReport = () => {
    setShowForm(!showForm);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewReport((prevReport) => ({
      ...prevReport,
      [name]: value
    }));
  };

  const handleAddReport = () => {
    setReports((prevReports) => [...prevReports, { ...newReport, id: (prevReports.length + 1).toString() }]);
    setNewReport({
      id: '',
      title: '',
      date: '',
      status: 'Pending'
    });
    setShowForm(false);
  };

  const handleEditReport = (id) => {
    // Add logic for editing a report
    console.log(`Edit report ${id}`);
  };

  return (
    <div className="max-w-6xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Reports</h1>
        <div className="flex space-x-4">
          <button
            onClick={handleAddNewReport}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            {showForm ? 'Cancel' : 'Add New Report'}
          </button>
        </div>
      </div>
      {showForm && (
        <div className="mb-6 p-4 bg-gray-50 rounded-md shadow">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Add New Report</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Title</label>
              <input
                type="text"
                name="title"
                value={newReport.title}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Date</label>
              <input
                type="date"
                name="date"
                value={newReport.date}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Status</label>
              <select
                name="status"
                value={newReport.status}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
            <button
              onClick={handleAddReport}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Add Report
            </button>
          </div>
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Report ID</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Title</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Date</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Status</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {reports.map((report) => (
              <tr key={report.id}>
                <td className="px-4 py-2 text-sm text-gray-900">{report.id}</td>
                <td className="px-4 py-2 text-sm text-gray-900">{report.title}</td>
                <td className="px-4 py-2 text-sm text-gray-900">{report.date}</td>
                <td className="px-4 py-2 text-sm text-gray-900">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClass(report.status)}`}>
                    {report.status}
                  </span>
                </td>
                <td className="px-4 py-2 text-sm text-gray-900 text-center">
                  <button
                    onClick={() => handleEditReport(report.id)}
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
    case 'Completed':
      return 'bg-green-200 text-green-800';
    case 'In Progress':
      return 'bg-yellow-200 text-yellow-800';
    case 'Pending':
      return 'bg-red-200 text-red-800';
    default:
      return 'bg-gray-200 text-gray-800';
  }
}
