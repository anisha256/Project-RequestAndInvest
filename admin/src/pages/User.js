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
import Spinner from '../components/Spinner';

const User = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const { data } = await axios.get(
        'http://localhost:5000/api/admin/user/lists',
        {
          headers: {
            'content-type': 'application/json',
            access_token: localStorage.getItem('accessToken'),
          },
        }
      );
      setUsers(data.data);
      setLoading(false);
      console.log(users);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <UserContainer>
      {loading && <Spinner />}
      {!loading && (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
          <TableContainer sx={{ maxHeight: 600 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow style={{ backgroundColor: 'transparent' }}>
                  <TableCell align="left" style={{ minWidth: 20 }}>
                    UserName
                  </TableCell>
                  <TableCell align="left" style={{ minWidth: 20 }}>
                    Email
                  </TableCell>

                  <TableCell align="left" style={{ minWidth: 20 }}>
                    Status
                  </TableCell>
                  <TableCell align="left" style={{ minWidth: 20 }}>
                    Updated on
                  </TableCell>
                  <TableCell align="left" style={{ minWidth: 20 }}>
                    Joined on
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row._id}
                      >
                        <TableCell align="left">{row.username}</TableCell>
                        <TableCell align="left">{row.email}</TableCell>

                        <TableCell align="left">
                          {row.isDeactivated === true
                            ? 'Deactivated'
                            : 'Active'}
                        </TableCell>

                        <TableCell align="left">
                          {' '}
                          {row.updatedAt
                            ? `${row.updatedAt.slice(0, 10)}`
                            : '-'}{' '}
                        </TableCell>

                        <TableCell align="left">
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
            count={users.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      )}
    </UserContainer>
  );
};

export default User;

const UserContainer = styled.div`
  flex: 4;
  min-height: calc(100vh - 60px);
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
