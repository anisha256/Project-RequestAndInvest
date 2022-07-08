import React from 'react';
import styled from 'styled-components';
import PersonIcon from '@mui/icons-material/Person';
import ArticleIcon from '@mui/icons-material/Article';
import ApartmentIcon from '@mui/icons-material/Apartment';

const Detail = () => {
  return (
    <DetailContainer>
      <DetailContent>
        <h1> Details</h1>

        <Title>
          <Left>
            <ApplicantDetails>
              <Icon>
                <h3>Applicant Details</h3>
                <PersonIcon />
              </Icon>

              <label>First Name </label>
              <p></p>
              <label>Last Name </label>
              <p></p>
              <label>Email</label>
              <p></p>
              <label>Telegram Username</label>
              <p></p>

              <label>Country</label>
              <p></p>
              <label>City</label>
              <p></p>
            </ApplicantDetails>
            <WorkplaceDetails>
              <Icon>
                <h3>Workplace Details</h3>
                <ApartmentIcon
                  style={{
                    color: '#2e2346',
                  }}
                />
              </Icon>
              <label>website URL</label>
              <p></p>

              <label>Number of fulltime Worker</label>
              <p></p>
              <label>Team Experience</label>
              <p></p>
              <label>Team Linkedin Profiles</label>
              <p></p>
            </WorkplaceDetails>
          </Left>
          <Right>
            <ProjectDetails>
              <Icon>
                <h3>Project Details</h3>
                <ArticleIcon
                  style={{
                    color: '#2e2346',
                  }}
                />
              </Icon>
              <label>Project Name</label>

              <p></p>
              <label>Project Type</label>
              <p></p>
              <label>Description</label>
              <p></p>

              <label>Project Vision</label>
              <p></p>
              <label>Additional Information</label>
              <p></p>
            </ProjectDetails>
          </Right>
        </Title>
      </DetailContent>
    </DetailContainer>
  );
};

export default Detail;
const Icon = styled.div`
  font-size: 20px;
  display: flex;
`;
const ProjectDetails = styled.div`
  display: flex;
  flex-direction: column;
  /* border: 1px solid black; */
  padding: 30px;

  h3 {
    font-size: 20px;
    padding-bottom: 20px;
    color: #2e2346;
  }
  label {
    font-size: 17px;
    padding-bottom: 10px;
    color: #2e2346;
  }
  p {
    padding-bottom: 30px;
    color: #2e2346;
  }
  box-shadow: 10px 10px 24px -7px rgba(46, 38, 64, 0.3);
  -webkit-box-shadow: 10px 10px 24px -7px rgba(46, 38, 64, 0.3);
  -moz-box-shadow: 10px 10px 24px -7px rgba(46, 38, 64, 0.3);
`;
const Right = styled.div`
  flex: 2;
  padding: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  /* border: 1px solid black; */
`;
const WorkplaceDetails = styled.div`
  flex-direction: column;
  padding: 20px;
  /* border: 1px solid black; */
  h3 {
    font-size: 20px;
    padding-bottom: 20px;
    color: #2e2346;
  }
  label {
    font-size: 18px;
    padding-bottom: 10px;
    color: #2e2346;
  }
  p {
    padding-bottom: 20px;
    color: #2e2346;
  }
  box-shadow: 10px 10px 24px -7px rgba(46, 38, 64, 0.3);
  -webkit-box-shadow: 10px 10px 24px -7px rgba(46, 38, 64, 0.3);
  -moz-box-shadow: 10px 10px 24px -7px rgba(46, 38, 64, 0.3);
`;
const ApplicantDetails = styled.div`
  flex: 1;
  flex-direction: column;
  /* border: 1px solid black; */
  padding: 20px;
  h3 {
    font-size: 20px;
    padding-bottom: 20px;
    color: #2e2346;
  }
  label {
    font-size: 18px;
    padding-bottom: 10px;
    color: #2e2346;
  }
  p {
    padding-bottom: 20px;
    color: #2e2346;
  }
  box-shadow: 10px 10px 24px -7px rgba(46, 38, 64, 0.3);
  -webkit-box-shadow: 10px 10px 24px -7px rgba(46, 38, 64, 0.3);
  -moz-box-shadow: 10px 10px 24px -7px rgba(46, 38, 64, 0.3);
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  row-gap: 20px;
`;
const Title = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const DetailContent = styled.div`
  display: flex;
  flex-direction: column;
  h1 {
    font-size: 50px;
  }
`;
const DetailContainer = styled.div`
  padding-top: 40px;
  padding-left: 30px;
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
