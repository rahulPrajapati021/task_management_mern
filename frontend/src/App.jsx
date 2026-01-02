import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";
import useAuth, { AuthProvider } from "./context/AuthContext";
import UserDashboardPage from "./Pages/UserDashboardPage";
import TaskDetails from "./Pages/TaskDetails";
import TaskEdit from "./Pages/TaskEdit";

function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();
  if(loading) {
    return <h1>Loading...</h1>;
  }
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
}

export function AppContent() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <UserDashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/task/:id"
          element={
            <ProtectedRoute>
              <TaskDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/editTask/:id"
          element={
            <ProtectedRoute>
              <TaskEdit />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
