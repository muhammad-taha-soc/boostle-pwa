/* eslint-disable no-unused-vars */
import React from 'react';
import { NavLink } from 'react-router-dom';
import { HouseFill, Pencil, Lock, GearFill, FolderFill, Bank, BagFill } from 'react-bootstrap-icons';
import { Tooltip } from '@mui/material';
import _ from 'lodash';
import { useSelector } from 'react-redux';
import '../../styles/sidebar.scss';
import SettingsIcon from '@mui/icons-material/Settings';
import { Inventory2 } from '@mui/icons-material';
import HomeIcon from '@mui/icons-material/Home';
import { AccountCircle } from '@mui/icons-material';
import DataVaultIcon from '@mui/icons-material/DataObject';

function SideBar() {
  const businessInfo = useSelector((state) => state.business.businessInfo);
  const businessName = !_.isEmpty(businessInfo) && businessInfo ? businessInfo.name : '';
  return (
    <aside className="sidebar">
      {/* <div className="sidebar__header">
        <div className="sidebar__company-name">
          <span>{businessName}</span>
          <svg width="10" height="10" viewBox="0 0 24 24" className="sidebar__dropdown-icon">
            <path d="M7 10l5 5 5-5z"></path>
          </svg>
        </div>
      </div> */}

      <ul className="sidebar__menu-items">
        <li className="sidebar__menu-item">
          <NavLink className="sidebar__menu-link" activeClassName="active" to="/home">
            <HomeIcon fontSize="large" />
            <span className="sidebar__menu-text">Home</span>
          </NavLink>
        </li>
        <li className="sidebar__menu-item">
          <NavLink className="sidebar__menu-link" to="/profilebuilder">
            <AccountCircle fontSize="large" />
            <span className="sidebar__menu-text">Profile Builder</span>
          </NavLink>
        </li>
        <li className="sidebar__menu-item">
          <Tooltip title="Coming Soon">
            <div className="sidebar__menu-link disabled-link">
              <DataVaultIcon fontSize="large" />
              <span className="sidebar__menu-text">Data Vault</span>
              <Lock className="sidebar__lock-icon" />
            </div>
          </Tooltip>
        </li>
        <li className="sidebar__menu-item">
          <Tooltip title="Coming Soon">
            <div className="sidebar__menu-link disabled-link">
              <Inventory2 fontSize="large" />
              <span className="sidebar__menu-text">Archive</span>
              <Lock className="sidebar__lock-icon" />
            </div>
          </Tooltip>
        </li>
        {/* <li className="sidebar__menu-item">
          <NavLink className="sidebar__menu-link" to="/projects">
            <BagFill color="white" width="30" height="30" />
            <span className="sidebar__menu-text">Applications</span>
          </NavLink>
        </li>
        <li className="sidebar__menu-item">
          <NavLink className="sidebar__menu-link" to="/projects">
            <FolderFill color="white" width="30" height="30" />
            <span className="sidebar__menu-text">Reporting</span>
          </NavLink>
        </li> */}
      </ul>
      <ul className="sidebar__lower-menu-items">
        <li className="sidebar__menu-item">
          <NavLink className="sidebar__menu-link" to="/settings">
            <SettingsIcon fontSize="large" />
            <span className="sidebar__menu-text">Settings</span>
          </NavLink>
        </li>
      </ul>
    </aside>
  );
}

export default SideBar;
