import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import dayjs from 'dayjs';
import jwt_decode from 'jwt-decode';

import { FaUserEdit } from 'react-icons/fa';
import { getUserId } from '../../components/Constants';
import EditProfile from './EditProfile';
import avatar from '../../assets/1.png';
//create new axios instance
export const axiosJWT = axios.create();

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(localStorage.getItem('username'));
  const [grantedProjects, setGrantedProjects] = useState([]);
  const id = getUserId();
  const [profileData, setProfileData] = useState([]);

  const [show, setShow] = useState(false);

  const access_token = localStorage.getItem('accessToken');

  axiosJWT.interceptors.response.use(async (config) => {
    const user = jwt_decode(localStorage.getItem('accessToken'));
    const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;
    console.log(isExpired);
    if (!isExpired) return config;
    const { data } = await axios.get('http://localhost:5000/api/refresh', {
      headers: {
        'content-type': 'application/json',
        refresh_token: localStorage.getItem('refreshToken'),
      },
    });
    const { accessToken } = data.data;
    console.log('newaccessToken', accessToken);
    localStorage.setItem('accessToken', accessToken);

    config.headers.access_token = accessToken;

    return config;
  });
  const getProfileData = async () => {
    console.log('getprofile api');
    try {
      const { data } = await axiosJWT.get(
        `http://localhost:5000/api/user/${id}/profile`,
        {
          headers: {
            'content-type': 'application/json',
            access_token: access_token,
          },
        }
      );

      setProfileData(data.data);
    } catch (error) {}
  };
  const handleEdit = async () => {
    setShow(true);
    console.log('clicked edit');
  };
  const handleDeactivate = async () => {
    console.log(profileData.isDeactivated);

    try {
      if (profileData.isDeactivated === false) {
        await axiosJWT.post(`http://localhost:5000/api/${id}/deactivate`, {
          headers: {
            'content-type': 'application/json',
            access_token: localStorage.getItem('accessToken'),
          },
        });
        // toast.success('Your id is deactivated', { autoClose: 2000 });
      }
      localStorage.removeItem('refreshToken');
      navigate('/login');
    } catch (error) {}
  };
  const fetchGrantedProjects = async () => {
    try {
      const { data } = await axios.get(
        'http://localhost:5000/api/admin/project/lists/accepted',
        {
          headers: {
            'content-type': 'application/json',
          },
        }
      );
      console.log(data.data);
      setGrantedProjects(data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getProfileData();

    fetchGrantedProjects();
  }, []);

  return (
    <Container>
      <Center>
        <CenterDiv>
          <UserIntro>
            <Left>
              <h1 style={{ color: '#2e2346' }}>User</h1>
              <span style={{ color: '#2e2346' }}>{profileData.email}</span>

              <span style={{ color: '#2e2346' }}>
                joined on{' '}
                {profileData.createdAt
                  ? `${profileData.createdAt.slice(0, 10)}`
                  : '-'}{' '}
              </span>
            </Left>
            <Right>
              <PhotoP src={avatar} />
            </Right>
          </UserIntro>
          <Content>
            <h1 style={{ color: '#2e2346' }}>Profile</h1>
            <p style={{ color: '#2e2346' }}>Your personal information</p>
          </Content>
          <Combined>
            <Information>
              <Title>
                <h1 style={{ color: '#2e2346' }}>Personal Information</h1>
                <Edit onClick={handleEdit} style={{ color: '#2e2346' }}>
                  <FaUserEdit />
                </Edit>
              </Title>
              <Feature>
                <span>Avatar:</span>
              </Feature>
              <Feature>
                <span>Email:</span>
                <p>{profileData.email}</p>
              </Feature>
              <Feature>
                <span>Username:</span>
                <p>{profileData.username}</p>
              </Feature>
              <Feature>
                <span>Last Update:</span>

                <p>
                  {profileData.updatedAt
                    ? `${profileData.updatedAt.slice(0, 10)}`
                    : '-'}{' '}
                </p>
              </Feature>
            </Information>

            <Settings>
              <DContent>
                <h1 style={{ color: '#2e2346' }}>Deactivate User</h1>
              </DContent>

              <ButtonC>
                <p style={{ color: '#2e2346' }}>
                  You can deactivate ur account
                </p>

                <Button onClick={handleDeactivate}>Deactivate</Button>
              </ButtonC>
            </Settings>
          </Combined>
          <EditProfile
            show={show}
            setShow={setShow}
            profileData={profileData}
            setProfileData={setProfileData}
            axiosJWT={axiosJWT}
            id={id}
          />
        </CenterDiv>
      </Center>
    </Container>
  );
};

