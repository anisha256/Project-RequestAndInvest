import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import avatar from '../assets/1.png';
// import Editor from 'ckeditor5-custom-build/build/ckeditor';
// import { CKEditor } from '@ckeditor/ckeditor5-react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

const Feed = () => {
  const [user, setUser] = useState(localStorage.getItem('username'));
  const [data, setData] = useState('');
  const [grantedProjects, setGrantedProjects] = useState([]);
  const handleCkeditorState = async (e, editor) => {
    setData(editor.getData());
    console.log(data);
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
          {/* <CKEditor
            config={{
              ckfinder: {
                uploadUrl: 'http://localhost:5000/api/file/upload',
              },
            }}
            editor={Editor}
            onReady={() => {
              console.log('Editor is ready to use!');
            }}
            onChange={handleCkeditorState}
          /> */}

          {/* <CenterPost> */}
          {/* <span>Create Post</span> */}

          {/* <ButtonDiv>
              <ButtonI type="submit">
                <FiSend />
              </ButtonI>
              <ButtonC type="reset">
                <FiX />
              </ButtonC>
            </ButtonDiv>
          </CenterPost> */}
        </CenterDiv>
      </Center>
      <RightSide>
        <Title>
          <h1>Congratulations !!!</h1>
          <p>GRANTED PROJECTS</p>
        </Title>
        {grantedProjects
          .reverse()
          .slice(0, 3)
          .map((grantProject) => {
            return (
              <Projects key={grantProject._id}>
                <Content>
                  <h3>Country</h3>
                  <p>{grantProject.country}</p>
                </Content>
                <Content>
                  <h3>ProjectName</h3>
                  <p>{grantProject.projectName}</p>
                </Content>

                <Content>
                  <h3>Team Lead</h3>
                  <p>
                    {grantProject.firstName}
                    {grantProject.lastName}
                  </p>
                </Content>
              </Projects>
            );
          })}
      </RightSide>
    </Container>
  );
};

export default Feed;
const Container = styled.div`
  min-height: 100vh;
  display: grid;
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
const RightSide = styled.section`
  display: grid;
  grid-column: 3/4;
  height: 100%;
  gap: 20px;
  @media screen and (max-width: 998px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
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

const CenterPost = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  border: 1px solid black;
  padding: 20px;

  @media screen and (max-width: 998px) {
    display: flex;
  }
`;
const Title = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* height: 100px; */
  border-bottom: 2px solid white;
  box-shadow: 10px 10px 24px -7px rgba(46, 38, 64, 0.3);
  -webkit-box-shadow: 10px 10px 24px -7px rgba(46, 38, 64, 0.3);
  -moz-box-shadow: 10px 10px 24px -7px rgba(46, 38, 64, 0.3);
  @media screen and (max-width: 998px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

const Projects = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid white;
  padding: 20px;
  background-color: #fffade;
  height: 200px;
  @media screen and (max-width: 998px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  p {
    color: #564480;
  }
`;

const ButtonDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;

  /* align-items: center; */
  gap: 5px;
  font-size: 10px;
`;
const ButtonC = styled.button`
  background-color: transparent;
  border: none;
  color: #564480;
  border-radius: 5px;
  font-size: 30px;
  padding: 5px;
  cursor: pointer;
`;
const ButtonI = styled.button`
  background-color: transparent;
  border: none;
  color: #564480;

  border-radius: 5px;
  font-size: 25px;
  padding: 5px;
  cursor: pointer;
`;
