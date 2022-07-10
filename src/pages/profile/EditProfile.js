import React from 'react';
import styled from 'styled-components';
import { FiX } from 'react-icons/fi';

const EditProfile = ({
  profileData,
  axiosJWT,
  show,
  setShow,
  setProfileData,
  id,
}) => {
  const handleCross = () => {
    setShow(false);
  };
  const handleChange = (e) => {
    setProfileData(() => ({
      [e.target.name]: e.target.value,
    }));
  };
  const handleEditData = async (e) => {
    e.preventDefault();

    const { data } = await axiosJWT.put(
      `http://localhost:5000/api/user/${id}/profile`,
      profileData,
      {
        headers: {
          'content-type': 'application/json',
          access_token: localStorage.getItem('accessToken'),
        },
      }
    );
    const { username, email } = data.data;
    setProfileData({
      username: username,
      email: email,
    });
    console.log(data);
  };
  return (
    <>
      {show && (
        <MainPopup>
          <Popup>
            <CloseButton onClick={handleCross}>
              <FiX fontSize={28} cursor="pointer" />
            </CloseButton>

            <EditForm onSubmit={handleEditData}>
              <h2>Edit your Profile</h2>
              <InputC>
                <label>Username</label>
                <Input
                  id="username"
                  type="text"
                  name="username"
                  placeholder="Enter the username"
                  value={profileData.username}
                  onChange={handleChange}
                />
              </InputC>

              <InputC>
                <label>Email</label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Enter the email"
                  value={profileData.email}
                  onChange={handleChange}
                />
              </InputC>

              <InputC>
                <Button type="submit">Edit</Button>
              </InputC>
            </EditForm>
          </Popup>
          ;
        </MainPopup>
      )}
    </>
  );
};

export default EditProfile;

const MainPopup = styled.div`
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 300;
  width: 100%;
  position: absolute;
  justify-content: center;
  align-items: center;
  display: flex;
`;
const Popup = styled.div`
  z-index: 100;
  position: fixed;
  float: right;
  bottom: 20%;
  border-radius: 5px;
  justify-content: center;
  align-items: center;
  height: 50vh;
  width: 400px;
  border: 1px solid black;
  margin-top: 25%;
  background-color: #fdf7ff;
  border-radius: 8px;
  border: none;
  h1 {
    color: white;
    text-align: center;
  }
`;

const CloseButton = styled.button`
  position: relative;
  float: right;
  background: none;
  border: none;
  color: #564480;
  top: 10px;
  right: 10px;
  padding: 10px;
`;
const EditForm = styled.form`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: 30px;
  label {
    color: #564480;
    display: inline-block;
    text-align: left;
  }
`;
const Button = styled.button`
  padding: 5px 10px;
  background-color: #564480;
  border: none;
  border-radius: 5px;
  height: 40px;
  width: 100px;
  color: white;
  font-size: 15px;
  font-weight: bold;
  cursor: pointer;
`;
const InputC = styled.section`
  display: flex;
  flex-direction: column;
`;
const Input = styled.input`
  height: 45px;
  display: flex;
  padding: 10px;
  border-radius: 3px;
  border: none;
  background-color: white;
  color: #564480;
  &:active {
    outline: none;
    border: none;
    background-color: white;
  }
  &:focus {
    outline: 0;
    border: none;
  }
`;
