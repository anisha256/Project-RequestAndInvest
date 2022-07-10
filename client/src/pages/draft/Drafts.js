import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { FiX, FiSend } from 'react-icons/fi';
import styled from 'styled-components';
import avatar from '../../assets/1.png';
import axios from 'axios';
import Spinner from '../../components/Spinner';

const Drafts = () => {
  const [draftLists, setDraftLists] = useState([]);
  const id = localStorage.getItem('_id');
  const [loading, setLoading] = useState(true);

  const fetchDrafts = async () => {
    const { data } = await axios.get(
      `http://localhost:5000/api/user/project/drafts/${id}`,
      {
        headers: {
          'content-type': 'application/json',
          access_token: localStorage.getItem('accessToken'),
        },
      }
    );
    setDraftLists(data.data);
    setLoading(false);
    console.log(draftLists);
  };

  useEffect(() => {
    fetchDrafts();
  }, []);

  return (
    <>
      {loading && <Spinner />}
      <Container>
        <LeftSide>
          <Avatar>
            <Avatarmenu>
              <Photo src={avatar} />
              <p>{draftLists.email}</p>
            </Avatarmenu>
            <Menu>
              <MenuBox>
                <NavLink to={'/drafts'}>Drafts</NavLink>
              </MenuBox>
              <MenuBox>
                <NavLink to={'/drafts/table'}>DraftTable</NavLink>
              </MenuBox>
              <MenuBox>
                <NavLink to={'/profile'}>Profile</NavLink>
              </MenuBox>
              <MenuBox>
                <NavLink to={'/apply/project'}>Apply</NavLink>
              </MenuBox>
            </Menu>
          </Avatar>
        </LeftSide>
        <Center>
          {!loading &&
            draftLists.map((draftList) => {
              return (
                <Draft key={draftList._id}>
                  <DraftContent>
                    <ItemCont>
                      <Item>
                        <label>First Name </label>
                        <p>{draftList.firstName}</p>
                      </Item>
                      <Item>
                        <label>Last Name </label>
                        <p>{draftList.lastName}</p>
                      </Item>
                    </ItemCont>
                    <label>Email</label>
                    <p>{draftList.email}</p>
                    <label>Telegram Username</label>
                    <p>{draftList.telegramUsername}</p>
                    <label>Number of fulltime Worker</label>
                    <p>{draftList.fullTimeWorker}</p>
                    <label>Team Experience</label>
                    <p>{draftList.teamExperience}</p>
                    <label>Linkedin Profiles</label>
                    <p>{draftList.linkedinProfiles}</p>
                    <label>website URL</label>
                    <p>{draftList.websiteUrl}</p>
                    <ItemCont>
                      <Item>
                        <label>Country</label>
                        <p>{draftList.country}</p>
                      </Item>
                      <Item>
                        <label>City</label>
                        <p>{draftList.city}</p>
                      </Item>
                    </ItemCont>
                    <ItemCont>
                      <Item>
                        <label>Project Name</label>
                        <p>{draftList.projectName}</p>
                      </Item>
                      <Item>
                        <label>Project Type</label>
                        <p>{draftList.projectType}</p>
                      </Item>
                    </ItemCont>
                    <label>Description</label>
                    <p>{draftList.description}</p>

                    <label>Project Vision</label>
                    <p>{draftList.projectVision}</p>
                    <label>Additional Information</label>
                    <p>{draftList.additionalInfo}</p>
                  </DraftContent>
                </Draft>
              );
            })}
        </Center>
        <RightSide>
          {/* <Title>
            <ButtonDiv>
              <ButtonI type="submit">
                <FiSend />
              </ButtonI>
              <ButtonC type="reset">
                <FiX />
              </ButtonC>
            </ButtonDiv>
          </Title> */}
        </RightSide>
      </Container>
    </>
  );
};

export default Drafts;
const DraftContent = styled.div`
  display: flex;
  flex-direction: column;
`;
const ItemCont = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const Item = styled.div``;
const Draft = styled.div`
  display: flex;
  padding: 40px;
  box-shadow: 10px 10px 24px -7px rgba(46, 38, 64, 0.3);
  -webkit-box-shadow: 10px 10px 24px -7px rgba(46, 38, 64, 0.3);
  -moz-box-shadow: 10px 10px 24px -7px rgba(46, 38, 64, 0.3);

  label {
    font-weight: bolder;
    font-size: 17px;
    padding-bottom: 10px;
    color: #2e2346;
  }
  p {
    padding-bottom: 10px;
    color: #2e2346;
  }

  @media screen and (max-width: 998px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    min-width: 400px;
  }
`;
const Center = styled.section`
  display: grid;
  grid-column: 2/3;
  height: 100%;
  margin-top: 30px;
  border-left: 1px solid white;
  border-right: 1px solid white;
  padding: 0px 40px;
  @media screen and (max-width: 998px) {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;
const Title = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 3.5fr 1.7fr;

  @media screen and (max-width: 998px) {
    display: flex;
    flex-direction: column;
  }
`;
const LeftSide = styled.section`
  display: grid;
  grid-column: 1/2;
  /* border: 1px solid white; */
  @media screen and (max-width: 998px) {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
    margin: 0px 10px;
  }
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
  height: 100px;
  gap: 20px;
  @media screen and (max-width: 998px) {
    display: flex;
    flex-direction: column;
  }
`;
const ButtonDiv = styled.div`
  display: flex;
  flex-direction: row;
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
