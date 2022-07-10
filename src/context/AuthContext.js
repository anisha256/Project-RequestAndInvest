import { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router';

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  let [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem('authTokens')
      ? JSON.parse(localStorage.getItem('authTokens'))
      : null
  );
  let [user, setUser] = useState(() =>
    localStorage.getItem('authTokens')
      ? jwt_decode(localStorage.getItem('authTokens'))
      : null
  );

  const loginUser = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        'http://localhost:5000/api/login',
        { email: e.target.email.value, password: e.target.password.value },
        {
          headers: {
            'content-type': 'application/json',
          },
        }
      );
      const res = data.data;
      console.log(res);
      console.log(data.statusCode);
      if (data.statusCode === 200) {
        setAuthTokens(res);
        setUser(jwt_decode(res.accessToken));
        localStorage.setItem('authTokens', JSON.stringify(res));
        navigate('/profile');
      }
    } catch (res) {
      console.log(res.message);
    }
  };
  const logoutUser = async () => {
    // console.log(user);
    // const { data } = await axios.delete('http://localhost:5000/api/logout', {
    //   headers: {
    //     'content-type': 'application/json',
    //     refresh_token: authTokens.refreshToken,
    //   },
    // });
    // console.log(data.message);
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem('authTokens');
    console.log('logout successfully');
    navigate('/login');
  };
  const contextData = {
    user: user,
    authTokens: authTokens,
    loginUser: loginUser,
    logoutUser: logoutUser,
  };
  useEffect(() => {
    if (authTokens) {
      setUser(jwt_decode(authTokens.accessToken));
    }
    setLoading(false);
  }, [loading, authTokens]);

  return (
    <AuthContext.Provider value={contextData}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};
