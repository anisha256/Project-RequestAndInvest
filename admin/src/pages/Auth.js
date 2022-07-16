import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import styled from 'styled-components';
import { useNavigate } from 'react-router';

const Auth = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState([]);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

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
  const handleRegisterChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLoginData = async (e) => {
    e.preventDefault();
    console.log('clicked');

    console.log('config passed');

    try {
      const { data } = await axios.post(
        'http://localhost:5000/api/login',
        loginData,
        {
          headers: {
            'content-type': 'application/json',
          },
        }
      );

      const { userid, username, refreshToken, role, email, accessToken } =
        data.data;
      localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('role', role);
      localStorage.setItem('_id', userid);
      localStorage.setItem('username', username);
      setUser({
        userid: userid,
        username: username,
        refreshToken: refreshToken,
        accessToken: accessToken,
        role: role,
        email: email,
      });

      if (data.data.statusCode === 200) {
        toast.success('login successful', { autoClose: 2000 });
      }
      navigate('/');
    } catch (error) {
      console.log(error);
      toast.error('Invalid Credentials', { autoClose: 2000 });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('registered');
    try {
      const config = {
        headers: {
          'content-type': 'application/json',
        },
      };
      const data = await axios.post(
        'http://localhost:5000/api/admin/register',
        formData,
        config
      );
      console.log(data);
      if (data.data.statusCode === 200) {
        await toast.success('Registered successful', { autoClose: 2000 });
      }
    } catch (error) {}
  };

  return (
    <>
      <AuthContainer>
        <h2>Welcome To Admin Panel</h2>

        <FormWrapper>
          <Form onSubmit={handleLoginData}>
            <h2>Login</h2>
            <Formfield>
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
              <ButtonDiv>
                <Button type="submit">Login</Button>
              </ButtonDiv>
            </Formfield>
          </Form>
          <Form onSubmit={handleSubmit}>
            <h2>Register</h2>
            <Formfield>
              <InputC>
                <label>Username</label>
                <Input
                  id="username"
                  type="text"
                  name="username"
                  placeholder="Enter the username"
                  value={formData.username}
                  onChange={handleRegisterChange}
                />
              </InputC>
              <InputC>
                <label>Email</label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Enter the email"
                  value={formData.email}
                  onChange={handleRegisterChange}
                />
              </InputC>
              <InputC>
                <label>Password</label>
                <Input
                  id="password"
                  type="password"
                  name="password"
                  placeholder="Enter the password"
                  value={formData.password}
                  onChange={handleRegisterChange}
                />
              </InputC>
              <ButtonDiv>
                <Button type="submit">Register</Button>
              </ButtonDiv>
            </Formfield>
          </Form>
        </FormWrapper>
      </AuthContainer>
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
    </>
  );
};

export default Auth;
const AuthContainer = styled.div`
  display: flex;
  flex: 4;
  min-height: 100vh;
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
  /* border: 1px solid black; */
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: #fdf7ff;

  @media screen and (max-width: 998px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    row-gap: 20px;
  }
`;
const Form = styled.form`
  /* width: 600px; */
  padding: 20px;
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
  row-gap: 15px;
  /* border: 1px solid black; */
  padding-bottom: 20px;
`;
const ButtonDiv = styled.div`
  display: flex;
  flex-direction: column;
  /* border: 1px solid black; */
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
const Formfield = styled.div`
  padding-top: 20px;
`;
