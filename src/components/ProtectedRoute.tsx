import { Navigate } from 'react-router-dom';
import { useAuthState } from '../contexts/AuthContext';

interface Props {
  children: any;
}

export default function ProtectedPage(props: Props) {
  const { children } = props;
  const { isAuthenticated } = useAuthState();
  console.log(`AuthenticatedRoute: ${isAuthenticated}`);

  return isAuthenticated ? children : <Navigate to="/login" />;
}
