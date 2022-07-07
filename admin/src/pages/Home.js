import React from 'react';
import styled from 'styled-components';

const Home = () => {
  return <HomeContainer>Home</HomeContainer>;
};

export default Home;

const HomeContainer = styled.div`
  flex: 4;
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
`;
