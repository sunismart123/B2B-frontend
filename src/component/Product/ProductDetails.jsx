
// import React, { useEffect } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import Carousel from 'react-multi-carousel';
// import 'react-multi-carousel/lib/styles.css';
// import { FaCartPlus, FaMoneyBillWave } from 'react-icons/fa';
// import axios from 'axios';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import config from '../../config';
// import { getToken } from '../../utils/JWT_Token';
// import ProductReview from './ProductReview';
// import { useCart } from '../../Context/CartContext'; // Import useCart

// const ProductDetails = () => {
//   const location = useLocation();
//   const product = location?.state?.product;
//   const navigate = useNavigate();
//   const { fetchCart } = useCart(); // Only import fetchCart

//   useEffect(() => {
//     if (!product) {
//       toast.error(
//         'Product information is missing. Redirecting to the products page...',
//         {
//           position: 'top-right',
//           autoClose: 2000,
//         },
//       );
//       setTimeout(() => {
//         navigate('/');
//       }, 2000);
//     }
//   }, [product, navigate]);

//   const addToCart = async () => {
//     const user = JSON.parse(localStorage.getItem('buyer'));

//     if (!user) {
//       toast.error('Please login to buy the products!', {
//         position: 'top-right',
//         autoClose: 2000,
//       });
//       setTimeout(() => {
//         navigate('/sign-in');
//       }, 1200);
//       return;
//     }

//     const quantity = parseInt(
//       window.prompt(
//         `Enter the quantity (minimum ${product.bulkPricing.minQuantity}):`,
//         product.bulkPricing.minQuantity,
//       ),
//       10,
//     );

//     if (isNaN(quantity) || quantity < product.bulkPricing.minQuantity) {
//       toast.error(
//         `Please enter a valid quantity of at least ${product.bulkPricing.minQuantity}.`,
//       );
//       return;
//     }

//     if (quantity <= 0) {
//       toast.error('Please enter a positive quantity!', {
//         position: 'top-center',
//         autoClose: 1000,
//       });
//       return;
//     }

//     if (product.totalQuantity < quantity) {
//       toast.error('Product Out Of Stock!', {
//         position: 'top-center',
//         autoClose: 1000,
//       });
//       return;
//     }

//     const cartItem = {
//       userId: user.id,
//       productId: product.id,
//       quantity: quantity,
//     };

//     try {
//       const token = getToken();

//       const response = await axios.post(
//         `${config.apiUrl}/B2B/cart/addToCart`,
//         cartItem,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         },
//       );

//       if (response.data.success) {
//         toast.success('Product added to cart!', {
//           position: 'top-center',
//           autoClose: 1000,
//         });
//         await fetchCart(); // Update cart state after successful addition
//       } else {
//         toast.error('Failed to add product to cart. Please try again later.');
//       }
//     } catch (error) {
//       console.error('Error adding product to cart:', error);
//       toast.error('Failed to add product to cart. Please try again later.');
//     }
//   };

//   const buyNow = product => {
//     navigate('/buyer/order', { state: { product } });
//   };

//   const responsive = {
//     desktop: { breakpoint: { max: 3000, min: 1024 }, items: 1 },
//     tablet: { breakpoint: { max: 1024, min: 464 }, items: 1 },
//     mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
//   };

//   if (!product) {
//     return <div>Loading...</div>; // Render a fallback message while redirecting
//   }

