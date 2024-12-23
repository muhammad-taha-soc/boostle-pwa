import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import LoadingPage from '../components/LoadingPage/LoadingPage';

const withPublicRoute = (WrappedComponent) => {
  const WithPublic = (props) => {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth0();

    useEffect(() => {
      if (isAuthenticated) {
        navigate('/home');
        // logout({ logoutParams: { returnTo: `${window.location.origin}` } });
      }
    }, [isAuthenticated]);

    if (isAuthenticated) {
      // Optionally, show a loading indicator or a message while logging out
      return <LoadingPage />;
    }

    return <WrappedComponent {...props} />;
  };

  WithPublic.propTypes = {
    children: PropTypes.node,
  };

  WithPublic.displayName = 'WithPublicRoute';

  return WithPublic;
};

export default withPublicRoute;
