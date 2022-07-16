import React, { useState } from 'react';
import styled from 'styled-components';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import register from '../../assets/login.png';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          'content-type': 'application/json',
        },
      };
      const data = await axios.post(
        'http://localhost:5000/api/auth/user/register',
        formData,
        config
      );
      console.log(data);
      toast.success('Registered successful', { autoClose: 2000 });
    } catch (error) {}

    // navigate('/');
  };
  return (
    <>
      <Container>
        <FormWrapper>
          <Left>
            <Photo src={register} />
          </Left>
          <Right>
            <h2>Register</h2>

            <RegisterForm onSubmit={handleSubmit}>
              <InputC>
                <label>Username</label>
                <Input
                  id="username"
                  type="text"
                  name="username"
                  placeholder="Enter the username"
                  value={formData.username}
                  onChange={handleChange}
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
                  value={formData.password}
                  onChange={handleChange}
                />
              </InputC>
              <InputC>
                <Button type="submit">Register</Button>
              </InputC>
            </RegisterForm>
          </Right>
        </FormWrapper>
      </Container>
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

export default Register;
const Container = styled.div`
  color: #564480;
  min-height: calc(100vh - 60px);
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
const RegisterForm = styled.form`
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
