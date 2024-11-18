
import React from 'react';
import { useNavigate } from 'react-router-dom';
import config from '../../config';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import { ShoppingBag, ArrowRight, Star, Loader2, AlertCircle } from 'lucide-react';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    // navigate(`/product/${product.id}`, { state: { product } });
  
navigate(`/product/${product.id}`, { state: { product } });

  };

  return (
    <div
      className="bg-white rounded-lg shadow-md overflow-hidden transform transition-transform duration-300 hover:scale-105 cursor-pointer"
      onClick={handleClick}
    >
      <div className="relative">
        <img
          src={`${config.apiUrl}/B2B/products/${product.image1}`}
          alt={product.name}
          className="w-full h-48 object-cover"
        />
      </div>
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
        <p className="text-lg font-bold text-green-600 mb-1">₹{product.price.toFixed(2)}</p>
      </div>
      
    </div>
  );
};

export default ProductCard;

// const ProductCard = ({ product, index }) => {
//   const [ref, inView] = useInView({
//     triggerOnce: true,
//     threshold: 0.1
//   });

//   return (
//     <motion.div
//       ref={ref}
//       initial={{ opacity: 0, y: 20 }}
//       animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
//       transition={{ delay: index * 0.1, duration: 0.5 }}
//       whileHover={{ y: -10 }}
//       className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
//     >
//       <div className="relative overflow-hidden aspect-w-1 aspect-h-1">
//         <motion.img
//           src={`${config.apiUrl}/B2B/products/${product.image1}`}
//           alt={product.name}
//           className="w-full h-64 object-cover"
//           whileHover={{ scale: 1.1 }}
//           transition={{ duration: 0.6 }}
//         />
//         <motion.div 
//           initial={{ opacity: 0 }}
//           whileHover={{ opacity: 1 }}
//           className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"
//         />
//       </div>
      
//       <div className="p-6">
//         <h2 className="text-xl font-semibold mb-2 text-gray-800 line-clamp-1">
//           {product.name}
//         </h2>
        
//         <div className="flex items-center mb-3">
//           {[...Array(5)].map((_, i) => (
//             <motion.div
//               key={i}
//               initial={{ opacity: 0, scale: 0 }}
//               animate={{ opacity: 1, scale: 1 }}
//               transition={{ delay: i * 0.1 }}
//             >
             
//             </motion.div>
//           ))}
//         </div>

//         <div className="flex items-center justify-between">
//           <motion.p 
//             initial={{ opacity: 0, x: -20 }}
//             animate={{ opacity: 1, x: 0 }}
//             className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent"
//           >
//             ₹{product.price.toFixed(2)}
//           </motion.p>
         
//         </div>
//       </div>
//     </motion.div>
//   );
// };
// export default ProductCard;