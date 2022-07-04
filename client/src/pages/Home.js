import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import invest from '../assets/1.png';
import {
  FaInstagram,
  FaFacebookSquare,
  FaFacebookMessenger,
} from 'react-icons/fa';
const Home = () => {
  return (
    <Container>
      <Section1>
        <Title>
          <p>IDEAS, PROPOSAL && INVESTMENTS</p>
        </Title>
        <Photo1>{/* <Photo src={invest} /> */}</Photo1>
        <LogoSection>
          <Logos>
            <FaFacebookSquare />
            <FaInstagram />
            <FaFacebookMessenger />
          </Logos>
        </LogoSection>
      </Section1>

      <Section2>
        <Photo1>
          <Photo src={invest} />
        </Photo1>
        section1
        <Link to="/form">Form</Link>
      </Section2>
    </Container>
  );
};

export default Home;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 50px;
`;
const Photo1 = styled.div`
  height: 200px;
  width: 200px;
  display: grid;
  /* grid-row: 3/4; */
`;
const Photo = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
  display: flex;
  justify-content: center;
`;
const Title = styled.section`
  display: grid;
  grid-row: 2/3;
  height: 100px;
  width: 500px;
  background-color: #564480;

  p {
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    font-size: larger;
  }
  @media screen and (max-width: 1080px) {
    p {
      color: white;
      display: flex;
      flex-direction: column;
      justify-content: center;
      text-align: center;
      font-size: larger;
    }
  }
`;
const Logos = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-end;
  column-gap: 20px;
  font-size: 25px;
  padding-right: 20px;
  padding-bottom: 5px;
`;
const LogoSection = styled.div`
  display: grid;
  grid-row: 4/5;
  color: white;
  justify-content: flex-end;
  align-items: flex-end;
`;
const Section1 = styled.section`
  /* border: 1px solid white; */
  min-height: 700px;
  color: #564480;
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
  display: grid;
  grid-template-rows: 150px 2.4fr 1.1fr 2fr;
  justify-content: flex-end;
  @media screen and (max-width: 1080px) {
    grid-template-rows: 80px 2.4fr 1.1fr 2fr;
  }
`;
const Section2 = styled.section``;
