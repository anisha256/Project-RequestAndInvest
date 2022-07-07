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

const Admins = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const [admins, setAdmins] = useState([]);

  const fetchAdmins = async () => {
    try {
      const { data } = await axios.get(
        'http://localhost:5000/api/admin/lists',
        {
          headers: {
            'content-type': 'application/json',
            access_token: localStorage.getItem('accessToken'),
          },
        }
      );
      setAdmins(data.data);
      console.log(Admins);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchAdmins();
  }, []);

  return (
    <AdminsContainer>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer
        // sx={{ maxHeight: 600 }}
        >
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell align="left" style={{ minWidth: 50 }}>
                  Email
                </TableCell>
                <TableCell align="left" style={{ minWidth: 50 }}>
                  Username
                </TableCell>
                <TableCell align="left" style={{ minWidth: 50 }}>
                  Deactivated
                </TableCell>
                <TableCell align="center" style={{ minWidth: 50 }}>
                  Joined on
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {admins
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                      <TableCell align="left">{row.email}</TableCell>
                      <TableCell align="left">{row.username}</TableCell>
                      <TableCell align="left">{row.isDeactivated}</TableCell>
                      <TableCell align="center">
                        {/* {row.status ? 'True' : 'False'} */}
                        {row.createdAt
                          ? `${row.createdAt.slice(0, 10)}`
                          : '-'}{' '}
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
          count={admins.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </AdminsContainer>
  );
};

export default Admins;

const AdminsContainer = styled.div`
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
