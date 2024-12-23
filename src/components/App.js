import React, { Suspense, useEffect, useState } from 'react';
import Routes from '../routes';
import LoadingSpinner from './LoadingSpinner/LoadingSpinner';
import { Auth0Provider } from '@auth0/auth0-react';
import '../styles/main.scss';

function App() {
  const [theme, setTheme] = useState('light');

  const domain = process.env.REACT_APP_AUTH0_DOMAIN;
  const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;
  const redirectUri = process.env.REACT_APP_REDIRECT_URI;

  useEffect(() => {
    const localTheme = localStorage.getItem('theme');
    if (localTheme) {
      setTheme(localTheme);
    }
  }, []);

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: redirectUri,
      }}
    >
      <div className="b-app" data-theme={theme}>
        <Suspense fallback={<LoadingSpinner loading />}>
          {/* <AuthProvider> */}
          <Routes />
          {/* </AuthProvider> */}
        </Suspense>
      </div>
    </Auth0Provider>
  );
}

export default App;
