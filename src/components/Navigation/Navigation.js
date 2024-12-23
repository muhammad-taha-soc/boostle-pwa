import React from 'react';
import PropTypes from 'prop-types';
import { Link, NavLink } from 'react-router-dom';
import HamburgerIcon from '../HamburgerIcon/HamburgerIcon';
import logoWhite from '../../assets/images/boostle-logo-black.svg';
// import { Button } from 'react-bootstrap';
import './Navigation.scss';

// const Navigation = ({ scrollToContent, showMobileMenu, menuOpen }) => {
const Navigation = ({ showMobileMenu, menuOpen }) => {
  return (
    <nav className={`navigation al al--ctr al--mid ${menuOpen ? 'fixed' : ''}`}>
      <div className="wr wr--lg al al--ctr al--spc">
        <Link to="/">
          <img src={logoWhite} className="navigation__logo" alt="logo" width="150" />
        </Link>
        <div className="navigation__menu-mobile">
          <HamburgerIcon showMobileMenu={showMobileMenu} menuOpen={menuOpen} />
        </div>
        <div className="navigation__menu al al--ctr al--spc">
          <NavLink to="/about" className="navigation__menu-item">
            About
          </NavLink>
          <NavLink to="/contact" className="navigation__menu-item">
            Contact Us
          </NavLink>
          <Link to="/get-started" className="navigation__menu-item button button--secondary">
            Find me funding!
          </Link>
        </div>
      </div>
    </nav>
  );
};

Navigation.propTypes = {
  // scrollToContent: PropTypes.func.isRequired,
  openModalWindow: PropTypes.func,
  showMobileMenu: PropTypes.func,
  menuOpen: PropTypes.bool,
};

export default Navigation;
