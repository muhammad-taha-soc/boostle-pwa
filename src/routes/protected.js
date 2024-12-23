/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';
import ErrorBoundary from '../components/ErrorBoundary/ErrorBoundary';
// import AppHeader from '../components/AppHeader/AppHeader';
import LoadingPage from '../components/LoadingPage/LoadingPage';
import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner';
import SideBar from '../components/SideBar/SideBar';
const Protected = () => {
  const { isLoading, isAuthenticated } = useAuth0();
  // const [helpSectionOpen, setHelpSectionStatus] = useState(false);

  // const toggleHelpSection = () => {
  //   setHelpSectionStatus(!helpSectionOpen);
  // };

  if (isLoading) {
    return <LoadingSpinner />; // Or any other loading indicator
  }

  return isAuthenticated ? (
    <div className="b-app-shell">
      <ErrorBoundary>
        {/* <AppHeader toggleHelpSection={toggleHelpSection} helpSectionOpen={helpSectionOpen} />  */}
        <SideBar />
      </ErrorBoundary>
      <ErrorBoundary>
        <Outlet />
      </ErrorBoundary>
    </div>
  ) : (
    <Navigate to="/" />
  );
};

export default withAuthenticationRequired(Protected, {
  // Show a message while the user waits to be redirected to the login page.
  onRedirecting: () => <LoadingPage />,
});
