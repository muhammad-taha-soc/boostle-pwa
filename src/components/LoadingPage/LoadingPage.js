/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
// import { useDispatch } from 'react-redux';
import { setBusinessInformation } from '../../redux/actions/setBusinessInformation';
import { setUserInformation } from '../../redux/actions/setUserInformation';
import { useAuth0 } from '@auth0/auth0-react';
import PublicLayout from '../../layouts/publicLayout';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import { verifyAuth, createUser, getSubscriptionStatus } from '../../utilities/apiCalls';
import { setAccessToken } from '../../utilities/sessions';
import logoIcon from '../../assets/images/Ailsa_logo_gif.gif';
import './LoadingPage.scss';

const LoadingPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { getAccessTokenSilently, user, isAuthenticated, logout } = useAuth0();

  const [errorMessage, setErrorMessage] = useState('');
  let isSignup = localStorage.getItem('isSignup');
  isSignup = JSON.parse(isSignup);
  let companyDetails = localStorage.getItem('companyDetails');
  companyDetails = JSON.parse(companyDetails);
  if (isSignup && !companyDetails._id) {
    companyDetails = useSelector((state) => state.companyDetails.details);
  }

  useEffect(() => {
    if (isAuthenticated) {
      handleGetAccessToken();
    }
  }, [isAuthenticated]); // Depend on isAuthenticated and getAccessTokenSilentl

  const handleGetAccessToken = async () => {
   
    let accessToken = '';
    try {
      accessToken = await getAccessTokenSilently({ detailedResponse: true });
      accessToken = accessToken.id_token;
      setAccessToken(accessToken);
      console.log('accessToken', accessToken);
      console.timeEnd('GetAccessTokenSilently');
      // console.log('user', user);
      // make call verfyAccess
      if (!user.given_name && !user.family_name) {
        user.given_name = 'PlaceholderName';
        user.family_name = 'PlaceholderSurname';
        // setErrorMessage('need to collect first and last name');
      }
      if (isSignup) {
        createBoostleUser();
      } else {
        verifyUser();
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const verifyUser = async () => {
    const userInfo = {
      email: user.email,
    };
    console.time('verifyUser');
    try {
      const verifyAccess = await verifyAuth(userInfo);
      if (verifyAccess && verifyAccess.status === 'success' && verifyAccess.code === 200) {
        const userAuthInfo = {
          user,
          ...verifyAccess.result,
        };
        console.log('userAuthInfo', userAuthInfo);
        console.log('firstime', userAuthInfo.first_use);
       // setFirstime(userAuthInfo.first_use);
        dispatch(setUserInformation(userAuthInfo));
        dispatch(setBusinessInformation(verifyAccess.result.active_business));
        checkSubscriptionStatus(userAuthInfo.first_use);
        // navigate('/home')
      } else {
        if (verifyAccess.status === 500) {
          if (_.isEmpty(user)) {
            setErrorMessage(
              
              `Oops! Looks like you don't have an account with us yet. Please click below to get started with Boostle.`,
            );
          } else {
            logout({ logoutParams: { returnTo: `${window.location.origin}` } });
          }
        } else {
          throw new Error(verifyAccess.result);
        }
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
    console.timeEnd('verifyUser');
  };
  const checkSubscriptionStatus = async (firstime) => {
    try {
      const subscriptionResponse = await getSubscriptionStatus();

      // Check if response was successful
      if (subscriptionResponse && subscriptionResponse.status === 'success') {
        const subscriptions = subscriptionResponse.result; 

        // Assuming result is an array

        // Check if there are subscriptions and if one is active
        if (subscriptions.length > 0) {
         
          if(firstime){
            navigate('/profilebuilder'); // Navigate to home if there is an active subscription
          }else{
            navigate('/home'); // Navigate to home if there is an active subscription
          }
        } else {
          navigate('/payment'); // No active subscription, navigate to payment
        }
      } else {
        setErrorMessage('Failed to verify subscription.');
        navigate('/payment'); // Fallback to payment page
      }
    } catch (error) {
      setErrorMessage('Error occurred while checking subscription status.');
      navigate('/payment'); // Fallback to payment page in case of error
    }
  };
  const createBoostleUser = async () => {
    const userInfo = {
      email: user.email,
      business_id: companyDetails._id,
      first_name: user.given_name || 'Boostie',
      last_name: user.family_name || 'McBoostle',
    };
    try {
      const createUserResponse = await createUser(userInfo);
      console.log('createBoostleUser call response', createUserResponse);
      if (createUserResponse && createUserResponse.status === 'success' && createUserResponse.code === 200) {
        localStorage.setItem('isSignup', false);
        // navigate('/payment');
        verifyUser();
      } else {
        throw new Error(createUserResponse.result);
      }
    } catch (error) {
      setErrorMessage(error.message);
      logout({ logoutParams: { returnTo: `${window.location.origin}` } });
    }
  };

  return (
    <PublicLayout title="Redirecting" className="redirect-page al al--col al--ctr al--mid" isPublic={true}>
      {errorMessage ? (
        <div className="redirect-page__error">
          <p className="bold">{errorMessage}</p>
        </div>
      ) : (
        <>
          <div className="redirect-page__loading-visual">
            <img className="redirect-page__logo" src={logoIcon} alt="logo" width="32" />
            <LoadingSpinner loading size="xxxl" />
          </div>
        </>
      )}
    </PublicLayout>
  );
};

LoadingPage.propTypes = {
  loading: PropTypes.bool,
  size: PropTypes.string,
};

export default LoadingPage;
