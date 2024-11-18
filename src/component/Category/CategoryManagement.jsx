import React, { useState, useEffect } from 'react';
import { Loader2, Plus, X, Edit2, Trash2, Check, AlertCircle } from 'lucide-react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import Skeleton from 'react-loading-skeleton';
import config from '../../config';
import { getToken } from '../../utils/JWT_Token';

const CategoryManagement = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const [formData, setFormData] = useState({
    id: '',
    categoryName: '',
    description: '',
    status: 'Active'
  });

  const token = getToken();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const apiUrl = `${config.apiUrl}/B2B/categories/fetchAllCategories`;
      const response = await axios.get(apiUrl, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCategories(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching categories:', error);
      toast.error('Failed to fetch categories');
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    console.log(name)
  };

  const resetForm = () => {
    setFormData({
      id: '',
      categoryName: '',
      description: '',
      status: 'Active'
    });
    setEditMode(false);
    setShowAddForm(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const apiUrl = editMode 
        ? `${config.apiUrl}/B2B/categories/updateCategoryById/${formData.id}`
        : `${config.apiUrl}/B2B/categories/createCategory`;

      const method = editMode ? axios.put : axios.post;
      
      await method(apiUrl, formData, {
        headers: { Authorization: `Bearer ${token}` }
      });

      toast.success(`Category ${editMode ? 'updated' : 'added'} successfully!`);
      fetchCategories();
      resetForm();
    } catch (error) {
      console.error('Error:', error);
      toast.error(`Failed to ${editMode ? 'update' : 'add'} category`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (category) => {
    setFormData(category);
    setEditMode(true);
    setShowAddForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this category?')) return;

    try {
      const apiUrl = `${config.apiUrl}/B2B/categories/deleteCategoryById/${id}`;
      await axios.delete(apiUrl, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Category deleted successfully!');
      fetchCategories();
    } catch (error) {
      console.error('Error deleting category:', error);
      toast.error('Failed to delete category');
    }
  };

  const filteredCategories = categories.filter(category =>
    category.categoryName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    category.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 py-20 px-4 mx-11 sm:px-6 lg:px-8 ">
      <div className="max-w-7xl mx-auto">
         {/* Search Bar */}
         <span className="flex  justify-end ">
          <input
            type="text"
            placeholder="Search categories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </span>
        <div className="flex1 justify-start items-start mb-8 -mt-12 ">
          <h1 className="text-3xl font-bold text-gray-900">Category Management</h1>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="flex my-6   px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            {showAddForm ? <X className="w-5 h-5 mr-2" /> : <Plus className="w-5 h-5 mr-2" />}
            {showAddForm ? 'Cancel' : 'Add Category'}
          </button>
        </div>

       

        {/* Form Section - Slides down when showAddForm is true */}
        <div className={`transition-all max-w-4xl mx-auto duration-300 ease-in-out overflow-hidden ${showAddForm ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className=" p-6 rounded-lg shadow-md mb-8">
            <h2 className="text-2xl font-bold text-center mb-6">
              {editMode ? 'Edit Category' : 'Add New Category'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category Name
                  </label>
                  <input
                    type="text"
                    name="categoryName"
                    value={formData.categoryName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    disabled={isSubmitting}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    disabled={isSubmitting}
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      {editMode ? 'Updating...' : 'Adding...'}
                    </>
                  ) : (
                    <>
                      <Check className="w-4 h-4 mr-2" />
                      {editMode ? 'Update Category' : 'Add Category'}
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Categories Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {loading ? (
                  Array.from({ length: 5 }).map((_, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Skeleton width={20} />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Skeleton width={150} />
                      </td>
                      <td className="px-6 py-4">
                        <Skeleton width={200} />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Skeleton width={60} />
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Skeleton width={100} />
                      </td>
                    </tr>
                  ))
                ) : filteredCategories.length > 0 ? (
                  filteredCategories.map((category, index) => (
                    <tr key={category.id} className="hover:bg-gray-50 transition-colors duration-150">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{index + 1}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {category.categoryName}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">{category.description}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          category.status === 'Active'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {category.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-2">
                          <button
                            onClick={() => handleEdit(category)}
                            className="text-blue-600 hover:text-blue-900 transition-colors duration-200"
                          >
                            <Edit2 className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => handleDelete(category.id)}
                            className="text-red-600 hover:text-red-900 transition-colors duration-200"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                      <div className="flex flex-col items-center justify-center py-8">
                        <AlertCircle className="w-12 h-12 text-gray-400 mb-3" />
                        <p className="text-lg font-medium">No categories found</p>
                        <p className="text-sm text-gray-500">
                          {searchQuery ? 'Try adjusting your search' : 'Start by adding a new category'}
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <ToastContainer position="bottom-right" />
    </div>
  );
};

export default CategoryManagement;