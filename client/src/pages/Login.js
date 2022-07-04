import React, { useState } from 'react';
import styled from 'styled-components';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();
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
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('submitted');
    try {
      const config = {
        headers: {
          'content-type': 'application/json',
        },
      };
      const data = await axios.post(
        'http://localhost:5000/api/login',
        loginData,
        config
      );
      toast.success('login successful', { autoClose: 2000 });
      console.log(data.data.token);
      setLoginData({
        email: '',
        phone: '',
      });

      navigate('/');
    } catch (error) {
      toast.error('Invalid Credentials', { autoClose: 2000 });
    }
  };
  return (
    <>
      <Container>
        <span>Login</span>
        <FormWrapper>
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
  height: 300px;
  width: 400px;
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
