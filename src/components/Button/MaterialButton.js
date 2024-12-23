import React from 'react';
import PropTypes from 'prop-types';
import './materialbutton.scss'; // Import styles

const MaterialButton = ({ onClick, disabled, variant, size, className, children, startIcon, sx }) => {
  return (
    <button className={`material-button ${variant} ${size} ${className}`} onClick={onClick} disabled={disabled} style={sx}>
       {startIcon && <span className="start-icon">{startIcon}</span>}
      {children}
    </button>
  );
};

MaterialButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  startIcon: PropTypes.node,
  variant: PropTypes.oneOf(['contained', 'outlined', 'text']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  sx: PropTypes.object,
};

MaterialButton.defaultProps = {
  disabled: false,
  variant: 'contained',
    size: 'medium',
};

export default MaterialButton;
