import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useParams } from 'react-router-dom';
import { axiosJWT } from '../profile/Profile';

const RequestForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [draftDetail, setDraftDetail] = useState({
    firstName: '',
    lastName: '',
    email: '',
    telegramUsername: '',
    fullTimeWorker: '',
    teamExperience: '',
    linkedinProfiles: [],
    websiteUrl: '',
    country: '',
    city: '',
    projectName: '',
    description: '',
    projectType: '',
    projectVision: '',
    additionalInfo: '',
  });

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    telegramUsername: '',
    fullTimeWorker: '',
    teamExperience: '',
    linkedinProfiles: [],
    websiteUrl: '',
    country: '',
    city: '',
    projectName: '',
    description: '',
    projectType: '',
    projectVision: '',
    additionalInfo: '',
  });

  const handleChange = (e) => {
    setDraftDetail((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('file submit');
    try {
      const { data } = await axiosJWT.post(
        'http://localhost:5000/api/user/project/request',
        formData,
        {
          headers: {
            'content-type': 'application/json',
            access_token: localStorage.getItem('accessToken'),
          },
        }
      );

      setFormData(data.data);
      console.log('form submitted');
      console.log('formdata:', formData);
      toast.success('submit successful', { autoClose: 2000 });
    } catch (error) {
      console.log(error);
    }
  };
  const handleSave = async (e) => {
    e.preventDefault();
    console.log('save');
    try {
      const { data } = await axiosJWT.post(
        'http://localhost:5000/api/user/project/draft',
        formData,
        {
          headers: {
            'content-type': 'application/json',
            access_token: localStorage.getItem('accessToken'),
          },
        }
      );
      const res = data.data;
      console.log('res', res);
      setFormData(res);
      console.log('form submitted');
      toast.success(' Saved as Draft', { autoClose: 2000 });
      navigate('/drafts/table');
    } catch (error) {
      console.log(error);
    }
  };
  const getDraftToBeEdited = async () => {
    try {
      const { data } = await axiosJWT.get(`/api/admin/project/${id}/get`, {
        headers: {
          'content-type': 'application/json',
        },
      });
      setDraftDetail(data.data);
      setFormData(data.data);
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      const edited = await axiosJWT.put(
        `http://localhost:5000/api/user/project/draft/${id}`,
        draftDetail,
        {
          headers: {
            'content-type': 'application/json',
            // access_token: localStorage.getItem('accessToken'),
          },
        }
      );

      console.log('edditing successful', edited.data.data);
      toast.success('edited successfully', { autoClose: 2000 });
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleDraftSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axiosJWT.post(
        `http://localhost:5000/api/user/project/draft/${id}`,
        formData,
        {
          headers: {
            'content-type': 'application/json',
            access_token: localStorage.getItem('accessToken'),
          },
        }
      );
      console.log(data.data);
      navigate('/drafts/table');
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDraftToBeEdited();
  }, []);
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
          <Form onSubmit={handleSubmit}>
            <InputC>
              <InputField>
                <label>First Name </label>
                <Input
                  id="firstName"
                  type="string"
                  name="firstName"
                  value={draftDetail.firstName}
                  onChange={handleChange}
                />
              </InputField>
              <InputField>
                <label>Last Name </label>
                <Input
                  id="lastName"
                  type="string"
                  name="lastName"
                  value={draftDetail.lastName}
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
                  value={draftDetail.email}
                  onChange={handleChange}
                />
              </InputField>
            </InputC>
            <InputC>
              <InputField>
                <label>Telegram Username</label>
                <Input
                  id="telegramUsername"
                  type="string"
                  name="telegramUsername"
                  value={draftDetail.telegramUsername}
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
                  value={draftDetail.fullTimeWorker}
                  onChange={handleChange}
                />
              </InputField>
            </InputC>
            <InputC>
              <InputField>
                <label>Team Experience</label>
                <Input
                  id="teamExperience"
                  type="string"
                  name="teamExperience"
                  value={draftDetail.teamExperience}
                  onChange={handleChange}
                />
              </InputField>
            </InputC>
            <InputC>
              <InputField>
                <label>Linkedin Profiles</label>
                <Input
                  id="linkedinProfiles"
                  type="string"
                  name="linkedinProfiles"
                  value={draftDetail.linkedinProfiles}
                  onChange={handleChange}
                />
              </InputField>
            </InputC>
            <InputC>
              <InputField>
                <label>website URL</label>
                <Input
                  id="websiteUrl"
                  type="string"
                  name="websiteUrl"
                  value={draftDetail.websiteUrl}
                  onChange={handleChange}
                />
              </InputField>
            </InputC>
            <InputC>
              <InputField>
                <label>Country</label>
                <Options
                  id="country"
                  type="string"
                  name="country"
                  value={draftDetail.country}
                  onChange={handleChange}
                >
                  <option value="" hidden>
                    Select country
                  </option>
                  <option value="layout 1">Nepal</option>
                  <option value="layout 2">China</option>
                  <option value="layout 3">France</option>
                  <option value="layout 4">India</option>
                  <option value="layout 5">Korea</option>
                  <option value="layout 6">Thailand</option>
                  <option value="other">other</option>
                </Options>
              </InputField>

              <InputField>
                <label>City</label>
                <Input
                  id="city"
                  type="string"
                  name="city"
                  value={draftDetail.city}
                  onChange={handleChange}
                />
              </InputField>
            </InputC>

            <InputC>
              <InputField>
                <label>Project Name</label>
                <Input
                  id="projectName"
                  type="string"
                  name="projectName"
                  value={draftDetail.projectName}
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
                  value={draftDetail.description}
                  onChange={handleChange}
                />
              </InputField>
            </InputC>
            <InputC>
              <InputField>
                <label>Project Type</label>
                <Input
                  id="projectType"
                  type="string"
                  name="projectType"
                  value={draftDetail.projectType}
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
                  value={draftDetail.projectVision}
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
                  value={draftDetail.additionalInfo}
                  onChange={handleChange}
                />
              </InputField>
            </InputC>

            <InputC>
              {!id && (
                <InputField>
                  <Button type="submit" onClick={handleSubmit}>
                    Submit
                  </Button>
                </InputField>
              )}

              {id && (
                <InputField>
                  <Button type="submit" onClick={handleDraftSubmit}>
                    Submit
                  </Button>
                </InputField>
              )}

              {id && (
                <InputField>
                  <Button type="submit" onClick={handleEdit}>
                    Edit
                  </Button>
                </InputField>
              )}
              <InputField>
                <Button type="submit" onClick={handleSave}>
                  Save
                </Button>
              </InputField>
            </InputC>
          </Form>
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
  color: black;
  top: 0;
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
`;
const Form = styled.form`
  padding: 30px;
  background-color: #fdf7ff;
  display: flex;
  flex-direction: column;
  display: block;
  box-sizing: border-box;
  width: 800px;
  padding-bottom: 20px;
  margin-bottom: 50px;
  label {
    color: black;
  }
  @media screen and (max-width: 998px) {
    display: flex;
    flex-direction: column;
    width: 80%;
    margin: auto;
    margin-bottom: 40px;
  }
`;
const Button = styled.button`
  padding: 5px 10px;
  background-color: black;
  border: none;
  border-radius: 5px;
  height: 40px;
  width: 100px;
  color: white;
  font-size: 15px;
  font-weight: bold;
  cursor: pointer;
  @media screen and (max-width: 998px) {
    display: flex;
    height: 30px;
    width: 80px;
    justify-content: center;
    align-items: center;
  }
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
  padding-bottom: 30px;
  label {
    font-size: 20px;
    padding-bottom: 5px;
  }
`;
const Input = styled.input`
  height: 50px;
  padding: 5px;
  border-radius: 3px;
  border: none;
  background-color: white;
  color: black;
  font-size: 18px;

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
    display: flex;
    flex-direction: column;
    width: 100%;
    margin: auto;
  }
`;
const Options = styled.select`
  height: 0px;
  padding: 10px;
  border-radius: 3px;
  border: none;
  background-color: white;
  color: black;
  font-size: 18px;
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
  color: black;
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
