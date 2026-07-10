import { AuthProvider } from "./context/AuthContext.jsx";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";
import "./styles/auth.css";
import './index.css'

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        {/* Other routes — MJ's /listings, Mike's /booking, Alvin's / */}
      </Routes>
    </AuthProvider>
  );
}

export default App;