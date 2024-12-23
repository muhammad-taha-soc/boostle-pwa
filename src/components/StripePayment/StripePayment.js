/* eslint-disable no-unused-vars */

import React, { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import PublicLayout from '../../layouts/publicLayout';
import { styled } from '@mui/material/styles';

// Styled components for better separation of concerns

const LogoutButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
}));

function StripePayment() {
  const { isAuthenticated, logout } = useAuth0();
  const userInfo = useSelector((state) => state.user.userInfo);
  const logoutUser = () => {
    localStorage.clear();
    logout({ logoutParams: { returnTo: `${window.location.origin}` } });
  };

  return (
    <PublicLayout title="Get Started" withHeader={true} >
      <Box m={2}>
        {isAuthenticated && (
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', m: 0 }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                width: '80%',
                p: 4,
                transform: 'rotate(1deg)', // Tilt the box slightly to the right
               // Light blue background color
            
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', //
              }}
            >
              <Typography
                variant="body1"
                gutterBottom
               
                sx={{  fontFamily:'poppins',fontWeight:'700'  }}
              >
                Know what your business is worth
              </Typography>

              <Typography
                variant="h4"
                gutterBottom
             
                sx={{ fontFamily:'poppins',fontWeight:'500' }}
              >
                Choose the Right Plan for Your Business Growth
              </Typography>
              <Typography
                variant="h5"
                gutterBottom
              
                sx={{ fontFamily:'poppins',fontWeight:'500', mt: 2 }}
              >
                At{' '}
                <span
                  style={{
                    textDecoration: 'underline',
                    textDecorationColor: '#8f87df',
                    textUnderlineOffset: '2px',
                    fontWeight: 'bold',
                    textDecorationThickness: '4px',
                    //  boxShadow: '0 4px 0 #8f87df'
                  }}
                >
                  Ailsa
                </span>{' '}
                we’re committed to helping businesses like yours secure the funding you deserve. With personalized grant
                matching and expert support in application preparation, we maximize your chances of approval.
              </Typography>
            </Box>

            {/* <Box
              sx={{
                width: '100%',
                backgroundColor: '#fff',
                mt: 4,
              }}
            >
              <stripe-pricing-table
                pricing-table-id="prctbl_1PuwGKCKDVYYRcHfNbtmMLaT"
                publishable-key="pk_test_51OrMfiCKDVYYRcHfmgkLkNKvjJab0KT3s732qyHK5bzhvazLvpqJ0zeh5qk2PO3nR1A9Sx9IjKv179xF6qVHNwJl00Qx4A4DOs"
                client-reference-id={`${userInfo._id}_${userInfo.active_business._id}`}
                appearance="{ 
                theme: 'stripe', 
                variables: { 
                  colorPrimary: '#005f73', 
                  colorText: '#333333', 
                  colorBackground: '#ffffff',
                  borderRadius: '10px',
                  spacingUnit: '10px',
                  fontFamily: 'Arial, sans-serif'
                } 
              }"
                success-url="http://localhost:3000/success"
                cancel-url="http://localhost:3000/cancel"
              ></stripe-pricing-table>
            </Box> */}
            <Typography variant="h5" sx={{ color: '#8f87df',fontFamily:'poppins',fontWeight:'500' ,mt:4 }}>
              Choose Your Plan
            </Typography>

            {/* Center Stripe Element - Placeholder */}
            <Box
              sx={{
                width: '80%',
                textAlign: 'center',
                alignSelf: 'center',
               mt:2,
                borderRadius: '20px',
              }}
            >
              <stripe-pricing-table
                pricing-table-id={process.env.REACT_APP_STRIPE_PRICING_TABLE_ID}
                publishable-key={process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY}
                client-reference-id={`${userInfo._id}_${userInfo.active_business._id}`}
                appearance="{ 
                theme: 'stripe', 
                variables: { 
                  colorPrimary: '#005f73', 
                  colorText: '#333333', 
                  colorBackground: '#ffffff',
                  borderRadius: '10px',
                  spacingUnit: '10px',
                  fontFamily: 'Arial, sans-serif'
                } 
              }"
                success-url={process.env.REACT_APP_STRIPE_SUCCESS_URL}
                cancel-url={process.env.REACT_APP_STRIPE_CANCEL_URL}
              ></stripe-pricing-table>
            </Box>

            <LogoutButton variant="contained" color="primary" onClick={logoutUser} sx={{ mt: 2 }}>
              Logout
            </LogoutButton>
          </Box>
        )}
      </Box>
    </PublicLayout>
  );
}

export default StripePayment;
