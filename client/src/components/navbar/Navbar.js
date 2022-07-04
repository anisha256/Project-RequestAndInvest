import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { GiHamburgerMenu } from 'react-icons/gi';

const Navbar = () => {
  const [showMediaIcon, setSetMediaIcon] = useState(false);

  return (
    <>
      <Nav>
        <NavLeft>
          <h2>
            <span>R</span>e<span>Z</span>ii
          </h2>
        </NavLeft>
        <NavCenter>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/feed">Feed</NavLink>
          <NavLink to="/profile">My Profile</NavLink>
        </NavCenter>
        <NavRight>
          <NavLink to="/login">
            <Button>Login</Button>
          </NavLink>
          <NavLink to="/register">
            <Button>Register</Button>
          </NavLink>
        </NavRight>
        <Hambuger>
          <GiHamburgerMenu onClick={() => setSetMediaIcon(!showMediaIcon)} />
          {showMediaIcon && (
            <MobileMenu>
              <NavLink to="/">Home</NavLink>
              <NavLink to="/feed">Feed</NavLink>
              <NavLink to="/profile">My Profile</NavLink>
              <NavLink to="/login">
                <Button>Login</Button>
              </NavLink>
              <NavLink to="/register">
                <Button>Register</Button>
              </NavLink>
            </MobileMenu>
          )}
        </Hambuger>
      </Nav>
    </>
  );
};

export default Navbar;
const Nav = styled.div`
  top: 0;
  width: 100%;
  height: 60px;
  color: #564480;
  background-color: #fdf7ff;
  display: grid;
  grid-template-columns: 60px 1fr 2fr 1.5fr 60px;
  position: sticky;
  -webkit-box-shadow: 0px 6px 8px 0px rgba(0, 0, 0, 0.09);
  -moz-box-shadow: 0px 6px 8px 0px rgba(0, 0, 0, 0.09);
  box-shadow: 0px 6px 8px 0px rgba(0, 0, 0, 0.09);
  @media screen and (max-width: 1080px) {
    grid-template-columns: 45px 3fr 2fr 3fr 45px;
  }
`;
const NavLeft = styled.div`
  display: grid;
  grid-column: 2/3;
  justify-content: start;
  align-items: center;
`;
const NavRight = styled.div`
  display: flex;
  grid-column: 4/5;
  align-items: center;
  justify-content: flex-end;
  column-gap: 30px;
  @media screen and (max-width: 998px) {
    display: none;
  }
`;
const NavCenter = styled.div`
  display: flex;
  grid-column: 3/4;
  align-items: center;
  justify-content: center;
  column-gap: 30px;
  color: #564480;
  a {
    text-decoration: none;
    color: #564480;
  }
  a.active {
    color: #9e7fe8;
  }
  a.hover {
    color: #9e7fe8;
  }
  @media screen and (max-width: 998px) {
    display: none;
  }
`;
const Hambuger = styled.div`
  display: none;
  @media screen and (max-width: 998px) {
    display: flex;
    grid-column: 4/5;
    align-items: center;
    justify-content: flex-end;
    color: #564480;
    cursor: pointer;
  }
`;
const MobileMenu = styled.div`
  display: flex;
  position: absolute;
  flex-direction: column;
  top: 60px;
  right: 0;
  width: 100%;
  padding: 20px 40px;
  border-top: 1px solid white;
  justify-content: center;
  align-items: flex-end;
  a {
    text-decoration: none;
    color: #564480;
    margin-bottom: 20px;
  }
  a.active {
    color: #9e7fe8;
  }
  a.hover {
    color: #9e7fe8;
  }
  color: rgba(255, 250, 222, 0.32);
`;
const Button = styled.button`
  background-color: #9e7fe8;
  border: none;
  color: #fdf7ff;
  height: 30px;
  width: 80px;
  border-radius: 4px;
  font-size: 15px;
  padding: 5px;
`;
