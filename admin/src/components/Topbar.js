import React from 'react';
import styled from 'styled-components';
import avatar from '../assets/avatar.png';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import SettingsIcon from '@mui/icons-material/Settings';
import DarkModeIcon from '@mui/icons-material/DarkMode';
const Topbar = () => {
  return (
    <TopbarContainer>
      <TopbarWrapper>
        <Left>
          <span>Re</span>
          <span>zII</span>
        </Left>
        <Right>
          <IconContainer>
            <DarkModeIcon />
          </IconContainer>
          <IconContainer>
            <NotificationsNoneIcon />
            <span>2</span>
          </IconContainer>
          <IconContainer>
            <SettingsIcon />
          </IconContainer>
          <Avatar src={avatar} />
        </Right>
      </TopbarWrapper>
    </TopbarContainer>
  );
};

export default Topbar;
const Avatar = styled.img`
  height: 40px;
  width: 40px;
  border-radius: 50%;
  cursor: pointer;
  object-fit: cover;
`;
const IconContainer = styled.div`
  position: relative;
  cursor: pointer;
  margin-right: 10px;
  span {
    font-size: 12px;
    height: 16px;
    width: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: -5px;
    background-color: red;
    right: 5px;
    color: white;
    border-radius: 50%;
  }
`;
const Right = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const Left = styled.div`
  font-size: 30px;
  cursor: pointer;
  font-weight: bolder;
`;
const TopbarWrapper = styled.div`
  height: 100%;
  padding: 0px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fdf7ff;
  -webkit-box-shadow: 0px 6px 8px 0px rgba(0, 0, 0, 0.09);
  -moz-box-shadow: 0px 6px 8px 0px rgba(0, 0, 0, 0.09);
  box-shadow: 0px 6px 8px 0px rgba(0, 0, 0, 0.09);
`;
const TopbarContainer = styled.div`
  width: 100%;
  height: 60px;
  /* border: 1px solid black; */
  position: sticky;
  top: 0;
  /* toolbar cant be replaced */
  z-index: 999;
`;
