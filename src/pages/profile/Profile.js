import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { FaUserEdit } from 'react-icons/fa';
import axios from 'axios';
import dayjs from 'dayjs';
import jwt_decode from 'jwt-decode';
import { getUserId } from '../../components/Constants';
import EditProfile from './EditProfile';
import { NavLink, useNavigate } from 'react-router-dom';
import avatar from '../../assets/1.png';
//create new axios instance
export const axiosJWT = axios.create();

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(localStorage.getItem('username'));
  const [data, setData] = useState('');
  const [grantedProjects, setGrantedProjects] = useState([]);
  const id = getUserId();
  const [profileData, setProfileData] = useState([]);

  const [show, setShow] = useState(false);

  const access_token = localStorage.getItem('accessToken');

  axiosJWT.interceptors.response.use(
    async (config) => {
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
    },
    (error) => {
      return Promise.reject(error);
    }
  );
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
      <LeftSide>
        <Avatar>
          <Avatarmenu>
            <Photo src={avatar} />
            <p>{user}</p>
          </Avatarmenu>
          <Menu>
            <MenuBox>
              <NavLink to={'/drafts'}>Drafts</NavLink>
            </MenuBox>
            <MenuBox>
              <NavLink to={'/drafts/table'}>DraftTable</NavLink>
            </MenuBox>
            <MenuBox>
              <NavLink to={'/old/profile'}>Profile</NavLink>
            </MenuBox>
            <MenuBox>
              <NavLink to={'/apply/project'}>Apply</NavLink>
            </MenuBox>
          </Menu>
        </Avatar>
      </LeftSide>
      <Center>
        <CenterDiv>
          <UserIntro>
            <Left>
              <h1>User</h1>
              <span>{profileData.email}</span>

              <span>
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
            <h1>Profile</h1>
            <p>Your personal information</p>
          </Content>
          <Combined>
            <Information>
              <Title>
                <h1>Personal Information</h1>
                <Edit onClick={handleEdit}>
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
                <h1>Deactivate User</h1>
              </DContent>

              <ButtonC>
                <p>You can deactivate ur account</p>

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
  min-height: 100vh;
  display: grid;
  /* grid-template-columns: 1fr 5.95fr; */
  grid-template-columns: 1fr 3.5fr 1.7fr;

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
  @media screen and (max-width: 998px) {
    display: flex;
    flex-direction: column;
  }
`;
const LeftSide = styled.section`
  display: grid;
  grid-column: 1/2;
  height: 100%;
  /* border: 1px solid white; */
  @media screen and (max-width: 998px) {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
    margin: 0px 10px;
  }
`;
const Center = styled.section`
  display: grid;
  grid-column: 2/3;
  height: 100%;
  border-left: 1px solid white;
  border-right: 1px solid white;
`;

const Avatar = styled.div`
  display: grid;
  justify-content: center;
  height: 150px;
  align-items: center;
  @media screen and (max-width: 998px) {
    display: flex;
    flex-direction: wrap;
    justify-content: space-between;
    align-items: center;
  }
`;
const Photo = styled.img`
  height: 60px;
  width: 60px;
  border-radius: 30px;
  cursor: pointer;
`;
const Avatarmenu = styled.div`
  padding: 10px 0px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media screen and (max-width: 998px) {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
  }
`;
const Menu = styled.div`
  padding: 10px 0px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: 20px;
  @media screen and (max-width: 998px) {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
    column-gap: 10px;
  }
`;
const MenuBox = styled.div`
  height: 60px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #564480;

  @media screen and (max-width: 998px) {
    display: flex;
    flex-direction: row;
  }
`;

const CenterDiv = styled.div`
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  /* align-items: center; */
  margin: 40px;
  @media screen and (max-width: 998px) {
    display: flex;
    flex-direction: column;
  }
`;
const UserIntro = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  height: 200px;
  width: 700px;
  /* border: 1px solid lightgray; */
  padding-left: 40px;
  margin-top: 10px;
  @media screen and (max-width: 1080px) {
    width: 400px;
    padding: 2px;
  }
`;
const Right = styled.section`
  /* border: 1px solid black; */
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 1080px) {
    width: 30%;
  }
`;
const PhotoP = styled.img`
  height: 100px;
  width: 100px;
  border-radius: 50px;
`;
const Left = styled.section`
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  padding: 20px 0px;
  @media screen and (max-width: 1080px) {
    width: 60%;
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
  border: 1px solid #564480;
  /* border: 1px solid #e8d5b5; */
  box-shadow: 10px 10px 24px -7px rgba(46, 38, 64, 0.3);
  -webkit-box-shadow: 10px 10px 24px -7px rgba(46, 38, 64, 0.3);
  -moz-box-shadow: 10px 10px 24px -7px rgba(46, 38, 64, 0.3);

  @media screen and (max-width: 1080px) {
    width: 60%;
  }
`;
const Title = styled.section`
  height: 50px;
  display: flex;
  align-items: center;
  border-bottom: 2px solid #564480;
  /* border-bottom: 2px solid #e8d5b5; */
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const Settings = styled.section`
  display: flex;
  padding-left: 10px;
  flex-direction: column;
  border: 1px solid #564480;
  /* border: 1px solid #e8d5b5; */
  box-shadow: 10px 10px 24px -7px rgba(46, 38, 64, 0.3);
  -webkit-box-shadow: 10px 10px 24px -7px rgba(46, 38, 64, 0.3);
  -moz-box-shadow: 10px 10px 24px -7px rgba(46, 38, 64, 0.3);

  @media screen and (max-width: 1080px) {
    width: 60%;
  }
`;
const Content = styled.section`
  padding-left: 10px;
`;
const DContent = styled.section`
  height: 50px;
  display: flex;
  align-items: center;
  border-bottom: 2px solid #1a102f;
  /* border-bottom: 2px solid #e8d5b5; */
`;
const Combined = styled.div`
  width: 800px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  row-gap: 20px;
  @media screen and (max-width: 1080px) {
    width: 550px;
    flex-direction: column;
  }
`;
const Feature = styled.div``;
const ButtonC = styled.section`
  padding: 20px 0px;
`;
const Button = styled.button`
  padding: 5px 10px;
  background-color: red;
  border: none;
  border-radius: 5px;
  height: 40px;
  width: 100px;
  color: white;
  font-size: 15px;
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
