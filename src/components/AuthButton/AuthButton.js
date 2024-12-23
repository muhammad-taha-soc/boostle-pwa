import React from 'react';
import PropTypes from 'prop-types';
import { useAuth0 } from '@auth0/auth0-react';
import { useDispatch } from 'react-redux';
import Button from '../Button/Button';
import './AuthButton.scss';
import { getBusinessInformation } from '../../utilities/apiCalls';
import { setBusinessInformation } from '../../redux/actions/setBusinessInformation';

const AuthButton = ({ isSignup, companyDetails }) => {
  const dispatch = useDispatch();
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  const handleSignup = async () => {
    const payload = {
      companyId: companyDetails.company_number,
    };
    const details = await getBusinessInformation(payload);
    if (details.code === 200 && details.result) {
      dispatch(setBusinessInformation(details.result));
      localStorage.setItem('companyDetails', JSON.stringify(details.result));
    } else if (details.error) {
      throw new Error(details.error);
    }
    localStorage.setItem('isSignup', true);

    loginWithRedirect({
      appState: {
        returnTo: '/callback',
      },
      authorizationParams: { screen_hint: 'signup' },
    });
  };

  const handleLogin = () => {
    localStorage.setItem('isSignup', false);
    loginWithRedirect({
      appState: {
        returnTo: '/callback',
      },
    });
  };

  if (!isAuthenticated) {
    return isSignup ? (
      <Button
        className="login-form__button"
        // text="Create my Boostle account"
        text="Join us!"
        variant="primary"
        size="sm"
        onClick={() => handleSignup()}
      />
    ) : (
      <Button
        className="login-form__button"
        text="Login to your grant hub"
        variant="primary"
        size="lg"
        onClick={() => handleLogin()}
      />
    );
  }

  return null;
};

AuthButton.propTypes = {
  isSignup: PropTypes.bool,
  companyDetails: PropTypes.instanceOf(Object),
};

export default AuthButton;
