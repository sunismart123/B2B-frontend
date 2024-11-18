import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import config from '../../../config';

export const SignupForm = navigate => {
  const initialState = {
    role: '',
    isVerified: false,
    firstName: '',
    lastName: '',
    emailId: '',
    password: '',
    confirmPassword: '',
    companyName: '',
    mob: '',
    state: '',
    street: '',
    city: '',
    pincode: '',
    emailVerified: false,
    verificationCode: '',
    codeSent: false,
  };

  const [formState, setFormState] = useState(initialState);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoadingPincode, setIsLoadingPincode] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSendingCode, setIsSendingCode] = useState(false); // Loading state for Send button
  const [isVerifyingCode, setIsVerifyingCode] = useState(false); // Loading state for Verify button

  const validateForm = () => {
    const newErrors = {};

    if (!formState.emailVerified) {
      newErrors.email = 'Please verify your email first.';
    }

    if (formState.password !== formState.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match.';
    }

    if (formState.mob && !/^\d{10}$/.test(formState.mob)) {
      newErrors.mob = 'Please enter a valid 10-digit mobile number.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = event => {
    const { name, value, type, checked } = event.target;

    setFormState(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleRoleSelect = role => {
    setFormState(prev => ({ ...prev, role }));
  };

  const handleEmailVerification = async () => {
    setIsSendingCode(true);
    try {
      setFormState(prev => ({ ...prev, isVerified: true }));
      const response = await axios.post(
        `${config.apiUrl}/B2B/buyer&seller/requestOtpForRegistration`,
        { email: formState.emailId },
      );
      if (response.status === 200) {
        toast.success('Verification code sent to your email.');
        setFormState(prev => ({ ...prev, codeSent: true, isVerified: false }));
      }
    } catch (error) {
      toast.error('Error sending verification code.');
      setFormState(prev => ({ ...prev, isVerified: false }));
    }
    setIsSendingCode(false);
  };

  const handleVerifyCode = async () => {
    setIsVerifyingCode(true);
    try {
      setFormState(prev => ({ ...prev, isVerified: true }));
      const response = await axios.post(
        `${config.apiUrl}/B2B/buyer&seller/validateOtpForRegistration`,
        {
          email: formState.emailId,
          otp: formState.verificationCode,
        },
      );
      if (response.status === 200) {
        toast.success('Email verified successfully!');
        setFormState(prev => ({
          ...prev,
          emailVerified: true,
          isVerified: false,
        }));
      }
    } catch (error) {
      toast.error('Invalid verification code.');
      setFormState(prev => ({ ...prev, isVerified: false }));
    }
    setIsVerifyingCode(false);
  };

  const handleSubmit = async event => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const response = await axios.post(
        `${config.apiUrl}/B2B/buyer&seller/register`,
        formState,
      );
      if (response.status === 200) {
        toast.success('Registration successful!');
        setTimeout(() => navigate('/sign-in'), 1000);
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        'Registration failed. Please try again.';
      toast.error(errorMessage);
    }
  };

  return {
    formState,
    showPassword,
    showConfirmPassword,
    isLoadingPincode,
    errors,
    isSendingCode,
    isVerifyingCode,
    setShowPassword,
    setShowConfirmPassword,
    setIsLoadingPincode,
    handleInputChange,
    handleEmailVerification,
    handleVerifyCode,
    handleSubmit,
    handleRoleSelect,
  };
};
