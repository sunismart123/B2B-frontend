import React from 'react';
import { motion } from 'framer-motion';

export const InputField = ({
  label,
  type,
  name,
  value,
  onChange,
  required,
  className,
  readOnly,
  maxLength,
  pattern,
  endAdornment,
  error,
  onFocus,
  inputMode
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="w-full"
  >
    <label className="block text-white font-bold mb-2">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <div className="relative">
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        readOnly={readOnly}
        maxLength={maxLength}
        pattern={pattern}
        onFocus={onFocus}
        inputMode={inputMode}
        className={`w-full p-2 border ${error ? 'border-red-500' : 'border-gray-300'} 
          rounded-md focus:outline-none focus:border-blue-500 focus:ring-2 
          focus:ring-blue-200 transition-all duration-300 ${className}`}
      />
      {endAdornment && (
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
          {endAdornment}
        </div>
      )}
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  </motion.div>
);
