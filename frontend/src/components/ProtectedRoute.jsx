import { useNavigate } from 'react-router-dom';
import { isAdmin } from '../utils/auth';
import { useEffect } from 'react';

export default function ProtectedRoute({ children }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAdmin()) {
      navigate('/admin');
    }
  }, [navigate]);

  if (!isAdmin()) {
    return null;
  }

  return children;
}
