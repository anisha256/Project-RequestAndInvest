import React, { useState, useEffect } from 'react';
import { NavLink, useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import avatar from '../../assets/1.png';
import axios from 'axios';
import Spinner from '../../components/Spinner';
import { BiEditAlt } from 'react-icons/bi';

const DraftDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [detail, setDetail] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDraftDetailById = async () => {
    try {
      const { data } = await axios.get(
        `https://reziii.herokuapp.com/api/admin/project/${id}/get`,
        {
          headers: {
            'content-type': 'application/json',
          },
        }
      );
      setDetail(data.data);
      setLoading(false);
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
      {loading && <Spinner />}
      <Container>
        <LeftSide>
          <Avatar>
            <Avatarmenu>
              <Photo src={avatar} />
            </Avatarmenu>
            <Menu>
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
        {/* <RightSide></RightSide> */}
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
  background-color: #2e2346;

  &:hover {
    background-color: white;
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
  grid-column: 2/3;
  height: calc(100vh - 60px);
  border-left: 1px solid white;
  border-right: 1px solid white;

  @media screen and (max-width: 998px) {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 3.5fr;
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
// const RightSide = styled.section`
//   display: grid;
//   grid-column: 3/4;
//   height: 100px;
//   gap: 20px;
//   @media screen and (max-width: 998px) {
//     display: flex;
//     flex-direction: column;
//   }
// `;
