export const isAdmin = () => {
  return localStorage.getItem('adminToken') !== null;
};

export const logout = () => {
  localStorage.removeItem('adminToken');
};

export const setAdminToken = (token) => {
  localStorage.setItem('adminToken', token);
};

export const getAdminToken = () => {
  return localStorage.getItem('adminToken');
};
