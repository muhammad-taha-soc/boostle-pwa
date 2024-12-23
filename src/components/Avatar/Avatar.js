import React from 'react';
import PropTypes from 'prop-types';
import './Avatar.scss';

const Avatar = ({ initials, size }) => {
  const avatarSize = size ? `avatar--${size}` : '';
  return <div className={`avatar al al--mid al--ctr ${avatarSize}`}>{initials}</div>;
};

Avatar.propTypes = {
  initials: PropTypes.string,
  size: PropTypes.string,
};

export default Avatar;
