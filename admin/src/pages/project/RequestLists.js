import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
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
import axios from 'axios';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { FcApproval } from 'react-icons/fc';
import { FcCancel } from 'react-icons/fc';
import { ToastContainer, toast } from 'react-toastify';

import Spinner from '../../components/Spinner';
import { useNavigate } from 'react-router';

const RequestLists = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const navigate = useNavigate();
  const [requestList, setRequestList] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchProjects = async () => {
    try {
      const { data } = await axios.get(
        'http://localhost:5000/api/admin/project/lists/requested',
        {
          headers: {
            'content-type': 'application/json',
            access_token: localStorage.getItem('accessToken'),
          },
        }
      );
      setRequestList(data.data);
      setLoading(false);
      console.log(requestList);
    } catch (error) {
      console.log(error);
    }
  };

  const handleApproval = async (projectId) => {
    console.log('projectId', projectId);
    console.log(localStorage.getItem('accessToken'));
    try {
      const { data } = await axios.post(
        `http://localhost:5000/api/admin/project/${projectId}/grant`,
        {
          headers: {
            'content-type': 'application/json',
            // access_token: localStorage.getItem('accessToken'),
          },
        }
      );
      console.log(data);
    } catch (error) {
      console.log(error.response.data);
    }
  };
  const handleReject = async (projectId) => {
    try {
      await axios.post(
        `http://localhost:5000/api/admin/project/${projectId}/reject`,
        {
          headers: {
            'content-type': 'application/json',
            // access_token: localStorage.getItem('accessToken'),
          },
        }
      );
      setLoading(false);
      toast.success('Project is Rejected', { autoClose: 2000 });
    } catch (error) {
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <>
      <ProjectsContainer>
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
                      Project Name
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
                      Action
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {requestList
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
                            onClick={() => {
                              navigate(`/project/requested/${row._id}/detail`);
                            }}
                            align="left"
                            style={{ color: 'blue', cursor: 'pointer' }}
                          >
                            {row.projectName}
                          </TableCell>
                          <TableCell align="left">{row.email}</TableCell>
                          <TableCell align="left">{row.country}</TableCell>
                          <TableCell align="center">
                            {row.teamExperience}
                          </TableCell>

                          <TableCell align="center">
                            <Request>
                              <Button onClick={() => handleApproval(row._id)}>
                                <FcApproval style={{ fontSize: 30 }} />
                              </Button>
                              <Button onClick={() => handleReject(row._id)}>
                                <FcCancel style={{ fontSize: 30 }} />
                              </Button>
                            </Request>
                          </TableCell>
                          {/* <TableCell align="left">
                          ${row.websiteUrl.slice(0, 6)}...$
                          {row.websiteUrl.slice(row.websiteUrl.length - 6)}
                          {row.websiteUrl ? (
                            <CopyButton
                              style={{ height: '10px' }}
                              onClick={() => {
                                navigator.clipboard.writeText(row.websiteUrl);
                              }}
                            >
                              <ContentCopyIcon />
                            </CopyButton>
                          ) : (
                            ''
                          )}
                        </TableCell>
                      */}
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={requestList.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        )}
      </ProjectsContainer>
    </>
  );
};

export default RequestLists;
const Request = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Button = styled.button`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  background-color: transparent;
  border: none;
`;

const ProjectsContainer = styled.div`
  flex: 4;
  min-height: calc(100vh - 60px);
`;

const CopyButton = styled.button`
  padding-bottom: 20px;
  font-size: 10px;
  cursor: pointer;
  border: none;
  background: none;
`;
