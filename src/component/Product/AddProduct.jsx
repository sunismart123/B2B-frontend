import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import config from '../../config';
import { getToken } from '../../utils/JWT_Token';
import { Hourglass } from 'react-loader-spinner';

const AddProduct = () => {
  const [categories, setCategories] = useState([]);
  const seller = JSON.parse(localStorage.getItem('seller'));
  const sellerId = seller?.id;

  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    totalQuantity: '',
    categoryId: '',
    sellerId,
    image1: null,
    image2: null,
    image3: null,
    minQuantity: '',
    mediumQuantity: '',
    maxQuantity: '',
    minQuantityPricePerUnit: '',
    midQuantityPricePerUnit: '',
    maxQuantityPricePerUnit: '',
  });
  const [loading, setLoading] = useState(false);

  const token = getToken();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const apiUrl = `${config.apiUrl}/B2B/categories/fetchAllCategories`;
        const response = await axios.get(apiUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, [token]);

  const handleChange = e => {
    const { name, value, files } = e.target;
    if (files) {
      setProduct({ ...product, [name]: files[0] });
    } else {
      setProduct({ ...product, [name]: value });
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    for (const key in product) {
      formData.append(key, product[key]);
    }

    try {
      const apiUrl = `${config.apiUrl}/B2B/products/addProduct`;
      await axios.post(apiUrl, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success('Product added successfully!');

      setProduct({
        name: '',
        description: '',
        price: '',
        totalQuantity: '',
        categoryId: '',
        sellerId: sellerId,
        image1: null,
        image2: null,
        image3: null,
        minQuantity: '',
        mediumQuantity: '',
        maxQuantity: '',
        minQuantityPricePerUnit: '',
        midQuantityPricePerUnit: '',
        maxQuantityPricePerUnit: '',
      });
    } catch (error) {
      console.error('Error adding product:', error);
      toast.error('Error adding product. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center  mt-16 items-center min-h-screen bg-gray-100 p-6">
      <ToastContainer />
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-4xl w-full">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Add Product
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="name"
                className="block text-gray-700 font-semibold mb-2"
              >
                Product Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={product.name}
                onChange={handleChange}
                placeholder="Name of the Product"
                required
                className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label
                htmlFor="description"
                className="block text-gray-700 font-semibold mb-2"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={product.description}
                onChange={handleChange}
                required
                rows="2"
                placeholder="Description of the Product"
                className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label
                htmlFor="price"
                className="block text-gray-700 font-semibold mb-2"
              >
                Price
              </label>
              <input
                type="number"
                step="0.01"
                id="price"
                name="price"
                placeholder="Enter Price"
                value={product.price}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label
                htmlFor="totalQuantity"
                className="block text-gray-700 font-semibold mb-2"
              >
                Total Quantity
              </label>
              <input
                type="number"
                id="totalQuantity"
                name="totalQuantity"
                placeholder="Enter Total Quantity"
                value={product.totalQuantity}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label
                htmlFor="categoryId"
                className="block text-gray-700 font-semibold mb-2"
              >
                Category
              </label>
              <select
                id="categoryId"
                name="categoryId"
                value={product.categoryId}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select a category</option>
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.categoryName}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="sellerId"
                className="block text-gray-700 font-semibold mb-2"
              >
                Seller ID
              </label>
              <input
                type="number"
                id="sellerId"
                name="sellerId"
                value={product.sellerId}
                disabled
                required
                className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none bg-gray-100 cursor-not-allowed"
              />
            </div>

            <div>
              <label
                htmlFor="minQuantity"
                className="block text-gray-700 font-semibold mb-2"
              >
                Min Quantity
              </label>
              <input
                type="number"
                id="minQuantity"
                name="minQuantity"
                placeholder="Enter Minimum Quantity"
                value={product.minQuantity}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label
                htmlFor="minQuantityPricePerUnit"
                className="block text-gray-700 font-semibold mb-2"
              >
                Min Quantity Price Per Unit
              </label>
              <input
                type="number"
                step="0.01"
                id="minQuantityPricePerUnit"
                name="minQuantityPricePerUnit"
                placeholder="Price Per Unit for Min Quantity"
                value={product.minQuantityPricePerUnit}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label
                htmlFor="mediumQuantity"
                className="block text-gray-700 font-semibold mb-2"
              >
                Medium Quantity
              </label>
              <input
                type="number"
                id="mediumQuantity"
                name="mediumQuantity"
                placeholder="Enter Medium Quantity"
                value={product.mediumQuantity}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label
                htmlFor="midQuantityPricePerUnit"
                className="block text-gray-700 font-semibold mb-2"
              >
                Medium Quantity Price Per Unit
              </label>
              <input
                type="number"
                step="0.01"
                id="midQuantityPricePerUnit"
                name="midQuantityPricePerUnit"
                placeholder="Price Per Unit for Medium Quantity"
                value={product.midQuantityPricePerUnit}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label
                htmlFor="maxQuantity"
                className="block text-gray-700 font-semibold mb-2"
              >
                Max Quantity
              </label>
              <input
                type="number"
                id="maxQuantity"
                name="maxQuantity"
                placeholder="Enter Maximum Quantity"
                value={product.maxQuantity}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label
                htmlFor="maxQuantityPricePerUnit"
                className="block text-gray-700 font-semibold mb-2"
              >
                Max Quantity Price Per Unit
              </label>
              <input
                type="number"
                step="0.01"
                id="maxQuantityPricePerUnit"
                name="maxQuantityPricePerUnit"
                placeholder="Price Per Unit for Max Quantity"
                value={product.maxQuantityPricePerUnit}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label
                  htmlFor="image1"
                  className="block text-gray-700 font-semibold mb-2"
                >
                  Image 1
                </label>
                <input
                  type="file"
                  id="image1"
                  name="image1"
                  onChange={handleChange}
                  accept="image/*"
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label
                  htmlFor="image2"
                  className="block text-gray-700 font-semibold mb-2"
                >
                  Image 2
                </label>
                <input
                  type="file"
                  id="image2"
                  name="image2"
                  onChange={handleChange}
                  accept="image/*"
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label
                  htmlFor="image3"
                  className="block text-gray-700 font-semibold mb-2"
                >
                  Image 3
                </label>
                <input
                  type="file"
                  id="image3"
                  name="image3"
                  onChange={handleChange}
                  accept="image/*"
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className={`bg-blue-600 text-white font-semibold py-3 px-6 rounded-md transition duration-300 ${
                  loading
                    ? 'bg-blue-300 cursor-not-allowed'
                    : 'hover:bg-blue-700'
                }`}
                disabled={loading}
              >
                {loading ? 'Submitting...' : 'Add Product'}
              </button>
            </div>
          </div>
          {loading && (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
              <Hourglass
                visible={true}
                height="80"
                width="80"
                ariaLabel="hourglass-loading"
                colors={['#6661a9', '#34A853', '#FBBC05', '#EA4335']}
              />
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default AddProduct;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import config from '../../config';
// import { getToken } from '../../utils/JWT_Token';
// import { Hourglass } from 'react-loader-spinner';
// import { motion } from 'framer-motion';

// const AddProduct = () => {
//   const [categories, setCategories] = useState([]);
//   const seller = JSON.parse(localStorage.getItem('seller'));
//   const sellerId = seller?.id;

//   const [product, setProduct] = useState({
//     name: '',
//     description: '',
//     price: '',
//     totalQuantity: '',
//     categoryId: '',
//     sellerId,
//     image1: null,
//     image2: null,
//     image3: null,
//     minQuantity: '',
//     mediumQuantity: '',
//     maxQuantity: '',
//     minQuantityPricePerUnit: '',
//     midQuantityPricePerUnit: '',
//     maxQuantityPricePerUnit: '',
//   });
//   const [loading, setLoading] = useState(false);

//   const token = getToken();

//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const apiUrl = `${config.apiUrl}/B2B/categories/fetchAllCategories`;
//         const response = await axios.get(apiUrl, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         setCategories(response.data);
//       } catch (error) {
//         console.error('Error fetching categories:', error);
//       }
//     };

//     fetchCategories();
//   }, [token]);

//   const handleChange = e => {
//     const { name, value, files } = e.target;
//     if (files) {
//       setProduct({ ...product, [name]: files[0] });
//     } else {
//       setProduct({ ...product, [name]: value });
//     }
//   };

//   const handleSubmit = async e => {
//     e.preventDefault();
//     setLoading(true);

//     const formData = new FormData();
//     for (const key in product) {
//       formData.append(key, product[key]);
//     }

//     try {
//       const apiUrl = `${config.apiUrl}/B2B/products/addProduct`;
//       await axios.post(apiUrl, formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       toast.success('Product added successfully!');

//       setProduct({
//         name: '',
//         description: '',
//         price: '',
//         totalQuantity: '',
//         categoryId: '',
//         sellerId: sellerId,
//         image1: null,
//         image2: null,
//         image3: null,
//         minQuantity: '',
//         mediumQuantity: '',
//         maxQuantity: '',
//         minQuantityPricePerUnit: '',
//         midQuantityPricePerUnit: '',
//         maxQuantityPricePerUnit: '',
//       });
//     } catch (error) {
//       console.error('Error adding product:', error);
//       toast.error('Error adding product. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 50 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//       className="flex justify-center mt-16 items-center min-h-screen bg-gray-100 p-6"
//     >
//       <ToastContainer />
//       <div className="bg-white shadow-lg rounded-lg p-6 max-w-4xl w-full">
//         <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
//           Add Product
//         </h2>
//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div>
//               <label
//                 htmlFor="name"
//                 className="block text-gray-700 font-semibold mb-2"
//               >
//                 Product Name
//               </label>
//               <input
//                 type="text"
//                 id="name"
//                 name="name"
//                 value={product.name}
//                 onChange={handleChange}
//                 placeholder="Name of the Product"
//                 required
//                 className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>

//             <div>
//               <label
//                 htmlFor="description"
//                 className="block text-gray-700 font-semibold mb-2"
//               >
//                 Description
//               </label>
//               <textarea
//                 id="description"
//                 name="description"
//                 value={product.description}
//                 onChange={handleChange}
//                 required
//                 rows="2"
//                 placeholder="Description of the Product"
//                 className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>

//             <div>
//               <label
//                 htmlFor="price"
//                 className="block text-gray-700 font-semibold mb-2"
//               >
//                 Price
//               </label>
//               <input
//                 type="number"
//                 step="0.01"
//                 id="price"
//                 name="price"
//                 placeholder="Enter Price"
//                 value={product.price}
//                 onChange={handleChange}
//                 required
//                 className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>

//             <div>
//               <label
//                 htmlFor="totalQuantity"
//                 className="block text-gray-700 font-semibold mb-2"
//               >
//                 Total Quantity
//               </label>
//               <input
//                 type="number"
//                 id="totalQuantity"
//                 name="totalQuantity"
//                 placeholder="Enter Total Quantity"
//                 value={product.totalQuantity}
//                 onChange={handleChange}
//                 required
//                 className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>

//             <div>
//               <label
//                 htmlFor="categoryId"
//                 className="block text-gray-700 font-semibold mb-2"
//               >
//                 Category
//               </label>
//               <select
//                 id="categoryId"
//                 name="categoryId"
//                 value={product.categoryId}
//                 onChange={handleChange}
//                 required
//                 className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//               >
//                 <option value="">Select a category</option>
//                 {categories.map(category => (
//                   <option key={category.id} value={category.id}>
//                     {category.categoryName}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             <div>
//               <label
//                 htmlFor="sellerId"
//                 className="block text-gray-700 font-semibold mb-2"
//               >
//                 Seller ID
//               </label>
//               <input
//                 type="number"
//                 id="sellerId"
//                 name="sellerId"
//                 value={product.sellerId}
//                 disabled
//                 required
//                 className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none bg-gray-100 cursor-not-allowed"
//               />
//             </div>

//             <div>
//               <label
//                 htmlFor="minQuantity"
//                 className="block text-gray-700 font-semibold mb-2"
//               >
//                 Min Quantity
//               </label>
//               <input
//                 type="number"
//                 id="minQuantity"
//                 name="minQuantity"
//                 placeholder="Enter Minimum Quantity"
//                 value={product.minQuantity}
//                 onChange={handleChange}
//                 required
//                 className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>

//             <div>
//               <label
//                 htmlFor="minQuantityPricePerUnit"
//                 className="block text-gray-700 font-semibold mb-2"
//               >
//                 Min Quantity Price Per Unit
//               </label>
//               <input
//                 type="number"
//                 step="0.01"
//                 id="minQuantityPricePerUnit"
//                 name="minQuantityPricePerUnit"
//                 placeholder="Price Per Unit for Min Quantity"
//                 value={product.minQuantityPricePerUnit}
//                 onChange={handleChange}
//                 required
//                 className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>

//             <div>
//               <label
//                 htmlFor="mediumQuantity"
//                 className="block text-gray-700 font-semibold mb-2"
//               >
//                 Medium Quantity
//               </label>
//               <input
//                 type="number"
//                 id="mediumQuantity"
//                 name="mediumQuantity"
//                 placeholder="Enter Medium Quantity"
//                 value={product.mediumQuantity}
//                 onChange={handleChange}
//                 required
//                 className="w-full p-3 border border-gray -300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
// </div>
//             <div>
//               <label
//                 htmlFor="midQuantityPricePerUnit"
//                 className="block text-gray-700 font-semibold mb-2"
//               >
//                 Medium Quantity Price Per Unit
//               </label>
//               <input
//                 type="number"
//                 step="0.01"
//                 id="midQuantityPricePerUnit"
//                 name="midQuantityPricePerUnit"
//                 placeholder="Price Per Unit for Medium Quantity"
//                 value={product.midQuantityPricePerUnit}
//                 onChange={handleChange}
//                 required
//                 className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>

//             <div>
//               <label
//                 htmlFor="maxQuantity"
//                 className="block text-gray-700 font-semibold mb-2"
//               >
//                 Max Quantity
//               </label>
//               <input
//                 type="number"
//                 id="maxQuantity"
//                 name="maxQuantity"
//                 placeholder="Enter Maximum Quantity"
//                 value={product.maxQuantity}
//                 onChange={handleChange}
//                 required
//                 className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>

//             <div>
//               <label
//                 htmlFor="maxQuantityPricePerUnit"
//                 className="block text-gray-700 font-semibold mb-2"
//               >
//                 Max Quantity Price Per Unit
//               </label>
//               <input
//                 type="number"
//                 step="0.01"
//                 id="maxQuantityPricePerUnit"
//                 name="maxQuantityPricePerUnit"
//                 placeholder="Price Per Unit for Max Quantity"
//                 value={product.maxQuantityPricePerUnit}
//                 onChange={handleChange}
//                 required
//                 className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             <div>
//               <label
//                 htmlFor="image1"
//                 className="block text-gray-700 font-semibold mb-2"
//               >
//                 Image 1
//               </label>
//               <input
//                 type="file"
//                 id="image1"
//                 name="image1"
//                 onChange={handleChange}
//                 accept="image/*"
//                 className="w-full p-2 border border-gray-300 rounded-md"
//               />
//             </div>
//             <div>
//               <label
//                 htmlFor="image2"
//                 className="block text-gray-700 font-semibold mb-2"
//               >
//                 Image 2
//               </label>
//               <input
//                 type="file"
//                 id="image2"
//                 name="image2"
//                 onChange={handleChange}
//                 accept="image/*"
//                 className="w-full p-2 border border-gray-300 rounded-md"
//               />
//             </div>
//             <div>
//               <label
//                 htmlFor="image3"
//                 className="block text-gray-700 font-semibold mb-2"
//               >
//                 Image 3
//               </label>
//               <input
//                 type="file"
//                 id="image3"
//                 name="image3"
//                 onChange={handleChange}
//                 accept="image/*"
//                 className="w-full p-2 border border-gray-300 rounded-md"
//               />
//             </div>
//           </div>
//           <div className="flex justify-center">
//             <motion.button
//               type="submit"
//               className={`bg-blue-600 text-white font-semibold py-3 px-6 rounded-md transition duration-300 ${
//                 loading
//                   ? 'bg-blue-300 cursor-not-allowed'
//                   : 'hover:bg-blue-700'
//               }`}
//               disabled={loading}
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//             >
//               {loading ? 'Submitting...' : 'Add Product'}
//             </motion.button>
//           </div>
//         </form>
//         {loading && (
//           <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
//             <Hourglass
//               visible={true}
//               height="80"
//               width="80"
//               ariaLabel="hourglass-loading"
//               colors={['#6661a9', '#34A853', '#FBBC05', '#EA4335']}
//             />
//           </div>
//         )}
//       </div>
//     </motion.div>
//   );
// };

// export default AddProduct;