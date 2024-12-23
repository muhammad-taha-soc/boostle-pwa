import React from 'react';
import MaterialButton from '../Button/MaterialButton';
import { useAuth0 } from '@auth0/auth0-react';

import './welcomeaboard.scss'
function WelcomeAboard() {
const { loginWithRedirect } = useAuth0();
  const login = () => 
  {
    loginWithRedirect({
      appState: {
        returnTo: '/callback',
      },
    });
  }

  return (
    <div className="welcome-container">
      <div className="welcome-box">
        <h1>Welcome Aboard</h1>
        <h5>You can go to your dashboard and start discovering the right grants for you!</h5>
        <MaterialButton onClick={login} variant="contained" size="medium">
        Go to granthub
      </MaterialButton>
      </div>
    </div>
  );
}

export default WelcomeAboard;
