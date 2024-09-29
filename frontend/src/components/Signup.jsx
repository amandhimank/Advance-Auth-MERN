import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Input from './Input';
import { User, KeyRound, Mail, Lock } from 'lucide-react'
import { Link } from 'react-router-dom';
import PasswordStrengthMeter from './PasswordStrengthMeter';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = (e) => {
    e.preventDefault();
  };

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20
      }}
      className='max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden'>
      <div className='p-8'>
        <h2 className='text-3xl bg-gradient-to-r from-green-500 to-emerald-500 text-transparent bg-clip-text mb-6 font-bold text-center'>Create Account</h2>
        <form onSubmit={handleSignup}>
          <Input 
            icon={User} 
            type="text" 
            placeholder="Full Name" 
            value={name}
            onChange={(e) => setName(e.target.value)}  
          />
          <Input 
            icon={Mail} 
            type="email" 
            placeholder="Email Address" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}  
          />
          <Input 
            icon={Lock} 
            type="password" 
            placeholder="Password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}  
          />

          <PasswordStrengthMeter password={password} />

          <motion.button className="w-full bg-gradient-to-r from-green-500 to-emerald-600 px-4 py-2 rounded-lg shadow-lg text-white font-bold hover:bg-gradient-to-r hover:from-green-600 hover:to-emerald-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200 mt-4" whileHover={{ scale:1.03 }}
          whileTap={{ scale:0.98 }}
          type='submit'
          >
                Sign Up
            </motion.button>
        </form>
      </div>
      <div className='px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center items-center'>
        <p className='text-white'>Already have an account? {" "} 
        <Link to="/login" className='text-green-500 hover:underline'>Login</Link></p>
      </div>
    </motion.div>
  )
}

export default Signup