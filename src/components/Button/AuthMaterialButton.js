import React from 'react';
import PropTypes from 'prop-types';
import { useAuth0 } from '@auth0/auth0-react';
import { useDispatch } from 'react-redux';
import Button from '@mui/material/Button'; // Using Material UI Button
import { getBusinessInformation } from '../../utilities/apiCalls'; // Adjust the path as per your project structure
import { setBusinessInformation } from '../../redux/actions/setBusinessInformation'; // Adjust the path as per your project structure
// Import the custom SCSS file

const MaterialButton = ({ isSignup, companyDetails, disabled, onSearch }) => {
  const dispatch = useDispatch();
  const { loginWithRedirect } = useAuth0();

  const handleSignup = async () => {
    const payload = {
      companyId: companyDetails.company_number,
    };
    const details = await getBusinessInformation(payload);
    console.log('handleSignup details', details);
    console.log('handleSignup payload', payload);
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
  const handleButtonClick = () => {
    if (isSignup) {
      handleSignup(); // Continue to signup
    } else {
      onSearch(); // Trigger search if no company is selected
    }
  };

  // Render the button only if the user is not authenticated

  return (
    <Button
      className={`material-button material-button--primary ${disabled ? 'Mui-disabled' : ''}`} // Apply custom class names for styling
      variant="contained"
      size="large"
      disabled={disabled} // Disable the button based on the prop
      onClick={handleButtonClick}
    >
      {isSignup ? 'Continue' : 'Search'} {/* Show "Continue" if company selected, else "Search" */}
    </Button>
  );
};

MaterialButton.propTypes = {
  companyDetails: PropTypes.object.isRequired, // Ensure that company details are required
  disabled: PropTypes.bool, // Button can be enabled/disabled
  label: PropTypes.string.isRequired,
  isSignup: PropTypes.bool.isRequired,
  onSearch: PropTypes.func.isRequired, // Label for the button
};

export default MaterialButton;
