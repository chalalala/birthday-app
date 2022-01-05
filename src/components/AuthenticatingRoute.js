import { Navigate } from "react-router-dom";
import { useAuthState } from "../utils/firebase"

export default function ProtectedPage({ children }) {
   const { isAuthenticated } = useAuthState();
   console.log(`AuthenticatedRoute: ${ isAuthenticated }`);

   return isAuthenticated ? children : <Navigate to="/login" />
}