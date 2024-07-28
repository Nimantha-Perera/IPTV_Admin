// components/Food.js
import React, { useState } from 'react';

const initialFoods = [
  { id: '1', name: 'Pizza', category: 'Italian', price: '$12.99', availability: 'In Stock', customerVisibility: 'Visible' },
  { id: '2', name: 'Burger', category: 'American', price: '$8.99', availability: 'Out of Stock', customerVisibility: 'Hidden' },
  { id: '3', name: 'Sushi', category: 'Japanese', price: '$15.99', availability: 'In Stock', customerVisibility: 'Visible' },
];

export default function Food() {
  const [foods, setFoods] = useState(initialFoods);
  const [newFood, setNewFood] = useState({
    id: '',
    name: '',
    category: '',
    price: '',
    availability: 'In Stock',
    customerVisibility: 'Visible'
  });
  const [showForm, setShowForm] = useState(false);

  const handleAddNewFood = () => {
    setShowForm(!showForm);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewFood((prevFood) => ({
      ...prevFood,
      [name]: value
    }));
  };

  const handleAddFood = () => {
    setFoods((prevFoods) => [...prevFoods, { ...newFood, id: (prevFoods.length + 1).toString() }]);
    setNewFood({
      id: '',
      name: '',
      category: '',
      price: '',
      availability: 'In Stock',
      customerVisibility: 'Visible'
    });
    setShowForm(false);
  };

  const handleEditFood = (id) => {
    // Add logic for editing a food item
    console.log(`Edit food ${id}`);
  };

  const toggleVisibility = (id) => {
    setFoods((prevFoods) =>
      prevFoods.map((food) =>
        food.id === id
          ? { ...food, customerVisibility: food.customerVisibility === 'Visible' ? 'Hidden' : 'Visible' }
          : food
      )
    );
  };

  return (
    <div className="max-w-6xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Food Menu</h1>
        <div className="flex space-x-4">
          <button
            onClick={handleAddNewFood}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            {showForm ? 'Cancel' : 'Add New Food'}
          </button>
        </div>
      </div>
      {showForm && (
        <div className="mb-6 p-4 bg-gray-50 rounded-md shadow">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Add New Food</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                value={newFood.name}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Category</label>
              <input
                type="text"
                name="category"
                value={newFood.category}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Price</label>
              <input
                type="text"
                name="price"
                value={newFood.price}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Availability</label>
              <select
                name="availability"
                value={newFood.availability}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="In Stock">In Stock</option>
                <option value="Out of Stock">Out of Stock</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Customer Visibility</label>
              <select
                name="customerVisibility"
                value={newFood.customerVisibility}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="Visible">Visible</option>
                <option value="Hidden">Hidden</option>
              </select>
            </div>
            <button
              onClick={handleAddFood}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Add Food
            </button>
          </div>
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Food ID</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Name</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Category</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Price</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Availability</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Customer Visibility</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {foods.map((food) => (
              <tr key={food.id}>
                <td className="px-4 py-2 text-sm text-gray-900">{food.id}</td>
                <td className="px-4 py-2 text-sm text-gray-900">{food.name}</td>
                <td className="px-4 py-2 text-sm text-gray-900">{food.category}</td>
                <td className="px-4 py-2 text-sm text-gray-900">{food.price}</td>
                <td className="px-4 py-2 text-sm text-gray-900">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getAvailabilityClass(food.availability)}`}>
                    {food.availability}
                  </span>
                </td>
                <td className="px-4 py-2 text-sm text-gray-900">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getVisibilityClass(food.customerVisibility)}`}>
                    {food.customerVisibility}
                  </span>
                </td>
                <td className="px-4 py-2 text-sm text-gray-900 text-center">
                  <button
                    onClick={() => handleEditFood(food.id)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => toggleVisibility(food.id)}
                    className="ml-2 px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
                  >
                    Toggle Visibility
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

function getAvailabilityClass(availability) {
  switch (availability) {
    case 'In Stock':
      return 'bg-green-200 text-green-800';
    case 'Out of Stock':
      return 'bg-red-200 text-red-800';
    default:
      return 'bg-gray-200 text-gray-800';
  }
}

function getVisibilityClass(visibility) {
  switch (visibility) {
    case 'Visible':
      return 'bg-blue-200 text-blue-800';
    case 'Hidden':
      return 'bg-gray-200 text-gray-800';
    default:
      return 'bg-gray-200 text-gray-800';
  }
}
