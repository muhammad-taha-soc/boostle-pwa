import React from 'react';
import PropTypes from 'prop-types';
import './HamburgerIcon.scss';

const HamburgerIcon = ({ showMobileMenu, addClass, menuOpen }) => {
  return (
    <button className={`HamburgerIcon ${addClass ? addClass : ''}`} onClick={() => showMobileMenu(!menuOpen)}>
      <svg className={`HamburgerIcon__ham rotate ${menuOpen ? 'active' : ''}`} viewBox="0 0 100 100">
        <path
          className="line top"
          d="m 70,33 h -40 c 0,0 -8.5,-0.149796 -8.5,8.5 0,8.649796 8.5,8.5 8.5,8.5 h 20 v -20"
        />
        <path className="line middle" d="m 70,50 h -40" />
        <path
          className="line bottom"
          d="m 30,67 h 40 c 0,0 8.5,0.149796 8.5,-8.5 0,-8.649796 -8.5,-8.5 -8.5,-8.5 h -20 v 20"
        />
      </svg>
    </button>
  );
};

HamburgerIcon.propTypes = {
  addClass: PropTypes.string,
  showMobileMenu: PropTypes.func,
  menuOpen: PropTypes.bool,
};

export default HamburgerIcon;
