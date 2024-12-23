import React from 'react';
import PropTypes from 'prop-types';
import './LoadingSpinner.scss';

const LoadingSpinner = ({ loading, size }) => {
  if (loading) {
    return (
      <div className="loading-spinner al al--ctr al--mid">
        <div className={`loading-spinner__border ${size ? `loading-spinner__border-${size}` : ''}`} />
      </div>
    );
  }
  return null;
};

LoadingSpinner.propTypes = {
  loading: PropTypes.bool,
  size: PropTypes.string,
};

export default LoadingSpinner;
