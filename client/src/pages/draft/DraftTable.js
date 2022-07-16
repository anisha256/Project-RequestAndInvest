import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Paper,
} from '@mui/material';
import Spinner from '../../components/Spinner';
import celebrate from '../../assets/celebrate.png';
const DraftTable = () => {
  const navigate = useNavigate();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const [draftLists, setDraftLists] = useState([]);
  const id = localStorage.getItem('_id');
  const [loading, setLoading] = useState(true);
  const [grantedProjects, setGrantedProjects] = useState([]);

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

  //navigates to the project id details
  const handleTogetDetail = (projectId) => {
    navigate(`${projectId}/details`);
  };
  useEffect(() => {
    fetchDrafts();
    fetchGrantedProjects();
  }, []);

  return (
    <Container>
      <Center>
        <Top>
          <Title>
            <Celebrate src={celebrate} />
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

                {/* <Content>
                  <h3>Team Lead</h3>
                  <p>
                    {grantProject.firstName}
                    {grantProject.lastName}
                  </p>
                </Content> */}
              </Projects>
            );
          })}
        </Top>

        {loading && <Spinner />}
        {!loading && (
          <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 600 }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    <TableCell
                      align="left"
                      style={{
                        minWidth: 20,
                        backgroundColor: '#5B0E71',
                        color: 'white',
                        fontWeight: 'bold',
                      }}
                    >
                      ProjectsName
                    </TableCell>
                    <TableCell align="left" style={{ minWidth: 20 }}>
                      Email
                    </TableCell>

                    <TableCell align="left" style={{ minWidth: 20 }}>
                      Country
                    </TableCell>
                    <TableCell align="center" style={{ minWidth: 20 }}>
                      Team Experience
                    </TableCell>
                    <TableCell align="center" style={{ minWidth: 20 }}>
                      Fulltime Workers
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {draftLists
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={row._id}
                        >
                          <TableCell
                            align="left"
                            onClick={() => handleTogetDetail(row._id)}
                            style={{
                              cursor: 'pointer',
                              color: 'white',
                              fontWeight: 'bold',
                              backgroundColor: '#5B0E71',
                            }}
                          >
                            {row.projectName}
                          </TableCell>

                          <TableCell align="left">{row.email}</TableCell>
                          <TableCell align="left">{row.country}</TableCell>
                          <TableCell align="center">
                            {row.teamExperience}
                          </TableCell>
                          <TableCell align="center">
                            {row.fullTimeWorker}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={draftLists.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        )}
      </Center>
    </Container>
  );
};

export default DraftTable;
const Container = styled.div`
  min-height: calc(100vh - 60px);
  display: flex;
  flex-direction: column;
  margin-left: 60px;
  width: 100%;
  @media screen and (max-width: 998px) {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin: auto;
    padding: 20px;
  }
`;

const Center = styled.section`
  display: flex;
  flex-direction: column;
  height: 100%;
  row-gap: 40px;
`;
const Top = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-color: white;
  box-shadow: 10px 10px 24px -7px rgba(46, 38, 64, 0.3);
  -webkit-box-shadow: 10px 10px 24px -7px rgba(46, 38, 64, 0.3);
  -moz-box-shadow: 10px 10px 24px -7px rgba(46, 38, 64, 0.3);
  row-gap: 20px;
  @media screen and (max-width: 998px) {
    display: flex;
    flex-direction: column;
    padding-bottom: 40px;
    width: 100%;
  }
`;
const Title = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  flex: 1;
  border-bottom: 2px solid white;

  @media screen and (max-width: 998px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    /* width: 100%; */
  }
`;
const Celebrate = styled.img`
  height: 200px;
  object-fit: cover;
  /* border: 1px solid black; */
`;

const Projects = styled.div`
  display: flex;
  flex: 2;
  height: 50%;
  flex-direction: column;
  justify-content: center;
  padding: 20px;
  p {
    color: black;
    font-size: 20px;
  }

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
    font-size: 20px;
  }
`;
