import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, Edit2 } from 'lucide-react';
import { ToastContainer } from 'react-toastify';
import { InputField } from './InputField';
import { PincodeInput } from './PincodeInput';
import { SignupForm } from './SignUpForm';
import WaveBackground from './WaveBackground';

const Signup = () => {
  const navigate = useNavigate();
  const [showRoleSelection, setShowRoleSelection] = useState(true);
  const {
    formState,
    showPassword,
    showConfirmPassword,
    isLoadingPincode,
    errors,
    setShowPassword,
    setShowConfirmPassword,
    handleInputChange,
    handleEmailVerification,
    handleVerifyCode,
    handleSubmit,
    handleRoleSelect,
    isSendingCode,
    isVerifyingCode,
  } = SignupForm(navigate);
  const handleEditRole = () => {
    setShowRoleSelection(true);
  };

  return (
    <div className="min-h-screen relative bg-gradient-to-br from-white to-blue-700 flex items-center justify-center mt-16">
      <WaveBackground />
      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl bg-black bg-opacity-50 backdrop-blur-lg rounded-xl shadow-2xl p-6 my-4 relative z-10"
      >
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-4xl font-bold text-center text-zinc-100 p-4 -mt-6 font-sans"
        >
          Create New Account
        </motion.h2>

        <ToastContainer
          position="bottom-right"
          autoClose={2000}
          // className="mt-16 -mr-32 "  // z-50 for high z-index, mt-16 for margin top
        />
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Trade Role Selection */}
          <AnimatePresence>
            {formState.role && !showRoleSelection && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-white bg-opacity-10 p-4 rounded-lg flex items-center justify-between"
              >
                <div className="flex items-center space-x-4">
                  <span className="text-white font-bold">Selected Role:</span>
                  <span className="px-4 py-1 bg-blue-500 text-white rounded-full">
                    {formState.role.charAt(0).toUpperCase() +
                      formState.role.slice(1)}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleEditRole}
                  className="text-blue-300 hover:text-blue-400 flex items-center space-x-2"
                >
                  <Edit2 className="w-4 h-4" />
                  <span>Change Role</span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
          {/* Trade Role Selection */}
          <AnimatePresence>
            {showRoleSelection && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-white bg-opacity-10 p-4 rounded-lg"
              >
                <label className="block text-white font-bold mb-4 text-center">
                  Choose Your Role <span className="text-red-500">*</span>
                </label>
                <div className="flex space-x-8 justify-center">
                  {['buyer', 'seller'].map(role => (
                    <motion.button
                      key={role}
                      type="button"
                      onClick={() => {
                        handleRoleSelect(role);
                        setShowRoleSelection(false);
                      }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`px-8 py-3 rounded-full transition-all duration-300 ${
                        formState.role === role
                          ? 'bg-blue-500 text-white'
                          : 'bg-white bg-opacity-20 text-white hover:bg-opacity-30'
                      }`}
                    >
                      I am a {role.charAt(0).toUpperCase() + role.slice(1)}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <AnimatePresence>
            {formState.role && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-6 overflow-hidden"
              >
                {/* Form Fields */}
                <div className="space-y-3">
                  {/* Personal Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputField
                      label="First Name"
                      type="text"
                      name="firstName"
                      value={formState.firstName}
                      onChange={handleInputChange}
                      required
                    />
                    <InputField
                      label="Last Name"
                      type="text"
                      name="lastName"
                      value={formState.lastName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  {/* Company and Address */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputField
                      label="Organisation Name"
                      type="text"
                      name="companyName"
                      value={formState.companyName}
                      onChange={handleInputChange}
                      required
                    />
                    <PincodeInput
                      value={formState.pincode}
                      onChange={handleInputChange}
                      isLoading={isLoadingPincode}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <InputField
                      label="City / District"
                      type="text"
                      name="city"
                      value={formState.city}
                      onChange={handleInputChange}
                    />
                    <InputField
                      label="Street/Area"
                      type="text"
                      name="street"
                      value={formState.street}
                      onChange={handleInputChange}
                    />
                    <InputField
                      label="State"
                      type="text"
                      name="state"
                      value={formState.state}
                      onChange={handleInputChange}
                    />
                  </div>

                  {/* Contact Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputField
                      label="Mobile"
                      type="text"
                      name="mob"
                      value={formState.mob}
                      onChange={handleInputChange}
                      required
                      maxLength={10}
                      pattern="[0-9]{10}"
                      inputMode="numeric"
                      error={errors.mob}
                    />
                    <div className="space-y-4">
                      <InputField
                        label="Email"
                        type="email"
                        name="emailId"
                        value={formState.emailId}
                        onChange={handleInputChange}
                        required
                        error={errors.email}
                        endAdornment={
                          !formState.codeSent && (
                            <button
                              type="button"
                              onClick={handleEmailVerification}
                              disabled={!formState.emailId || isSendingCode}
                              className={`px-4 py-1 rounded ${
                                !formState.emailId || isSendingCode
                                  ? 'bg-gray-300 cursor-not-allowed hidden'
                                  : 'bg-orange-500 hover:bg-orange-700 text-white'
                              }`}
                            >
                              {isSendingCode ? (
                                <span className="spinner-border animate-spin inline-block w-4 h-4 border-2 rounded-full"></span>
                              ) : (
                                'Send'
                              )}
                            </button>
                          )
                        }
                      />
                      {formState.codeSent && !formState.emailVerified && (
                        <div className="flex space-x-4">
                          <InputField
                            label="Verification Code"
                            type="text"
                            name="verificationCode"
                            value={formState.verificationCode}
                            onChange={handleInputChange}
                            required
                          />
                          <button
                            type="button"
                            onClick={handleVerifyCode}
                            disabled={isVerifyingCode}
                            className="mt-8 bg-orange-600 hover:bg-orange-500 text-white font-bold py-2 px-4 rounded-md"
                          >
                            {isVerifyingCode ? (
                              <span className="spinner-border animate-spin inline-block w-4 h-4 border-2 rounded-full"></span>
                            ) : (
                              'Verify'
                            )}
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Password Fields */}
                  {formState.emailVerified && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <InputField
                        label="Password"
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        value={formState.password}
                        onChange={handleInputChange}
                        required
                        endAdornment={
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="text-gray-500 hover:text-gray-700 focus:outline-none"
                          >
                            {showPassword ? (
                              <EyeOff className="w-5 h-5" />
                            ) : (
                              <Eye className="w-5 h-5" />
                            )}
                          </button>
                        }
                      />
                      <InputField
                        label="Confirm Password"
                        type={showConfirmPassword ? 'text' : 'password'}
                        name="confirmPassword"
                        value={formState.confirmPassword}
                        onChange={handleInputChange}
                        required
                        error={errors.confirmPassword}
                        endAdornment={
                          <button
                            type="button"
                            onClick={() =>
                              setShowConfirmPassword(!showConfirmPassword)
                            }
                            className="text-gray-500 hover:text-gray-700 focus:outline-none"
                          >
                            {showConfirmPassword ? (
                              <EyeOff className="w-5 h-5" />
                            ) : (
                              <Eye className="w-5 h-5" />
                            )}
                          </button>
                        }
                      />
                    </div>
                  )}

                  {/* Terms and Conditions */}
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      name="isVerified"
                      checked={formState.isVerified}
                      onChange={handleInputChange}
                      className="form-checkbox text-blue-500 rounded"
                    />
                    <label className="text-white">
                      I agree to the{' '}
                      <a href="#" className="text-blue-300 hover:underline">
                        terms and conditions
                      </a>
                    </label>
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    disabled={!formState.isVerified || !formState.emailVerified}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full py-3 px-4 text-white font-bold rounded-lg transition-all duration-300 ${
                      formState.isVerified && formState.emailVerified
                        ? 'bg-orange-500 hover:bg-orange-600 shadow-lg hover:shadow-blue-500/50'
                        : 'bg-gray-500 cursor-not-allowed'
                    }`}
                  >
                    Agree and Register
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </form>
      </motion.div>
    </div>
  );
};

export default Signup;
