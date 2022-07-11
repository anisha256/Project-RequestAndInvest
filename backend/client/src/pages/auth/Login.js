import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useNavigate } from 'react-router';

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
        'https://reziii.herokuapp.com/api/refresh',
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
        'https://reziii.herokuapp.com/api/login',
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
      navigate('/feed');
    } catch (error) {
      toast.error('Invalid Credentials', { autoClose: 2000 });
    }
    console.log(user);
  };

  return (
    <>
      <Container>
        <FormWrapper>
          <LoginForm onSubmit={handleSubmit}>
            <h2>Login</h2>

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
    to top,
    #564480,
    #634f93,
    #705aa6,
    #7d65b9,
    #8b70cd,
    #9b7ed8,
    #ab8ce2,
    #bb9bed,
    #ceb1f1,
    #dfc8f5,
    #eedffa,
    #fcf7ff
  );
`;
const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;
const LoginForm = styled.form`
  /* height: 300px;
  width: 400px; */
  padding: 20px;
  background-color: #fdf7ff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: 20px;
  label {
    color: #564480;
    display: inline-block;
    text-align: left;
  }
`;
const Button = styled.button`
  padding: 5px 10px;
  background-color: #564480;
  border: none;
  border-radius: 5px;
  height: 40px;
  width: 100px;
  color: white;
  font-size: 15px;
  font-weight: bold;
  cursor: pointer;
`;
const InputC = styled.section`
  display: flex;
  flex-direction: column;
`;
const Input = styled.input`
  height: 45px;
  width: 350px;
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
`;
