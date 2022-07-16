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
import Spinner from '../../components/Spinner';

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
  const [adminLists, setAdminLists] = useState([]);
  const [loading, setLoading] = useState(true);

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
      setAdminLists(data.data);
      setLoading(false);
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
      {loading && <Spinner />}
      {!loading && (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
          <TableContainer
          // sx={{ maxHeight: 600 }}
          >
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell align="left" style={{ minWidth: 20 }}>
                    Email
                  </TableCell>
                  <TableCell align="left" style={{ minWidth: 20 }}>
                    Username
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
                {adminLists
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row._id}
                      >
                        <TableCell align="left">{row.email}</TableCell>
                        <TableCell align="left">{row.username}</TableCell>
                        <TableCell align="left" style={{ minHeight: 50 }}>
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
            count={adminLists.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      )}
    </AdminsContainer>
  );
};

export default Admins;

const AdminsContainer = styled.div`
  flex: 4;
  min-height: calc(100vh - 60px);
`;
