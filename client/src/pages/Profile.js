import React, { useState } from 'react';
import styled from 'styled-components';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import avatar from '../assets/1.png';

const Profile = () => {
  return (
    <MainContainer>
      <Container>
        <UserIntro>
          <Left>
            <h1>User</h1>
            <span>1aanisha.rai@gmail.com</span>
            <span>joined on July 14 </span>
          </Left>
          <Right>
            <Photo src={avatar} />
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
            </Title>
            <Feature>
              <span>Avatar:</span>
              <p>1aaniaha.rai@gmail.com</p>
            </Feature>
            <Feature>
              <span>Email:</span>
            </Feature>
            <Feature>
              <span>Password:</span>
            </Feature>
            <Feature>
              <span>Linkedin:</span>
            </Feature>
          </Information>

          <Settings>
            <DContent>
              <h1>Deactivate User</h1>
            </DContent>

            <ButtonC>
              <p>You can deactivate ur account</p>

              <Button>Deactivate</Button>
            </ButtonC>
          </Settings>
        </Combined>
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
    </MainContainer>
  );
};

export default Profile;
const MainContainer = styled.div`
  color: #564480;
  min-height: 100vh;
  display: grid;
  grid-template-columns: 60px 4fr 60px;
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
  @media screen and (max-width: 1080px) {
    grid-template-columns: 40px 4fr 40px;
  }
`;
const Container = styled.div`
  display: grid;
  grid-column: 2/3;
  color: #33225b;
  row-gap: 20px;
  margin-bottom: 30px;
`;
const UserIntro = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  height: 200px;
  width: 700px;
  /* border: 1px solid lightgray; */
  padding-left: 40px;
  margin-top: 100px;
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
const Photo = styled.img`
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

  @media screen and (max-width: 1080px) {
    width: 60%;
  }
`;
const Title = styled.section`
  height: 50px;
  display: flex;
  align-items: center;
  border-bottom: 2px solid #564480;
`;
const Settings = styled.section`
  display: flex;
  padding-left: 10px;
  flex-direction: column;

  border: 1px solid #564480;
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
  @media screen and (max-width: 1080px) {
    width: 60%;
  }
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
  padding-top: 20px;
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