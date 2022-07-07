import React from 'react';
import styled from 'styled-components';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import ArticleIcon from '@mui/icons-material/Article';
import LogoutIcon from '@mui/icons-material/Logout';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import DeleteIcon from '@mui/icons-material/Delete';
import CancelIcon from '@mui/icons-material/Cancel';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import DashboardIcon from '@mui/icons-material/Dashboard';

import { Link, NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <SidebarContainer>
      <SidebarWrapper>
        <SidebarMenu>
          <h3>Dashboard</h3>
          <ul>
            <li>
              <SidebarIcon>
                <DashboardIcon />
              </SidebarIcon>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <SidebarIcon>
                <AdminPanelSettingsIcon />
              </SidebarIcon>
              <NavLink to="/admins">Admins</NavLink>
            </li>

            <li>
              <SidebarIcon>
                <PeopleAltIcon />
              </SidebarIcon>
              <NavLink to="/users">Users</NavLink>
            </li>
          </ul>
        </SidebarMenu>
        <SidebarMenu>
          <h3>Project</h3>
          <ul>
            <li>
              <SidebarIcon>
                <ArticleIcon />
              </SidebarIcon>
              <NavLink to="/projects">Projects</NavLink>
            </li>
            <li>
              <SidebarIcon>
                <RequestQuoteIcon />
              </SidebarIcon>
              Requests
            </li>

            <li>
              <SidebarIcon>
                <CheckBoxIcon />
              </SidebarIcon>
              Granted
            </li>
            <li>
              <SidebarIcon>
                <CancelIcon />
              </SidebarIcon>
              Rejected
            </li>
          </ul>
        </SidebarMenu>
        <SidebarMenu>
          <h3>Notifications</h3>
          <ul>
            <li>
              <SidebarIcon>
                <MailOutlineIcon />
              </SidebarIcon>
              Messages
            </li>
          </ul>
        </SidebarMenu>
        <SidebarMenu>
          <h3>Settings</h3>
          <ul>
            <li>
              <SidebarIcon>
                <DeleteIcon />
              </SidebarIcon>
              Delete Admin
            </li>
            <li>
              <SidebarIcon>
                <LogoutIcon />
              </SidebarIcon>
              Logout
            </li>
          </ul>
        </SidebarMenu>
      </SidebarWrapper>
    </SidebarContainer>
  );
};

export default Sidebar;
const SidebarIcon = styled.div`
  margin-right: 7px;
  font-size: 15px;
  color: #564480;
`;
const SidebarMenu = styled.div`
  margin-top: 30px;
  margin-bottom: 40px;
  h3 {
    font-size: 18px;
    color: #564480;
  }
  ul {
    list-style: none;
    padding: 7px;
  }

  li {
    /* border: 1px solid black; */
    padding: 7px;
    cursor: pointer;
    display: flex;
    align-items: center;
    border-radius: 14px;
    &:active {
      background-color: #9e7fe8;
      color: #fffade;
    }
    &:hover {
      background-color: #9e7fe8;
      color: #fffade;
    }
  }
`;
const SidebarWrapper = styled.div`
  padding: 20px;
  color: #2214ee;
`;
const SidebarContainer = styled.div`
  /* if sidebar is 1 unit other pages are 4 unit */
  flex: 1;
  height: calc(100vh -60px);
  background-color: #fdf7ff;
  box-shadow: 10px 4px 15px -6px rgba(227, 217, 217, 0.75);
  -webkit-box-shadow: 10px 4px 15px -6px rgba(227, 217, 217, 0.75);
  -moz-box-shadow: 10px 4px 15px -6px rgba(227, 217, 217, 0.75);
  position: sticky;
  top: 60px;
`;
