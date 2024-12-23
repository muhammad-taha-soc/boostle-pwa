/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link, NavLink } from 'react-router-dom';
import { HouseFill, Pencil, Lock, GearFill, FolderFill, Bank, BagFill } from 'react-bootstrap-icons';
// import { HouseFill, ViewList, GearFill } from 'react-bootstrap-icons';
import { useSelector } from 'react-redux';
import Footer from '../components/Footer/Footer';
import Grid from '@mui/material/Grid';
import _ from 'lodash';
// import Button from '../components/Button/Button';
import '../styles/sidebar.scss';
import AppHeader from '../components/AppHeader/AppHeader';
import FloatingHelpButton from '../components/Button/FloatingHelpButton';

const AppLayout = ({ classname, children, isPublic }) => {
  const [helpSectionOpen, setHelpSectionStatus] = useState(false);

  const toggleHelpSection = () => {
    setHelpSectionStatus(!helpSectionOpen);
  };

  const businessInfo = useSelector((state) => state.business.businessInfo);
  const businessName = !_.isEmpty(businessInfo) && businessInfo ? businessInfo.name : '';
  return (
    <div className={`b-app-section ${classname ? classname : ''} al al--col`}>
      <AppHeader toggleHelpSection={toggleHelpSection} helpSectionOpen={helpSectionOpen} />
      {isPublic ? (
        <>
          {/* <header className="app-header">
            <div className="wr wr--lg al al--ctr al--mid">
              <Link to="/">
                <img src={logo} className="app-header__logo" alt="logo" width="120" />
              </Link> */}
              {/* <Button variant={'secondary'}>Login</Button> */}
            {/* </div>
          </header>
          <main className={`${classname ? classname : ''}__content`} id="content">
            {children}
          </main> */}
        </>
      ) : (
        <div className={`b-app-section__content al`}>
          <main className={`${classname ? classname : ''}__content`} id="content">
            <Grid container spacing={2} sx={{ margin: '0 auto', paddingTop: 2, width: '100%' }}>
              {/* Main content area */}

              {children}

              {/* Footer */}
              <Grid item xs={12} md={11} sx={{ margin: '32px auto' }}>
                <Footer />
              </Grid>
            </Grid>
          </main>
          <FloatingHelpButton />
        </div>
      )}
    </div>
  );
};

AppLayout.propTypes = {
  children: PropTypes.any,
  classname: PropTypes.string,
  isPublic: PropTypes.bool,
};

export default AppLayout;
