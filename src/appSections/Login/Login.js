/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { TabContent, TabPane } from 'reactstrap';
// import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import PublicLayout from '../../layouts/publicLayout';
import withPublicRoute from '../../routes/public';
import { Grid, Box, Typography, Button } from '@mui/material';
import Seo from '../../components/Seo/Seo';
import LoginForm from '../../components/_Forms/LoginForm/LoginForm';
// import Button from '../../components/Button/Button';
import AuthButton from '../../components/AuthButton/AuthButton';
import './Login.scss';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import logo from '../../assets/images/Ailsa_logo_gif.gif';

import getiingstartedimg from '../../assets/images/gettingstarted-2.png';
function Login() {
  const { loginWithRedirect } = useAuth0();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth0();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [activeTab, setActiveTab] = useState('1');
  const [submitting, setSubmitting] = useState(false);
  const [loginFormErrors, setLoginFormErrors] = useState({
    email: false,
    password: false,
    wrongCredentials: false,
  });

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/home');
    }
  }, []);

  const seo = {
    title: 'Login to Boostle',
    description: 'Empowering people to start, run and grow their business',
    keywords: ['Entrepreneur', 'Business', 'Business tool', 'New business'],
  };

  const onLoginInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'email-input') {
      setEmail(value);
    }
    if (name === 'password-input') {
      setPassword(value);
    }
  };

  const handleKeyPressEmail = (e) => {
    if (e.key === 'Enter') {
      document.getElementById('password-input').focus();
    }
  };

  const handleKeyPressPassword = (e) => {
    if (e.key === 'Enter') {
      submitLoginForm();
    }
  };

  // const onSSOSubmit = () => {
  //   setSubmitting(true);
  // };
  const handleLogin = () => {
    localStorage.setItem('isSignup', false);
    loginWithRedirect({
      appState: {
        returnTo: '/callback',
      },
    });
  };

  const submitLoginForm = () => {
    setSubmitting(true);
    handleLoginFormErrors();
    authenticate();
  };

  const authenticate = () => {
    setTimeout(() => {
      setSubmitting(false);
      navigate('/home');
    }, 1500);
  };

  const handleLoginFormErrors = () => {
    setLoginFormErrors();
  };

  const pushToSignup = () => {
    navigate('/get-started');
    // navigate('/signup');
  };

  return (
    <>
      <Seo seo={seo} />
      <PublicLayout title="Login" isPublic={true}>
        {/* <div className="login-page__content-left al al--mid al--ctr" />
        <div className="login-page__content-right al al--mid al--ctr">
          <div className="login-page__login-form wr wr--xs">
            <Link to="/" className="login-page__logo">
              <img src={logo} alt="logo" width="180" />
            </Link> */}
        {/* <h3 className="login-form__title">Welcome back!</h3> */}
        {/* <Nav tabs cssModule={{ 'nav-tabs': 'tabs' }}>
              <NavItem
                className={`${activeTab === '1' ? 'active' : ''}`}
                cssModule={{ 'nav-item': 'tabs__button' }}
                onClick={() => {
                  setActiveTab('1');
                }}
              >
                <NavLink className={`${activeTab === '1' ? 'active' : ''}`} cssModule={{ 'nav-link': 'tabs__link' }}>
                  Login with SSO
                </NavLink>
              </NavItem>
              <NavItem
                className={`${activeTab === '2' ? 'active' : ''}`}
                cssModule={{ 'nav-item': 'tabs__button' }}
                onClick={() => {
                  setActiveTab('2');
                }}
              >
                <NavLink className={`${activeTab === '2' ? 'active' : ''}`} cssModule={{ 'nav-link': 'tabs__link' }}>
                  Login with email
                </NavLink>
              </NavItem>
            </Nav> */}
        {/* <TabContent activeTab={activeTab}>
              <TabPane tabId="1">
                <div className="login-form__sso al al--ctr al--mid"> 
                  <AuthButton isSignup={false} />  */}
        {/* <Button
                    text="Login with Facebook"
                    variant="outline"
                    size="lg"
                    width="wide"
                    addClass="login-form__button"
                    onClick={() => onSSOSubmit()}
                    loading={submitting}
                  /> */}
        {/* </div>
              </TabPane>
              <TabPane tabId="2"> */}
        {/* <LoginForm
                  onSubmit={submitLoginForm}
                  // forgotPass={forgotPass}
                  onChange={(e) => onLoginInputChange(e)}
                  handleKeyPressEmail={handleKeyPressEmail}
                  handleKeyPressPassword={handleKeyPressPassword}
                  submitting={submitting}
                  password={password}
                  email={email}
                  errors={loginFormErrors}
                />
              </TabPane>
            </TabContent>
          </div>
          <div className="login-page__signup">
            <p className="no-margin">
              Don’t have an account with us?{' '}
              <button className="login-page__signup-link button button--ghost" onClick={pushToSignup}>
                Sign up here
              </button>
            </p>
          </div>
        </div> */}
        {/* <div className="login-page">
          <div className="login-card">
            <div className="login-page__content-left">
              <img src={logo} alt='logo' width={120}/>
              <h1>Let’s get started</h1>
              <div className="cta-box">
                <div className="cta-item cta-item--large" onClick={() => handleLogin()}>
                  <div className="cta-text">
                    <p>My company is using Ailsa</p>
                    <span>Sign in to your company</span>
                  </div>
                  <span className="cta-link">→</span>
                </div>
                <div className="cta-item" onClick={pushToSignup}>
                  <div className="cta-text">
                    <p>My company isn’t using Ailsa yet</p>
                    <span>Find and sign up to your company</span>
                  </div>
                  <span className="cta-link">→</span>
                </div>
              </div>
            </div>
            <div className="login-page__content-right">
              <img src={getiingstartedimg} alt="Ailsa" className="right-image" />
            </div>
          </div>
        </div> */}
        <Grid container>
          <Grid item xs={12} sm={12} md={10} margin=" auto" padding="32px">
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                position: 'relative',
                height: '90vh',
                margin: '32px',
                borderRadius: '16px',
                background: '#f9f9f9',
              }}
            >
              <img src={logo} alt="logo" width={120} style={{ position: 'absolute', top: '32px', left: '32px' }} />
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: '24px',
                  padding: '32px',
                  borderRadius: '16px',
                  background: '#f9f9f9',
                  flex: 1,
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: '16px',
                    border: '0.6px solid #ddd',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '32px',
                    width: '100%',
                    padding: '16px',
                    cursor: 'pointer',
                    transition: 'all 0.3s',
                    '&:hover': { transform: 'translateY(-2px)', boxShadow: '0 2px 4px rgba(0,0,0,0.2)' },
                  }}
                  onClick={() => handleLogin()}
                >
                  <Typography
                    variant="h4"
                    component="div"
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      fontWeight: 'light',
                      fontFamily: 'Poppins',
                    }}
                    noWrap
                  >
                    Already have an account?
                  </Typography>
                  <Typography variant="body1" fontWeight="light">
                    Sign in to your company <ArrowForwardIosIcon sx={{ fontSize: '1rem' }} />
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: '16px',
                    border: '0.6px solid #ddd',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '32px',
                    padding: '16px',
                    width: '100%',
                    cursor: 'pointer',
                    transition: 'all 0.3s',
                    '&:hover': { transform: 'translateY(-2px)', boxShadow: '0 2px 4px rgba(0,0,0,0.2)' },
                  }}
                  onClick={pushToSignup}
                >
                  <Typography
                    variant="h4"
                    component="div"
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      fontWeight: 'light',
                      fontFamily: 'Poppins',
                    }}
                    noWrap
                  >
                    Don&apos;t have an account?
                  </Typography>
                  <Typography variant="body1" fontWeight="light">
                    Find and sign up to your company <ArrowForwardIosIcon sx={{ fontSize: '1rem' }} />
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'right' }}>
                <img
                  src={getiingstartedimg}
                  alt="Ailsa"
                  width="100%"
                  height="100%"
                  style={{ borderTopRightRadius: '16px', borderBottomRightRadius: '16px' }}
                />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </PublicLayout>
    </>
  );
}

export default withPublicRoute(Login);