export default Profile;

const Container = styled.div`
  display: grid;
  min-height: calc(100vh - 60px);
  grid-template-columns: 1fr 3.5fr 1.7fr;
  background-image: linear-gradient(
    to right bottom,
    #f9e7fe,
    #ffe6f3,
    #ffe7e6,
    #ffeadd,
    #fdefda
  );
  @media screen and (max-width: 998px) {
    display: flex;
    flex-direction: column;
  }
`;

const Center = styled.section`
  display: grid;
  grid-column: 1/3;
  height: 100%;
`;

const CenterDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin: 40px;
  row-gap: 40px;
  @media screen and (max-width: 998px) {
    margin: 20px;
    display: flex;
    flex-direction: column;
  }
`;
const UserIntro = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  font-size: 20px;
  height: 200px;
  width: 40%;
  padding-left: 20px;
  @media screen and (max-width: 998px) {
    width: 90%;
    margin: auto;
  }
`;
const Right = styled.section`
  /* border: 1px solid black; */
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  /* border: 1px solid black; */
  @media screen and (max-width: 998px) {
    width: 100%;
  }
`;
const PhotoP = styled.img`
  height: 80px;
  width: 80px;
  border-radius: 50px;
  /* border: 1px solid black; */
`;
const Left = styled.section`
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  width: 100%;

  @media screen and (max-width: 998px) {
    width: 100%;
    padding-left: 0px;
  }
`;

//profile info
const Information = styled.section`
  display: flex;
  flex-direction: column;
  height: 300px;
  padding-left: 10px;
  justify-content: space-between;
  padding-bottom: 5px;
  background-color: #fdf7ff;
  box-shadow: 10px 10px 24px -7px rgba(46, 38, 64, 0.3);
  -webkit-box-shadow: 10px 10px 24px -7px rgba(46, 38, 64, 0.3);
  -moz-box-shadow: 10px 10px 24px -7px rgba(46, 38, 64, 0.3);
  @media screen and (max-width: 998px) {
    width: 90%;
    margin: auto;
  }
`;
const Title = styled.section`
  height: 50px;
  display: flex;
  font-size: 20px;
  align-items: center;
  border-bottom: 3px solid black;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const Settings = styled.section`
  display: flex;
  flex-direction: column;
  box-shadow: 10px 10px 24px -7px rgba(46, 38, 64, 0.3);
  -webkit-box-shadow: 10px 10px 24px -7px rgba(46, 38, 64, 0.3);
  -moz-box-shadow: 10px 10px 24px -7px rgba(46, 38, 64, 0.3);
  p {
    font-size: 20px;
    padding-bottom: 10px;
  }

  @media screen and (max-width: 998px) {
    width: 90%;
    margin: auto;
  }
`;
const Content = styled.section`
  font-size: 20px;
  padding-left: 10px;
  @media screen and (max-width: 998px) {
    width: 87%;
    margin: auto;
    padding-left: 5px;
  }
`;
const DContent = styled.section`
  font-size: 20px;
  height: 50px;
  display: flex;
  align-items: center;
  border-bottom: 3px solid #1a102f;
  background-color: #fdf7ff;
  padding-left: 10px;
  /* border-bottom: 2px solid #e8d5b5; */
`;
const Combined = styled.div`
  width: 800px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  row-gap: 70px;
  @media screen and (max-width: 998px) {
    width: 100%;
    flex-direction: column;
  }
`;
const Feature = styled.div`
  span {
    color: #2e2346;
    font-size: 20px;
  }
  p {
    color: #2e2346;
    font-size: 18px;
  }
`;
const ButtonC = styled.section`
  padding: 20px 0px;
  background-color: #fdf7ff;
  padding-left: 10px;
`;
const Button = styled.button`
  padding: 5px 10px;
  background-color: red;
  border: none;
  border-radius: 5px;
  height: 40px;
  width: 100px;
  color: white;
  font-size: 18px;
  font-weight: bolder;
  cursor: pointer;
`;
const Edit = styled.section`
  color: white;
  font-size: 25px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-right: 10px;
  cursor: pointer;
`;
