import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Home, Login } from "../pages";
import { useAppState } from "../store";

const RouteComponent = () => {
  const isSignedIn = useAppState((state) => state.isSignedIn);
  const user = useAppState((state) => state.user);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            isSignedIn && user ? <Home /> : <Navigate to="/login" replace />
          }
        />

        <Route path="/login" element={<Login type="login" />} />
        <Route path="/signup" element={<Login type="signup" />} />
      </Routes>
    </Router>
  );
};

export { RouteComponent };
