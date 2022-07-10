import React, { useState } from 'react';
import styled from 'styled-components';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

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
        {/* {loading && <Spinner />} */}
        <FormWrapper>
          <RegisterForm onSubmit={handleSubmit}>
            <h2>Register</h2>

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
const RegisterForm = styled.form`
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
