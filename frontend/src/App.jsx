import React from 'react'
import { Route, Routes } from 'react-router-dom'
import FloatingShape from './components/FloatingShape'
import Signup from './components/Signup'
import Login from './components/Login'
import EmailVerification from './components/EmailVerification'

function App() {
  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-emerald-900 flex justify-center items-center relative overflow-hidden'>
      <FloatingShape color="bg-green-500" size="w-64 h-64" top="-5%" left="10%" delay={0} />
      <FloatingShape color="bg-green-500" size="w-48 h-48" top="70%" left="80%" delay={5} />
      <FloatingShape color="bg-green-500" size="w-32 h-32" top="50%" left="-5%" delay={2} />

      <Routes>
        <Route path='/' element={<h1>Home</h1>} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/verify-email' element={<EmailVerification />} />
      </Routes> 

    </div>
  )
}

export default App