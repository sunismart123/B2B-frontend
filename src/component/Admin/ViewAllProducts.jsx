import React, { useEffect, useState } from 'react';
import axios from 'axios';
import config from '../../config';

const ViewAllProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${config.apiUrl}/B2B/products/fetchAllProducts`);
        setProducts(response.data.products);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center my-4">All Products</h1>
      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-green-900">
            <tr>
              <th className="px-6 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-white uppercase tracking-wider">Image</th>
              <th className="px-6 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-white uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-white uppercase tracking-wider">Description</th>
              <th className="px-6 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-white uppercase tracking-wider">Price</th>
              <th className="px-6 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-white uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-white uppercase tracking-wider">Total Quantity</th>
              <th className="px-6 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-white uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-white uppercase tracking-wider">Seller</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {products.map((product, index) => (
              <tr key={product.id} className="hover:bg-gray-100">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  <img src={`${config.apiUrl}/B2B/images/${product.image1}`} alt={product.name} className="w-16 h-16 object-cover mx-auto rounded-md" />
                </td>
                <td className="px-6 py-4 whitespace-nowrap font-semibold text-base text-gray-900">{product.name}</td>
                <td className="px-6 py-4 whitespace-nowrap font-semibold text-base text-gray-700">{product.description}</td>
                <td className="px-6 py-4 whitespace-nowrap font-semibold text-base text-gray-900">₹{product.price.toFixed(2)}</td>
                <td className="px-6 py-4 whitespace-nowrap font-semibold text-base text-gray-700">{product.category.categoryName}</td>
                <td className="px-6 py-4 whitespace-nowrap font-semibold text-base text-gray-900">{product.totalQuantity}</td>
                <td className="px-6 py-4 whitespace-nowrap font-semibold text-base text-gray-700">{product.status}</td>
                <td className="px-6 py-4 whitespace-nowrap font-semibold text-base text-gray-900">{product.seller.firstName} {product.seller.lastName}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewAllProducts;
