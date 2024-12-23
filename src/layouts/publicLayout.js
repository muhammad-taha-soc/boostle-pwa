// eslint-disable-next-line no-unused-vars
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
// eslint-disable-next-line no-unused-vars
import { Link } from 'react-router-dom';
import logo from '../assets/images/Ailsa_logo_gif.gif';

const PublicLayout = ({ children, className, withHeader, backgroundColor }) => {

  return (
    <div className={`b-app-public ${withHeader ? 'with-header' : ''} al al--col`} style={{ backgroundColor }}>
      {withHeader ? (
        <>
          <header className="b-app-public__header">
            <div className="wr wr--lg al al--ctr al--mid">
              {/* <Link to="/"> */}
                <img src={logo} className="logo" alt="logo"  />
              {/* </Link> */}
              {/* <Button variant={'secondary'}>Login</Button> */}
            </div>
          </header>
          <main className={`${className ? className : ''} content al`} id="content">
            {children}
          </main>
        </>
      ) : (
        <main className={`${className ? className : ''} content`} id="content">
          {children}
        </main>
      )}
    </div>
  );
};

PublicLayout.propTypes = {
  children: PropTypes.any,
  withHeader: PropTypes.bool,
  className: PropTypes.string,
  backgroundColor: PropTypes.string,
};

export default PublicLayout;
