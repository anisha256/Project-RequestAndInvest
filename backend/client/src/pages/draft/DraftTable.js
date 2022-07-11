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

  const fetchDrafts = async () => {
    const { data } = await axios.get(
      `https://reziii.herokuapp.com/api/user/project/drafts/${id}`,
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
  }, []);

  return (
    <Container>
      <LeftSide>
        <Avatar>
          <Avatarmenu></Avatarmenu>
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
        {loading && <Spinner />}
        {!loading && (
          <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer
            //  sx={{ maxHeight: 600 }}
            >
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    <TableCell align="left" style={{ minWidth: 20 }}>
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
                            style={{ cursor: 'pointer', color: 'blue' }}
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
  min-height: 100vh;
  display: grid;
  grid-template-columns: 1fr 3.5fr 1.7fr;
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
  /* border: 1px solid white; */
  @media screen and (max-width: 998px) {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
    margin: 0px 10px;
  }
`;
const Center = styled.section`
  display: grid;
  grid-column: 2/3;
  height: 100%;
  border-left: 1px solid white;
  border-right: 1px solid white;
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
  height: 100%;
  gap: 20px;
  @media screen and (max-width: 998px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;
const CenterDiv = styled.div`
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  /* align-items: center; */
  margin: 40px;
  @media screen and (max-width: 998px) {
    display: flex;
    flex-direction: column;
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
    align-items: center;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  p {
    color: #564480;
  }
`;
