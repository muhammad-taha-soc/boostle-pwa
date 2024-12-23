import React from 'react';
import PropTypes from 'prop-types';
// import { Button as BootstrapButton } from 'react-bootstrap';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import './Button.scss';

const Button = ({ id, disabled, text, children, onClick, variant, size, width, addClass, borderSquare, loading }) => {
  return loading ? (
    <button
      id={id}
      // variant={variant}
      // bsPrefix="button"
      className={`button button--loading ${addClass ? addClass : ''} ${variant ? `button--${variant}` : ''} ${
        borderSquare ? `button--square-border` : ''
      } ${size ? `button--${size}` : ''} ${width ? `button--${width}` : ''}`}
      disabled={disabled}
      onClick={onClick}
    >
      <LoadingSpinner loading size={size} />
    </button>
  ) : (
    <button
      id={id}
      // variant={variant}
      // bsPrefix="button"
      className={`button ${addClass ? addClass : ''} ${variant ? `button--${variant}` : ''} ${
        size ? `button--${size}` : ''
      } ${width ? `button--${width}` : ''}`}
      disabled={disabled}
      onClick={onClick}
    >
      {children ? children : text}
    </button>
  );
};

Button.propTypes = {
  id: PropTypes.string,
  text: PropTypes.string,
  disabled: PropTypes.bool,
  borderSquare: PropTypes.bool,
  loading: PropTypes.bool,
  children: PropTypes.any,
  onClick: PropTypes.func,
  variant: PropTypes.string,
  size: PropTypes.string,
  width: PropTypes.string,
  addClass: PropTypes.string,
};

export default Button;
