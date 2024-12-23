/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Link } from 'react-router-dom';
import _ from 'lodash';
import { useAuth0 } from '@auth0/auth0-react';
import PropTypes from 'prop-types';
import logoWhite from '../../assets/images/Ailsa_logo_gif.gif';
import { QuestionCircleFill, BellFill, PersonFill, BoxArrowRight } from 'react-bootstrap-icons';
import { IconButton, Badge, Menu, List, ListItem, ListItemText, Typography, Box } from '@mui/material';
import { ChatBubble } from '@mui/icons-material';
// import NotificationsIcon from '@mui/icons-material/Notifications';
import MenuItem from '@mui/material/MenuItem';
import MailIcon from '@mui/icons-material/Mail';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';
import './AppHeader.scss';
import walleticon from '../../assets/gif/purse.gif';
import { refreshBalance } from '../../utilities/apiCalls';
import RefreshIcon from '@mui/icons-material/Refresh';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import Avatar from '../Avatar/Avatar';
import WalletTopupDialog from '../StripePayment/WalletTopupDialog';
import { getAllNotifications } from '../../utilities/apiCalls';
import { setBusinessInformation } from '../../redux/actions/setBusinessInformation';

const AppHeader = ({ toggleHelpSection, helpSectionOpen }) => {
  const dispatch = useDispatch();
  const businessInfo = useSelector((state) => state.business.businessInfo);
  const userInfo = useSelector((state) => state.user.userInfo);
  const { logout } = useAuth0();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [walletMenuAnchorEl, setWalletMenuAnchorEl] = useState(null);
  const [walletBalance, setWalletBalance] = useState(businessInfo.balance);
  const businessName = !_.isEmpty(businessInfo) && businessInfo ? businessInfo.name : '';
  const userFirstName = !_.isEmpty(userInfo) && userInfo.first_name ? userInfo.first_name : '';
  const userLastName = !_.isEmpty(userInfo) && userInfo.last_name ? userInfo.last_name : '';
  const userInitials = `${userFirstName ? userFirstName[0] : ''}${userLastName ? userLastName[0] : ''}`;
  const [anchorEl, setAnchorEl] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  useEffect(() => {
    document.addEventListener('click', setMenuVisibility);
    return () => document.removeEventListener('click', setMenuVisibility);
  }, [menuOpen]);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (anchorEl && !anchorEl.contains(event.target)) {
        setAnchorEl(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [anchorEl]);
  
  const openHelpSection = () => {
    toggleHelpSection(!helpSectionOpen);
  };

  const setMenuVisibility = (event) => {
    if (!event.target.closest('.avatar') && menuOpen) {
      setMenuOpen(false);
    }
  };

  const handleWalletMenuClick = (event) => {
    setWalletMenuAnchorEl(event.currentTarget);
  };

  const handleWalletMenuClose = () => {
    setWalletMenuAnchorEl(null);
  };
  useEffect(() => {
    getNotifications();
  }, []);
  const getNotifications = async () => {
    const payload = {
      limit: 5,
      skip: 0,
    };
    const response = await getAllNotifications(payload);
    setNotifications(response.result);
    console.log(`Notifications  `, response);
  };
  const isWalletMenuOpen = Boolean(walletMenuAnchorEl);

  const logoutUser = () => {
    setMenuOpen(!menuOpen);
    localStorage.clear();
    logout({ logoutParams: { returnTo: `${window.location.origin}` } });
  };
  const toggleNotifications = () => {
    setIsNotificationOpen(!isNotificationOpen);
    getAllNotifications();
  };
  const handleNotificationClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const onPaymentSuccess = async () => {
    setOpenDialog(false); // Close the top-up dialog
    handleWalletMenuClick({ currentTarget: document.getElementById('wallet-button') }); 
    checkBalance();
  };
  const checkBalance = async () => {
    const balance = await refreshBalance();
    setWalletBalance(balance);
    dispatch(setBusinessInformation({ ...businessInfo, balance }));
  };

  const isMenuOpen = Boolean(anchorEl);
  return (
    <>
      <header className="b-app-header al al--spc al--ctr">
        <div className="b-app-header__logo">
          <Link to="/home" className="b-app-header__logo-wrap al al--ctr al--mid">
            <img src="https://ailsa.io/static/media/Ailsa_logo_gif.d848f1015e41a9186942.gif" alt="logo" width={150} />
          </Link>
        </div>
        <div className={`b-app-header__company-level al al--center`}>
          <p className="b-app-header__company-name bold no-margin">{businessName}</p>
          <div className="b-app-header__divider" />
        </div>
        <div className="b-app-header__main-actions al al--spc al--ctr">
          {/* <div className="b-app-header__main-action al al--ctr al--mid">
          <button onClick={() => openHelpSection()} className="b-app-header__main-action-link">
            <QuestionCircleFill width="20" height="20" />
          </button>
        </div> */}
          <div className="b-app-header__main-action al al--ctr al--mid">
            <button onClick={toggleNotifications}>
              <IconButton
                color="inherit"
                onClick={handleNotificationClick}
                aria-controls={isMenuOpen ? 'notification-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={isMenuOpen ? 'true' : undefined}
              >
                <Badge badgeContent={0} color="secondary">
                  <ChatBubble />
                </Badge>
              </IconButton>

              {/* Notification Dropdown */}
              <Menu
                id="notification-menu"
                anchorEl={anchorEl}
                open={isMenuOpen}
                onClose={handleClose}
                PaperProps={{
                  style: {
                    width: '320px',
                    padding: '10px',
                  },
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: 'bold', padding: '10px 0 5px 10px' }}>
                  Message Notification
                </Typography>

                <List sx={{ maxHeight: 300, overflow: 'auto' }}>
                  {notifications.length > 0 ? (
                    notifications.map((notification) => (
                      <ListItem alignItems="flex-start" key={notification._id}>
                        <MailIcon sx={{ marginRight: '10px' }} />
                        <ListItemText primary={notification.title} secondary={notification.message} />
                      </ListItem>
                    ))
                  ) : (
                    <ListItem alignItems="center">
                      <ListItemText textAlign="center" primary="No notifications" />
                    </ListItem>
                  )}
                </List>
                <Typography
                  variant="body2"
                  sx={{ padding: '10px', textAlign: 'center', color: '#8f87df', cursor: 'pointer' }}
                >
                  See All Notifications
                </Typography>
              </Menu>
            </button>
          </div>
          <div className="b-app-header__main-action al al--ctr al--mid">
            <IconButton
              color="inherit"
              onClick={handleWalletMenuClick}
              aria-controls={isWalletMenuOpen ? 'wallet-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={isWalletMenuOpen ? 'true' : undefined}
              id="wallet-button" // Added ID for reference
            >
              <AccountBalanceWalletIcon />
            </IconButton>

            {/* Wallet Dropdown */}
            <Menu
              id="wallet-menu"
              anchorEl={walletMenuAnchorEl}
              open={isWalletMenuOpen}
              onClose={handleWalletMenuClose}
              PaperProps={{
                style: {
                  width: '240px',
                  borderRadius: '10px', // Rounded corners
                  boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                },
              }}
            >
              <Box textAlign="center" p={2} sx={{ bgcolor: 'background.paper', borderRadius: '10px' }}>
                <img src={walleticon} alt="wallet" width={50} />
                <Typography
                  variant="h6"
                  component="div"
                  sx={{
                    fontWeight: 'bold',
                    fontSize: '1.25rem',
                    animation: 'pulse 2s infinite',
                    '@keyframes pulse': {
                      '0%': { color: '#000', transform: 'scale(1)' },
                      '50%': { color: '#8f87df', transform: 'scale(1.1)' },
                      '100%': { color: '#000', transform: 'scale(1)' },
                    },
                  }}
                >
                  {walletBalance} credits
                </Typography>
                <IconButton onClick={checkBalance}>
                  <RefreshIcon />
                </IconButton>
                <Typography
                  variant="body1"
                  sx={{ mt: 2, cursor: 'pointer', color: 'primary.main' }}
                  onClick={() => { setOpenDialog(true); handleWalletMenuClose(); }}
                >
                  Add More Credits
                </Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>
                  Current Plan: Basic
                </Typography>
                {/* Stripe Buy Button with additional styling for layout management */}
              </Box>
            </Menu>
          </div>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={`b-app-header__main-action al al--ctr al--mid ${menuOpen ? 'active' : ''}`}
          >
            <Avatar initials={userInitials} size="lg" />
          </button>

          <div className={`b-app-header__user-menu ${menuOpen ? 'open' : ''}`}>
            {/* <div className="b-app-header__user-summary al al--center">
            <Avatar image={avatar} placeholder={initials} variant="large" />
            <div className="b-app-header__user-info">
              <p className="b-app-header__user-name sm no-margin bold">{`${user.first_name} ${user.last_name}`}</p>
              <p className="b-app-header__user-role sm no-margin light">{role}</p>
            </div>
          </div> */}
            <ul className="b-app-header__profile-links al al--col">
              <li className={'b-app-header__profile-item al al--center'}>
                <NavLink to="/settings" className={'b-app-header__profile-link al al--center'}>
                  <PersonFill width="20" height="20" />
                  My profile
                </NavLink>
              </li>
              <li className={'b-app-header__profile-item al al--center'}>
                <button onClick={() => logoutUser()} className={'b-app-header__profile-link al al--center'}>
                  <BoxArrowRight width="20" height="20" />
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </header>
      <WalletTopupDialog openDialog={openDialog} handleCloseDialog={handleCloseDialog} onPaymentSuccess={onPaymentSuccess} />
    </>
  );
};

AppHeader.propTypes = {
  toggleHelpSection: PropTypes.func,
  helpSectionOpen: PropTypes.bool,
};

export default AppHeader;
