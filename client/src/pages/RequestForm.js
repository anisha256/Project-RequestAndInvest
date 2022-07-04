import React, { useState } from 'react';
import styled from 'styled-components';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const RequestForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    telegramUsername: '',
    fullTimeWorker: '',
    teamExperience: '',
    linkedinProfiles: '',
    country: '',
    city: '',
    projectName: '',
    description: '',
    projectType: '',
    projectVision: '',
    additionalInfo: '',
  });
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success('login successful', { autoClose: 2000 });
    navigate('/');
  };
  return (
    <>
      <Container>
        <Content>
          <h1>Tell Us About your Team and Project</h1>
          <span>
            Please ensure you submit an email that is actively monitored, and
            check the spam folder.
          </span>
        </Content>

        <FormWrapper>
          <LoginForm onSubmit={handleSubmit}>
            <InputC>
              <InputField>
                <label>First Name </label>
                <Input
                  id="firstName"
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </InputField>
              <InputField>
                <label>Last Name </label>
                <Input
                  id="lastName"
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </InputField>
            </InputC>

            <InputC>
              <InputField>
                <label>Email</label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </InputField>
            </InputC>
            <InputC>
              <InputField>
                <label>Telegram Username</label>
                <Input
                  id="telegramUsername"
                  type="text"
                  name="telegramUsername"
                  value={formData.telegramUsername}
                  onChange={handleChange}
                />
              </InputField>
            </InputC>
            <InputC>
              <InputField>
                <label>Number of fulltime Worker</label>
                <Input
                  id="fullTimeWorker"
                  type="number"
                  name="fullTimeWorker"
                  value={formData.fullTimeWorker}
                  onChange={handleChange}
                />
              </InputField>
            </InputC>
            <InputC>
              <InputField>
                <label>Team Experience</label>
                <Input
                  id="teamExperience"
                  type="text"
                  name="teamExperience"
                  value={formData.teamExperience}
                  onChange={handleChange}
                />
              </InputField>
            </InputC>
            <InputC>
              <InputField>
                <label>Country</label>
                <Options
                  id="country"
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                >
                  <option value="" hidden>
                    Select country
                  </option>
                  <option value="layout 1">Nepal</option>
                  <option value="layout 2">China</option>
                  <option value="layout 3">France</option>
                  <option value="layout 3">India</option>
                  <option value="layout 3">Korea</option>
                  <option value="layout 3">Thailand</option>
                  <option value="other">other</option>
                </Options>
              </InputField>

              <InputField>
                <label>City</label>
                <Input
                  id="city"
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                />
              </InputField>
            </InputC>

            <InputC>
              <InputField>
                <label>Project Name</label>
                <Input
                  id="projectName"
                  type="text"
                  name="projectName"
                  value={formData.projectName}
                  onChange={handleChange}
                />
              </InputField>
            </InputC>

            <InputC>
              <InputField>
                <label>Description</label>
                <Textarea
                  id="description"
                  type="message"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                />
              </InputField>
            </InputC>
            <InputC>
              <InputField>
                <label>Project Type</label>
                <Input
                  id="projectType"
                  type="text"
                  name="projectType"
                  value={formData.projectType}
                  onChange={handleChange}
                />
              </InputField>
            </InputC>
            <InputC>
              <InputField>
                <label>Project Vision</label>

                <Textarea
                  id="projectVision"
                  type="message"
                  name="projectVision"
                  value={formData.projectVision}
                  onChange={handleChange}
                />
              </InputField>
            </InputC>
            <InputC>
              <InputField>
                <label>Additional Information</label>
                <Textarea
                  id="additionalInfo"
                  type="message"
                  name="additionalInfo"
                  value={formData.additionalInfo}
                  onChange={handleChange}
                />
              </InputField>
            </InputC>

            <InputC>
              <Button type="submit">Submit</Button>
            </InputC>
          </LoginForm>
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

export default RequestForm;
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
`;
const LoginForm = styled.form`
  padding: 30px;
  background-color: #fdf7ff;
  display: flex;
  flex-direction: column;
  display: block;
  box-sizing: border-box;
  label {
    color: #564480;
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
  flex-direction: row;
  justify-content: space-between;
  column-gap: 20px;
`;
const InputField = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
const Input = styled.input`
  height: 40px;
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
const Options = styled.select`
  height: 40px;
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
const Textarea = styled.textarea`
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
`;
const Content = styled.section`
  padding: 70px;
  text-align: center;
  span {
    padding-top: 20px;
  }
`;
