import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useNavigate } from 'react-router';
import login from '../../assets/login.png';

const Login = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState([]);
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setLoginData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const handleRefreshToken = async () => {
    try {
      const config = {
        headers: {
          'content-type': 'application/json',
          refresh_token: `${localStorage.getItem('refreshToken')}`,
        },
      };
      const { data } = await axios.get(
        'http://localhost:5000/api/refresh',
        config
      );
      const { accessToken } = data.data;
      console.log('new access token :', accessToken);
      localStorage.setItem('accessToken', accessToken);
    } catch (error) {}
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('submitted');
    try {
      const config = {
        headers: {
          'content-type': 'application/json',
        },
      };
      const { data } = await axios.post(
        'http://localhost:5000/api/login',
        loginData,
        config
      );
      // console.log(data.data);
      const { userid, username, refreshToken, role, email, accessToken } =
        data.data;
      setUser({
        userid: userid,
        username: username,
        refreshToken: refreshToken,
        role: role,
        email: email,
      });
      console.log('login refreshtoken', refreshToken);
      console.log('login accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('role', role);
      localStorage.setItem('_id', userid);

      handleRefreshToken();
      toast.success('login successful', { autoClose: 2000 });
      navigate('/profile');
    } catch (error) {
      toast.error('Invalid Credentials', { autoClose: 2000 });
    }
    console.log(user);
  };

  return (
    <>
      <Container>
        <FormWrapper>
          <Left>
            <Photo src={login} />
          </Left>
          <Right>
            <h2>Login</h2>

            <LoginForm onSubmit={handleSubmit}>
              <InputC>
                <label>Email</label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Enter the email"
                  value={loginData.email}
                  onChange={handleChange}
                />
              </InputC>
              <InputC>
                <label>Password</label>
                <Input
                  id="password"
                  type="password"
                  name="password"
                  placeholder="Enter the password"
                  value={loginData.password}
                  onChange={handleChange}
                />
              </InputC>
              <InputC>
                <Button type="submit">Login</Button>
              </InputC>
            </LoginForm>
          </Right>
        </FormWrapper>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </Container>
    </>
  );
};

export default Login;

const Container = styled.div`
  color: #564480;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-image: linear-gradient(
    to right bottom,
    #f9e7fe,
    #ffe6f3,
    #ffe7e6,
    #ffeadd,
    #fdefda
  );
`;
const FormWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 60%;
  background-color: white;
  box-shadow: 10px 10px 24px -7px rgba(46, 38, 64, 0.3);
  -webkit-box-shadow: 10px 10px 24px -7px rgba(46, 38, 64, 0.3);
  -moz-box-shadow: 10px 10px 24px -7px rgba(46, 38, 64, 0.3);
  @media screen and (max-width: 998px) {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
`;
const Left = styled.div`
  display: flex;
  flex: 1;
  @media screen and (max-width: 998px) {
    padding: 40px;
  }
`;
const Right = styled.div`
  flex: 1.5;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 40px;

  h2 {
    color: black;
    padding-top: 40px;
  }
  @media screen and (max-width: 998px) {
    width: 100%;
    h2 {
      color: black;
      padding-top: 10px;
    }
  }
`;
const Photo = styled.img`
  width: 100%;
  display: flex;
  object-fit: cover;
`;
const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: 30px;
  width: 100%;
  label {
    color: black;
    font-size: 20px;
    padding-bottom: 10px;
  }
`;
const Button = styled.button`
  padding: 5px 10px;
  background-color: black;
  border: none;
  border-radius: 5px;
  height: 50px;
  width: 150px;
  color: white;
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
  @media screen and (max-width: 998px) {
  }
`;
const InputC = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
const Input = styled.input`
  height: 60px;
  font-size: 18px;
  width: 100%;
  padding: 10px;
  border-radius: 3px;
  border: none;
  background-color: white;
  color: #564480;
  &:active {
    outline: none;
    border: none;
    background-color: white;
  }
  &:focus {
    outline: 0;
    border: none;
  }
  @media screen and (max-width: 998px) {
    /* width: 350px; */
    height: 50px;
  }
`;
