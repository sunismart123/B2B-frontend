// components/PincodeInput.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { debounce } from 'lodash';
import { InputField } from './InputField';


export const PincodeInput = ({ value, onChange, isLoading }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const fetchPincodeData = debounce(async (pincode) => {
    if (pincode.length !== 6) {
      setSuggestions([]);
      return;
    }

    try {
      const response = await axios.get(`https://api.postalpincode.in/pincode/${pincode}`);
      if (response.data[0].Status === 'Success') {
        setSuggestions(response.data[0].PostOffice);
      } else {
        setSuggestions([]);
      }
    } catch (error) {
      setSuggestions([]);
    }
  }, 500);

  const handlePincodeChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 6);
    onChange({ target: { name: 'pincode', value } });
    if (value.length > 2) {
      fetchPincodeData(value);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (postOffice) => {
    onChange({ target: { name: 'pincode', value } });
    onChange({ target: { name: 'city', value: postOffice.District } });
    onChange({ target: { name: 'state', value: postOffice.State  } });
    onChange({ target: { name: 'street', value: postOffice.Name } });
    setSuggestions([]);
    setShowSuggestions(false);
  };

  return (
    <div className="relative">
      <InputField
        label="Pincode"
        type="text"
        name="pincode"
        value={value}
        onChange={handlePincodeChange}
        maxLength={6}
        pattern="[0-9]{6}"
        inputMode="numeric"
        onFocus={() => setShowSuggestions(true)}
        required
      />
      {isLoading && (
        <div className="absolute right-3 top-1/2 -translate-y-1/2">
          <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
        </div>
      )}
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto">
          {suggestions.map((postOffice, index) => (
            <div
              key={index}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-800"
              onClick={() => handleSuggestionClick(postOffice)}
            >
              <div className="text-sm font-medium">
                {postOffice.Name}, {postOffice.District}
              </div>
              <div className="text-xs text-gray-500">{postOffice.State}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};



