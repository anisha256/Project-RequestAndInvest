import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import { BiEditAlt } from 'react-icons/bi';

const DraftDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [detail, setDetail] = useState([]);

  const fetchDraftDetailById = async () => {
    try {
      const { data } = await axios.get(`/api/admin/project/${id}/get`, {
        headers: {
          'content-type': 'application/json',
        },
      });
      setDetail(data.data);
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleEdit = () => {
    navigate(`/draft/${id}/edit`);
  };

  useEffect(() => {
    fetchDraftDetailById();
  }, []);

  return (
    <>
      <Container>
        <Center>
          <Draft>
            <Edit onClick={() => handleEdit()}>
              <Item>
                <h4>Edit</h4>
              </Item>
              <BiEditAlt />
            </Edit>
            <DraftContent>
              <ItemCont>
                <Item>
                  <label>First Name </label>
                  <p>{detail.firstName}</p>
                </Item>
                <Item>
                  <label>Last Name </label>
                  <p>{detail.lastName}</p>
                </Item>
              </ItemCont>
              <label>Email</label>
              <p>{detail.email}</p>
              <label>Telegram Username</label>
              <p>{detail.telegramUsername}</p>
              <label>Number of fulltime Worker</label>
              <p>{detail.fullTimeWorker}</p>
              <label>Team Experience</label>
              <p>{detail.teamExperience}</p>
              <label>Linkedin Profiles</label>
              <p>{detail.linkedinProfiles}</p>
              <label>website URL</label>
              <p>{detail.websiteUrl}</p>
              <ItemCont>
                <Item>
                  <label>Country</label>
                  <p>{detail.country}</p>
                </Item>
                <Item>
                  <label>City</label>
                  <p>{detail.city}</p>
                </Item>
              </ItemCont>
              <ItemCont>
                <Item>
                  <label>Project Name</label>
                  <p>{detail.projectName}</p>
                </Item>
                <Item>
                  <label>Project Type</label>
                  <p>{detail.projectType}</p>
                </Item>
              </ItemCont>
              <label>Description</label>
              <p>{detail.description}</p>
              <label>Project Vision</label>
              <p>{detail.projectVision}</p>
              <label>Additional Information</label>
              <p>{detail.additionalInfo}</p>
            </DraftContent>
          </Draft>
        </Center>
        {/* <RightSide>
          <Title>
            <h1>Congratulations !!!</h1>
            <p>GRANTED PROJECTS</p>
          </Title>
          {grantedProjects.slice(0, 3).map((grantProject) => {
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
       */}
      </Container>
    </>
  );
};

export default DraftDetail;
const Edit = styled.button`
  height: 30px;
  width: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 6px;
  cursor: pointer;
  background-color: white;

  &:hover {
  }
`;
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
  flex-direction: column;
  justify-content: space-between;
  padding: 40px;
  box-shadow: 10px 10px 24px -7px rgba(46, 38, 64, 0.3);
  -webkit-box-shadow: 10px 10px 24px -7px rgba(46, 38, 64, 0.3);
  -moz-box-shadow: 10px 10px 24px -7px rgba(46, 38, 64, 0.3);
  width: 80%;
  margin: auto;
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
    /* min-width: 400px; */
  }
`;
const Center = styled.section`
  display: grid;
  grid-column: 1/2;
  height: calc(100vh - 60px);
  background-color: white;

  @media screen and (max-width: 998px) {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 3.5fr 1.7fr;
  min-height: calc(100vh - 60px);
  @media screen and (max-width: 998px) {
    display: flex;
    flex-direction: column;
  }
`;
const RightSide = styled.section`
  display: grid;
  grid-column: 2/3;
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
