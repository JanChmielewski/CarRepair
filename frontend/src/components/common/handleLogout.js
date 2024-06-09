import { useNavigate } from 'react-router-dom';

export const handleLogout = () => {
  localStorage.removeItem('token');
  navigate(`${ROUTES.LOGIN}`);
  console.log('Wylogowano!');
};
