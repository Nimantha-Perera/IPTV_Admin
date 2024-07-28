import React, { useState } from 'react';
import useFoods from '../hooks/foods_hook';
import useFirebaseStorage from '../hooks/useFirebaseStorage';
import Alert from '../alerts/alert';
import FoodEditModal from '../forms/food modal/FoodEditModal';

export default function Food() {
  const { foods, loading, error, addFood, editFood, deleteFood } = useFoods();
  const { uploadImage, uploading } = useFirebaseStorage();
  const [newFood, setNewFood] = useState({
    id: '',
    name: '',
    category: '',
    price: 0,
    availability: 'In Stock',
    customerVisibility: 'Visible',
    imageUrl: ''
  });
  const [showForm, setShowForm] = useState(false);
  const [alert, setAlert] = useState({ type: '', message: '' });
  const [showEditModal, setShowEditModal] = useState(false);
  const [foodToEdit, setFoodToEdit] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [foodToDelete, setFoodToDelete] = useState(null);

  const handleAddNewFood = () => {
    setShowForm(!showForm);
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image' && files[0]) {
      uploadImage(files[0]).then((url) => {
        setNewFood((prevFood) => ({
          ...prevFood,
          imageUrl: url
        }));
      });
    } else {
      setNewFood((prevFood) => ({
        ...prevFood,
        [name]: name === 'price' ? Number(value) : value
      }));
    }
  };

  const handleAddFood = async () => {
    await addFood(newFood);
    setNewFood({
      id: '',
      name: '',
      category: '',
      price: 0,
      availability: 'In Stock',
      customerVisibility: 'Visible',
      imageUrl: ''
    });
    setShowForm(false);
    setAlert({ type: 'success', message: 'Food item added successfully!' });
  };

  const handleEditFood = async (editedFood) => {
    await editFood(editedFood);
    setAlert({ type: 'success', message: 'Food item edited successfully!' });
  };

  const handleDeleteFood = async (id) => {
    await deleteFood(id);
    setAlert({ type: 'success', message: 'Food item deleted successfully!' });
  };

  const toggleVisibility = async (id) => {
    const food = foods.find(food => food.id === id);
    if (food) {
      await editFood({
        ...food,
        customerVisibility: food.customerVisibility === 'Visible' ? 'Hidden' : 'Visible'
      });
      setAlert({ type: 'success', message: 'Food item visibility toggled successfully!' });
    }
  };

  const handleEditClick = (food) => {
    setFoodToEdit(food);
    setShowEditModal(true);
  };

  const handleDeleteClick = (food) => {
    setFoodToDelete(food);
    setShowDeleteConfirm(true);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="max-w-6xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      {alert.message && (
        <Alert
          type={alert.type}
          message={alert.message}
          onClose={() => setAlert({ type: '', message: '' })}
        />
      )}
      {showEditModal && (
        <FoodEditModal
          food={foodToEdit}
          onSave={handleEditFood}
          onClose={() => setShowEditModal(false)}
        />
      )}
      {showDeleteConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-md shadow-md">
            <h2 className="text-xl font-semibold mb-4">Are you sure you want to delete this item?</h2>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => {
                  handleDeleteFood(foodToDelete.id);
                  setShowDeleteConfirm(false);
                }}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              >
                Delete
              </button>
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
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
                type="number"
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
            <div>
              <label className="block text-sm font-medium text-gray-700">Image</label>
              <input
                type="file"
                name="image"
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              {uploading && <p>Uploading image...</p>}
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
                    onClick={() => handleEditClick(food)}
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
                  <button
                    onClick={() => handleDeleteClick(food)}
                    className="ml-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                  >
                    Delete
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
