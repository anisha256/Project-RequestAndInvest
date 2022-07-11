export const userExists = () => {
  return localStorage.getItem('refreshToken');
};

export const getUserId = () => {
  return localStorage.getItem('_id');
};
