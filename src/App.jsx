import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AppProvider } from './context/AppContext'
import UserPortal from './portals/user/UserPortal'
import Calculators from './portals/user/Calculators'
import AdminPortal from './portals/admin/AdminPortal'
import AdminLogin from './portals/admin/AdminLogin'

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('fintxyug_auth') === 'true';
  return isAuthenticated ? children : <Navigate to="/admin/login" />;
};

function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          {/* User Portal */}
          <Route path="/" element={<UserPortal />} />
          <Route path="/calculators" element={<Calculators />} />

          {/* Admin Portal Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute>
                <AdminPortal />
              </ProtectedRoute>
            }
          />

          {/* Redirect generic /admin to dashboard or login */}
          <Route path="/admin" element={<Navigate to="/admin/dashboard" />} />
        </Routes>
      </Router>
    </AppProvider>
  )
}

export default App
