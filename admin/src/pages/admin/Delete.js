import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router';

const Delete = () => {
  const navigate = useNavigate();
  const id = localStorage.getItem('_id');
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/admin/${id}/delete`, {
        headers: {
          'content-type': 'application/json',
          access_token: localStorage.getItem('accessToken'),
        },
      });
      toast.success('your id is deleted   ', { autoClose: 2000 });

      navigate('/auth');
    } catch (error) {}
  };
  return (
    <DeleteContainer>
      <DeleteWrapper>
        <Title>
          <h1>Danger Zone</h1>
        </Title>
        <Content>
          <p>You can delete your account</p>
          <Button onClick={handleDelete}>Delete</Button>
        </Content>
      </DeleteWrapper>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </DeleteContainer>
  );
};

export default Delete;
const Button = styled.div`
  background-color: red;
  border: none;
  border-radius: 8px;
  height: 40px;
  width: 100px;
  color: white;
  font-size: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Content = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 15px;
  padding: 20px 0px;
`;
const Title = styled.div`
  height: 50px;
  display: flex;
  align-items: center;
  border-bottom: 2px solid #8a74b5;
`;
const DeleteWrapper = styled.div`
  margin-top: 30px;
  display: flex;
  padding-left: 20px;
  flex-direction: column;
  width: 400px;

  box-shadow: 10px 10px 24px -7px rgba(46, 38, 64, 0.3);
  -webkit-box-shadow: 10px 10px 24px -7px rgba(46, 38, 64, 0.3);
  -moz-box-shadow: 10px 10px 24px -7px rgba(46, 38, 64, 0.3);
`;

const DeleteContainer = styled.div`
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
