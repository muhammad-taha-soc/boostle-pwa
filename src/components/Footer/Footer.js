/* eslint-disable no-unused-vars */
import * as React from 'react';
import { Link } from 'react-router-dom';
import { Linkedin } from 'react-bootstrap-icons';
import { Youtube } from 'react-bootstrap-icons';
import { Instagram } from 'react-bootstrap-icons';
import { Facebook } from 'react-bootstrap-icons';
import { Twitter } from 'react-bootstrap-icons';
import Ailsaicon from '../../assets/images/a lsa.png';
import './Footer.scss';
import { Box, Typography } from '@mui/material';
const Footer = () => {
  return (
    // <footer className="footer">
    //   <div className="footer__wrap wr wr--lg al al--col">
    //     <div className="footer__upper al">
    //       <div className="footer__column al al--col">
    //         <img src={icon} className="footer__logo-icon" alt="logo" width="150" />
    //         <p className="bold no-margin lg">One Platform, Zero Complexity</p>
    //       </div>
    //       {/* <div className="footer__column al al--col">
    //         <div className="footer__column-title">Product</div>
    //         <Link to="/login" className="footer__column-link">
    //           Try for free!
    //         </Link>
    //         <Link to="/packages " className="footer__column-link">
    //           Packages
    //         </Link>
    //         <Link to="/signup" className="footer__column-link">
    //           Signup
    //         </Link>
    //       </div> */}
    //       <div className="footer__column al al--col">
    //         <div className="footer__column-title">Company</div>
    //         <Link to="/about" className="footer__column-link">
    //           About Boostle
    //         </Link>
    //         <Link to="/privacy-policy" className="footer__column-link">
    //           Privacy Policy
    //         </Link>
    //         {/* <Link to="/terms-and-conditions" className="footer__column-link">
    //           Terms & Conditions
    //         </Link> */}
    //       </div>
    //       <div className="footer__column al al--col">
    //         <div className="footer__column-title">Learn more</div>
    //         {/* <Link to="/news" className="footer__column-link">
    //           News
    //         </Link> */}
    //         <Link to="/contact" className="footer__column-link">
    //           Contact Us
    //         </Link>
    //       </div>
    //     </div>
    //     <div className="footer__lower al al--spc al--ctr">
    //       <div className="footer__social-links al al--ctr">
    //         <a
    //           href="https://www.linkedin.com/company/boostleio/"
    //           target="_blank"
    //           className="footer__social-link al al--ctr al--mid"
    //           rel="noreferrer"
    //         >
    //           <Linkedin size={24} />
    //         </a>
    //         <a
    //           href="https://www.youtube.com/@Boostleio"
    //           target="_blank"
    //           className="footer__social-link al al--ctr al--mid"
    //           rel="noreferrer"
    //         >
    //           <Youtube size={24} />
    //         </a>
    //         <a
    //           href="https://www.instagram.com/boostleio"
    //           target="_blank"
    //           className="footer__social-link al al--ctr al--mid"
    //           rel="noreferrer"
    //         >
    //           <Instagram size={24} />
    //         </a>
    //         <a
    //           href="https://www.facebook.com/boostle.io"
    //           target="_blank"
    //           className="footer__social-link al al--ctr al--mid"
    //           rel="noreferrer"
    //         >
    //           <Facebook size={24} />
    //         </a>
    //         <a
    //           href="https://x.com/boostleSocial"
    //           target="_blank"
    //           className="footer__social-link al al--ctr al--mid"
    //           rel="noreferrer"
    //         >
    //           <Twitter size={24} />
    //         </a>
    //       </div>
    //       <div className="footer__copyright al al--ctr al--mid">
    //         Designed & Developed by Boostle © {new Date().getFullYear()}
    //       </div>
    //     </div>
    //   </div>
    // </footer>
    <footer>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '16px',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '16px',
            gap: '16px',
          }}
        >
          <img src={Ailsaicon} className="footer__logo-icon" alt="logo" width="100" />
          <Typography variant="body1">One Platform, Zero Complexity</Typography>
          <div className="footer__lower al al--spc al--ctr">
           <div className="footer__social-links al al--ctr">
            <a
              href="https://www.linkedin.com/company/ailsatech/"
              target="_blank"
              className="footer__social-link al al--ctr al--mid"
              rel="noreferrer"
            >
              <Linkedin size={24} />
            </a>
            <a
              href="https://www.youtube.com/@Boostleio"
              target="_blank"
              className="footer__social-link al al--ctr al--mid"
              rel="noreferrer"
            >
              <Youtube size={24} />
            </a>
            <a
              href="https://www.instagram.com/boostleio"
              target="_blank"
              className="footer__social-link al al--ctr al--mid"
              rel="noreferrer"
            >
              <Instagram size={24} />
            </a>
            <a
              href="https://www.facebook.com/boostle.io"
              target="_blank"
              className="footer__social-link al al--ctr al--mid"
              rel="noreferrer"
            >
              <Facebook size={24} />
            </a>
            <a
              href="https://x.com/boostleSocial"
              target="_blank"
              className="footer__social-link al al--ctr al--mid"
              rel="noreferrer"
            >
              <Twitter size={24} />
            </a>
          </div>
          {/* <div className="footer__copyright al al--ctr al--mid">
            Designed & Developed by Boostle © {new Date().getFullYear()}
          </div> */}
        </div>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '16px',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '16px',
              gap: '16px',
            }}
          >
            <Typography
              variant="h6"
              sx={{ fontWeight: '700', fontSize: '16px', color: 'var(--text-colour-light)', lineHeight: '24px' }}
            >
              COMPANY
            </Typography>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '16px',
                flexWrap: 'wrap',
                gap: '10px',
              }}
            >
              <Typography
                variant="body1"
                sx={{ fontWeight: '400', fontSize: '14px', color: 'var(--text-colour-light)', lineHeight: '20px' }}
              >
                Work with Us
              </Typography>
              <Typography
                variant="body1"
                sx={{ fontWeight: '400', fontSize: '14px', color: 'var(--text-colour-light)', lineHeight: '20px' }}
              >
                Contact Us
              </Typography>
              <Typography
                variant="body1"
                sx={{ fontWeight: '400', fontSize: '14px', color: 'var(--text-colour-light)', lineHeight: '20px' }}
              >
                About Us
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '16px',
              gap: '16px',
            }}
          >
            <Typography
              variant="body1"
              sx={{ fontWeight: '700', fontSize: '16px', color: 'var(--text-colour-light)', lineHeight: '24px' }}
            >
              COMMUNITY
            </Typography>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                flexWrap: 'wrap',
                gap: '10px',
                alignItems: 'center',
                padding: '16px',
              }}
            >
              <Typography
                variant="body1"
                sx={{ fontWeight: '400', fontSize: '14px', color: 'var(--text-colour-light)', lineHeight: '20px' }}
              >
                {' '}
                Join our Community
              </Typography>
              <Typography
                variant="body1"
                sx={{ fontWeight: '400', fontSize: '14px', color: 'var(--text-colour-light)', lineHeight: '20px' }}
              >
                Follow us on LinkedIn
              </Typography>
              <Typography
                variant="body1"
                sx={{ fontWeight: '400', fontSize: '14px', color: 'var(--text-colour-light)', lineHeight: '20px' }}
              >
                Blog
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '16px',
              gap: '16px',
            }}
          >
            <Typography
              variant="body1"
              sx={{ fontWeight: '700', fontSize: '16px', color: 'var(--text-colour-light)', lineHeight: '24px' }}
            >
              TERM & POLICIES
            </Typography>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                flexWrap: 'wrap',
                gap: '10px',
                alignItems: 'center',
                padding: '16px',
              }}
            >
              <Link to="/privacy-policy">
                <Typography
                  variant="body1"
                  sx={{ fontWeight: '400', fontSize: '14px', color: 'var(--text-colour-light)', lineHeight: '20px' }}
                >
                  Privacy Notice
                </Typography>
              </Link>
              <Link to="/terms-of-service">
                <Typography
                  variant="body1"
                  sx={{ fontWeight: '400', fontSize: '14px', color: 'var(--text-colour-light)', lineHeight: '20px' }}
                >
                  Terms of Service
                </Typography>
              </Link>
              <Link to="/usage-guidelines">
                <Typography
                  variant="body1"
                  sx={{ fontWeight: '400', fontSize: '14px', color: 'var(--text-colour-light)', lineHeight: '20px' }}
                >
                  Usage Guidelines
                </Typography>
              </Link>
            </Box>
          </Box>
        </Box>
      </Box>
    </footer>
  );
};

export default Footer;
