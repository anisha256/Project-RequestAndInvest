import React from 'react';
import styled from 'styled-components';
import home from '../assets/home.png';

const Home = () => {
  return (
    <HomeContainer>
      <Photo1 src={home} />
    </HomeContainer>
  );
};

export default Home;
const Photo1 = styled.img``;

const HomeContainer = styled.div`
  flex: 4;
  /* background-image: linear-gradient(
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
  ); */
`;
