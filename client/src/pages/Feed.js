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
    </Container>
  );
};

export default Feed;
const Container = styled.div`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 1fr 3.5fr 1.7fr;

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
  @media screen and (max-width: 998px) {
    display: flex;
    flex-direction: column;
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
    width: 100%;
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
    align-items: flex-start;
    width: 80%;
    border-radius: 10px;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  p {
    color: #564480;
  }
`;
