import React from 'react';
import PropTypes from 'prop-types';
import { withAuthenticationRequired } from '@auth0/auth0-react';
import LoadingPage from '../LoadingPage/LoadingPage';

export const AuthenticationGuard = ({ component }) => {
  const Component = withAuthenticationRequired(component, {
    onRedirecting: () => (
      <div className="page-layout">
        <LoadingPage />
      </div>
    ),
  });

  return <Component />;
};

AuthenticationGuard.propTypes = {
  component: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node, PropTypes.element]),
};
