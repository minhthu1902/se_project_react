import { useUser } from "../../utils/contexts/UserContext.jsx";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const { user } = useUser();

  return user ? children : <Navigate to="/" replace />;
}

export default ProtectedRoute;