//   return (
//     <div className="container mx-auto py-16 ">
//       <div className="flex flex-col md:flex-row gap-8">
//         <div className="w-full md:w-1/2">
//           <Carousel
//             responsive={responsive}
//             infinite={true}
//             showDots={true}
//             containerClass="carousel-container"
//             itemClass="carousel-item-padding-40-px"
//           >
//             <div className="product-image-container">
//               <img
//                 src={`${config.apiUrl}/B2B/products/${product.image1}`}
//                 alt={product.name}
//                 className="w-full h-[500px] object-contain"
//               />
//             </div>
//             {product.image2 && (
//               <div className="product-image-container">
//                 <img
//                   src={`${config.apiUrl}/B2B/products/${product.image2}`}
//                   alt={product.name}
//                   className="w-full h-[500px] object-contain"
//                 />
//               </div>
//             )}
//             {product.image3 && (
//               <div className="product-image-container">
//                 <img
//                   src={`${config.apiUrl}/B2B/products/${product.image3}`}
//                   alt={product.name}
//                   className="w-full h-[500px] object-contain"
//                 />
//               </div>
//             )}
//           </Carousel>
//         </div>
//         <div className="w-full md:w-1/2 space-y-4">
//           <h1 className="text-3xl font-bold mb-6 text-left">{product.name}</h1>
//           <p className="text-xl text-gray-700">
//             Description: {product.description}
//           </p>
//           <p className="text-3xl font-bold text-green-600">
//             ₹{product.price.toFixed(2)}
//           </p>
//           <div className="flex space-x-2 mt-4">
//             <button
//               className="bg-blue-500 text-white py-2 px-4 rounded flex items-center space-x-2 hover:bg-blue-600 transition duration-200"
//               onClick={e => {
//                 e.stopPropagation();
//                 addToCart(product);
//               }}
//             >
//               <FaCartPlus className="text-lg" />
//               <span>Add to Cart</span>
//             </button>
//             <button
//               className="bg-green-500 text-white py-2 px-4 rounded flex items-center space-x-2 hover:bg-green-600 transition duration-200"
//               onClick={e => {
//                 e.stopPropagation();
//                 buyNow(product);
//               }}
//             >
//               <FaMoneyBillWave className="text-lg" />
//               <span>Buy Now</span>
//             </button>
//           </div>
//           <div className="bg-gray-100 p-4 rounded-lg">
//             <p className="text-lg font-semibold mb-2">Product Details:</p>
//             <p className="text-gray-700">
//               Category:{' '}
//               <span className="font-medium">
//                 {product.category.categoryName}
//               </span>
//             </p>
//             <p className="text-gray-700">
//               Stock:{' '}
//               <span className="font-medium">{product.totalQuantity}</span>
//             </p>
//           </div>
//           <div className="bg-blue-50 p-4 rounded-lg">
//             <p className="text-lg font-semibold mb-2">Bulk Pricing:</p>
//             <div className="grid grid-cols-3 gap-4">
//               <div className="text-center">
//                 <p className="font-medium">Min Quantity</p>
//                 <p className="font-mono text-lg">
//                   <span className="text-green-600 font-semibold">
//                     {product.bulkPricing.minQuantity}
//                   </span>
//                   <span className="text-black font-semibold">-</span>
//                   <span className="text-green-600 font-semibold">
//                     {product.bulkPricing.mediumQuantity - 1}
//                   </span>
//                   <span className=" font-semibold"> pcs</span>
//                 </p>
//                 <p className="font-bold">
//                   ₹{product.bulkPricing.minQuantityPricePerUnit.toFixed(2)}
//                 </p>
//               </div>
//               <div className="text-center">
//                 <p className="font-medium">Mid Quantity</p>
//                 <p className="font-mono text-lg">
//                   <span className="text-green-600 font-semibold">
//                     {product.bulkPricing.mediumQuantity}
//                   </span>
//                   <span className="text-black font-semibold">-</span>
//                   <span className="text-green-600 font-semibold">
//                     {product.bulkPricing.maxQuantity - 1}
//                   </span>
//                   <span className=" font-semibold"> pcs</span>
//                 </p>
//                 <p className="font-bold">
//                   ₹{product.bulkPricing.midQuantityPricePerUnit.toFixed(2)}
//                 </p>
//               </div>
//               <div className="text-center">
//                 <p className="font-medium">Max Quantity</p>
//                 <p className="text-green-600 font-extrabold">
//                   <span className="text-black font-extrabold">Above </span>
//                   {product.bulkPricing.maxQuantity}
//                   <span className=" font-semibold text-black"> pcs</span>
//                 </p>
//                 <p className="font-bold">
//                   ₹{product.bulkPricing.maxQuantityPricePerUnit.toFixed(2)}
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="">
//         <ProductReview selectedProduct={product} />
//       </div>
//     </div>
//   );
// };

