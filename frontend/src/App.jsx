import React, { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import FloatingShape from './components/FloatingShape'
import Signup from './components/Signup'
import Login from './components/Login'
import EmailVerification from './components/EmailVerification'
import { Toaster } from "react-hot-toast"
import { useAuthStore } from './store/authStore'
import Dashboard from './components/Dashboard'
import LoadingSpinner from './components/LoadingSpinner'

// protect routes that require authentication
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  if(!isAuthenticated) {
    return <Navigate to="/login" replace />
  }
  if(!user.isVerified) {
    return <Navigate to="/verify-email" replace />
  }

  return children;
}

// Redirect authenticated user to home page
const RedirectAuthenticatedUser = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (isAuthenticated && user.isVerified) {
    return <Navigate to="/" replace />
  }

  return children;
}

function App() {
  const { isCheckingAuth, checkAuth, isAuthenticated, user } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth])

  console.log("isAuthenticated", isAuthenticated);
  console.log("user", user);

  if(isCheckingAuth) return <LoadingSpinner />;

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-emerald-900 flex justify-center items-center relative overflow-hidden'>
      <FloatingShape color="bg-green-500" size="w-64 h-64" top="-5%" left="10%" delay={0} />
      <FloatingShape color="bg-green-500" size="w-48 h-48" top="70%" left="80%" delay={5} />
      <FloatingShape color="bg-green-500" size="w-32 h-32" top="50%" left="-5%" delay={2} />

      <Routes>
        <Route path='/' element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path='/signup' element={
          <RedirectAuthenticatedUser>
            <Signup />
          </RedirectAuthenticatedUser>} />
        <Route path='/login' element={
          <RedirectAuthenticatedUser>
            <Login />
          </RedirectAuthenticatedUser>} />
        <Route path='/verify-email' element={<EmailVerification />} />
      </Routes>
      <Toaster />
    </div>
  )
}

export default App