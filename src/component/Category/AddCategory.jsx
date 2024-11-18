import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import config from '../../config';
import { getToken } from '../../utils/JWT_Token';

const AddCategory = () => {
  const [categoryName, setCategoryName] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('Active'); // Default status

  const handleCategoryNameChange = (event) => {
    setCategoryName(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  const token = getToken();
  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      const apiUrl = `${config.apiUrl}/B2B/categories/createCategory`;
      const response = await axios.post(apiUrl, {
        categoryName,
        description,
        status
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
    
      if (response.status === 200) {
        toast.success('Category added successfully!');
     
         navigate('/sellers/all/category'); // Example redirect
      } else {
        toast.error('Failed to add category. Please try again.');
      }
    } catch (error) {
      console.error('Error adding category:', error);
      toast.error('Error adding category. Please try again later.');
    }
  };
  

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-6">Add Category</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="categoryName" className="block text-gray-700 font-bold mb-2">Category Name</label>
          <input
            type="text"
            id="categoryName"
            name="categoryName"
            value={categoryName}
            onChange={handleCategoryNameChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-gray-700 font-bold mb-2">Description</label>
          <textarea
            id="description"
            name="description"
            value={description}
            onChange={handleDescriptionChange}
            required
            rows={4}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label htmlFor="status" className="block text-gray-700 font-bold mb-2">Status</label>
          <select
            id="status"
            name="status"
            value={status}
            onChange={handleStatusChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 focus:outline-none"
          >
            Add Category
          </button>
        </div>
      </form>

      <ToastContainer />
    </div>
  );
};

export default AddCategory;
