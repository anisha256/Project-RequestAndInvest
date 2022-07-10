import React, { useContext, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { GiHamburgerMenu } from 'react-icons/gi';
// import AuthContext from '../../context/AuthContext';
import { userExists } from '../Constants';
import axios from 'axios';
const Navbar = () => {
  // const { user, logoutUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showMediaIcon, setSetMediaIcon] = useState(false);
  const handleLogin = () => {
    navigate('/login');
  };
  const handleRegister = () => {
    navigate('/register');
  };
  const handleLogout = async () => {
    try {
      // const { data } = await axios.delete('http://localhost:5000/api/logout', {
      //   headers: {
      //     'content-type': 'application/json',
      //     refresh_token: localStorage.getItem('refreshToken'),
      //   },
      // });
      // console.log(data.message);
      localStorage.removeItem('refreshToken');
      console.log('logout successfully');
      navigate('/login');
    } catch (error) {
      console.log(error);
    }
  };
  // console.log(userExists());
  return (
    <>
      <Nav>
        <NavLeft>
          <h2>
            <span>R</span>e<span>Z</span>ii
          </h2>
        </NavLeft>
        <NavCenter>
          {userExists() && <NavLink to="/feed">Feed</NavLink>}

          {userExists() ? (
            <NavLink to="/apply/project">Apply</NavLink>
          ) : (
            <NavLink to="/">Home</NavLink>
          )}
        </NavCenter>
        <NavRight>
          {userExists() ? (
            // <Button onClick={logoutUser}>Logout</Button>
            <Button onClick={handleLogout}>Logout</Button>
          ) : (
            <Button onClick={handleLogin}>Login</Button>
          )}
          {!userExists() && <Button onClick={handleRegister}>Register</Button>}
        </NavRight>
        <Hambuger>
          <GiHamburgerMenu onClick={() => setSetMediaIcon(!showMediaIcon)} />
          {showMediaIcon && (
            <MobileMenu>
              {userExists() && (
                <NavLink to="/feed">
                  <Div>Feed</Div>
                </NavLink>
              )}
              {userExists() ? (
                <NavLink to="/apply/project">
                  <Div>Apply</Div>
                </NavLink>
              ) : (
                <NavLink to="/">
                  <Div>Home</Div>
                </NavLink>
              )}
              {userExists() && (
                <NavLink to="/profile">
                  <Div>Profile</Div>
                </NavLink>
              )}
              <ButtonDiv>
                {!userExists() && (
                  <Button onClick={handleRegister}>Register</Button>
                )}
                {!userExists() ? (
                  <Button onClick={handleLogin}>Login</Button>
                ) : (
                  // <Button onClick={logoutUser}>Logout</Button>
                  <Button onClick={handleLogout}>Logout</Button>
                )}
              </ButtonDiv>
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
const Div = styled.div`
  background-color: #9e7fe8;
  border: none;
  color: #fdf7ff;
  height: 30px;
  width: 80px;
  border-radius: 10px;
  font-size: 15px;
  padding: 5px;
  cursor: pointer;
  text-align: center;
  .active {
    background-color: pink;
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
  color: rgba(252, 247, 255, 0.63);
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
  cursor: pointer;
  &:hover {
    background-color: #e8d5b5;
    color: #564480;
  }
`;
const ButtonDiv = styled.section`
  display: flex;
  flex-direction: column;
  row-gap: 20px;
`;
