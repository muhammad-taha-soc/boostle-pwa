import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress'; // Import CircularProgress

const PaymentSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Optionally, you can add logic here to verify the payment with your backend

    // Redirect to home page after 3 seconds
    const timer = setTimeout(() => {
      navigate('/welcomeaboard');
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  // Styling for the container
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f4f4f9',
    color: '#333',
    textAlign: 'center',
    fontFamily: '"Arial", sans-serif'
  };

  // Styling for the header
  const headerStyle = {
    color: '#4CAF50',
    fontSize: '2rem'
  };

  // Styling for the paragraph
  const paragraphStyle = {
    fontSize: '1.2rem',
    color: '#555',
    marginBottom: '20px' // Added margin for spacing
  };

  return (
    <div style={containerStyle}>
      <h1 style={headerStyle}>Payment Successful!</h1>
      <p style={paragraphStyle}>Thank you for your purchase. You will be redirected shortly.</p>
      <CircularProgress /> {/* Circular progress indicator */}
    </div>
  );
};

export default PaymentSuccess;