// export default ProductDetails;



import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { FaCartPlus, FaMoneyBillWave } from 'react-icons/fa';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import config from '../../config';
import { getToken } from '../../utils/JWT_Token';
import ProductReview from './ProductReview';
import { useCart } from '../../Context/CartContext';

const ProductDetails = () => {
  const location = useLocation();
  const product = location?.state?.product;
  const navigate = useNavigate();
  const { fetchCart } = useCart();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    if (!product) {
      toast.error(
        'Product information is missing. Redirecting to the products page...',
        {
          position: 'top-right',
          autoClose: 2000,
        },
      );
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } else {
      scrollToTop();
    }
  }, [product, navigate]);

  const addToCart = async () => {
    const user = JSON.parse(localStorage.getItem('buyer'));

    if (!user) {
      toast.error('Please login to buy the products!', {
        position: 'top-right',
        autoClose: 2000,
      });
      setTimeout(() => {
        navigate('/sign-in');
      }, 1200);
      return;
    }

    const quantity = parseInt(
      window.prompt(
        `Enter the quantity (minimum ${product.bulkPricing.minQuantity}):`,
        product.bulkPricing.minQuantity,
      ),
      10,
    );

    if (isNaN(quantity) || quantity < product.bulkPricing.minQuantity) {
      toast.error(
        `Please enter a valid quantity of at least ${product.bulkPricing.minQuantity}.`,
      );
      return;
    }

    if (quantity <= 0) {
      toast.error('Please enter a positive quantity!', {
        position: 'top-center',
        autoClose: 1000,
      });
      return;
    }

    if (product.totalQuantity < quantity) {
      toast.error('Product Out Of Stock!', {
        position: 'top-center',
        autoClose: 1000,
      });
      return;
    }

    const cartItem = {
      userId: user.id,
      productId: product.id,
      quantity: quantity,
    };

    try {
      const token = getToken();

      const response = await axios.post(
        `${config.apiUrl}/B2B/cart/addToCart`,
        cartItem,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.data.success) {
        toast.success('Product added to cart!', {
          position: 'top-center',
          autoClose: 1000,
        });
        await fetchCart(); // Update cart state after successful addition
      } else {
        toast.error('Failed to add product to cart. Please try again later.');
      }
    } catch (error) {
      console.error('Error adding product to cart:', error);
      toast.error('Failed to add product to cart. Please try again later.');
    }
  };

  const buyNow = product => {
    navigate('/buyer/order', { state: { product } });
  };

  const responsive = {
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 1 },
    tablet: { breakpoint: { max: 1024, min: 464 }, items: 1 },
    mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto py-16 relative">
      {/* Animated background design */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-[-1]">
        <div className="w-full h-full bg-gradient-to-r from-blue-500 to-indigo-500 opacity-10 animate-gradient-x"></div>
        <div className="w-full h-full bg-gradient-to-b from-purple-500 to-pink-500 opacity-10 animate-gradient-y"></div>
        <div className="w-full h-full bg-gradient-to-r from-green-500 to-yellow-500 opacity-10 animate-gradient-x-reverse"></div>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/2">
          <Carousel
            responsive={responsive}
            infinite={true}
            showDots={true}
            containerClass="carousel-container"
            itemClass="carousel-item-padding-40-px"
          >
            <div className="product-image-container">
              <img
                src={`${config.apiUrl}/B2B/products/${product.image1}`}
                alt={product.name}
                className="w-full h-[500px] object-contain"
              />
            </div>
            {product.image2 && (
              <div className="product-image-container">
                <img
                  src={`${config.apiUrl}/B2B/products/${product.image2}`}
                  alt={product.name}
                  className="w-full h-[500px] object-contain"
                />
              </div>
            )}
            {product.image3 && (
              <div className="product-image-container">
                <img
                  src={`${config.apiUrl}/B2B/products/${product.image3}`}
                  alt={product.name}
                  className="w-full h-[500px] object-contain"
                />
              </div>
            )}
          </Carousel>
        </div>
        <div className="w-full md:w-1/2 space-y-4">
          <h1 className="text-3xl font-bold mb-6 text-left animate-fade-in">
            {product.name}
          </h1>
          <p className="text-xl text-gray-700 animate-fade-in-delay-200">
            Description: {product.description}
          </p>
          <p className="text-3xl font-bold text-green-600 animate-fade-in-delay-400">
            ₹{product.price.toFixed(2)}
          </p>
          <div className="flex space-x-2 mt-4 animate-fade-in-delay-600">
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded flex items-center space-x-2 hover:bg-blue-600 transition duration-200"
              onClick={e => {
                e.stopPropagation();
                addToCart(product);
              }}
            >
              <FaCartPlus className="text-lg" />
              <span>Add to Cart</span>
            </button>
            <button
              className="bg-green-500 text-white py-2 px-4 rounded flex items-center space-x-2 hover:bg-green-600 transition duration-200"
              onClick={e => {
                e.stopPropagation();
                buyNow(product);
              }}
            >
              <FaMoneyBillWave className="text-lg" />
              <span>Buy Now</span>
            </button>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg animate-fade-in-delay-800">
            <p className="text-lg font-semibold mb-2">Product Details:</p>
            <p className="text-gray-700">
              Category:{' '}
              <span className="font-medium">
                {product.category.categoryName}
              </span>
            </p>
            <p className="text-gray-700">
              Stock:{' '}
              <span className="font-medium">{product.totalQuantity}</span>
            </p>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg animate-fade-in-delay-1000">
            <p className="text-lg font-semibold mb-2">Bulk Pricing:</p>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <p className="font-medium">Min Quantity</p>
                <p className="font-mono text-lg">
                  <span className="text-green-600 font-semibold">
                    {product.bulkPricing.minQuantity}
                  </span>
                  <span className="text-black font-semibold">-</span>
                  <span className="text-green-600 font-semibold">
                    {product.bulkPricing.mediumQuantity - 1}
                  </span>
                  <span className=" font-semibold"> pcs</span>
                </p>
                <p className="font-bold">
                  ₹{product.bulkPricing.minQuantityPricePerUnit.toFixed(2)}
                </p>
              </div>
              <div className="text-center">
                <p className="font-medium">Mid Quantity</p>
                <p className="font-mono text-lg">
                  <span className="text-green-600 font-semibold">
                    {product.bulkPricing.mediumQuantity}
                  </span>
                  <span className="text-black font-semibold">-</span>
                  <span className="text-green-600 font-semibold">
                    {product.bulkPricing.maxQuantity - 1}
                  </span>
                  <span className=" font-semibold"> pcs</span>
                </p>
                <p className="font-bold">
                  ₹{product.bulkPricing.midQuantityPricePerUnit.toFixed(2)}
                </p>
              </div>
              <div className="text-center">
                <p className="font-medium">Max Quantity</p>
                <p className="text-green-600 font-extrabold">
                  <span className="text-black font-extrabold">Above </span>
                  {product.bulkPricing.maxQuantity}
                  <span className=" font-semibold text-black"> pcs</span>
                </p>
                <p className="font-bold">
                  ₹{product.bulkPricing.maxQuantityPricePerUnit.toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="">
        <ProductReview selectedProduct={product} />
      </div>
    </div>
  );
};

export default ProductDetails;