import React from 'react'
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20
      }}
      className='max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden p-8'>
        <h2 className='text-3xl bg-gradient-to-r from-green-500 to-emerald-500 text-transparent bg-clip-text mb-6 font-bold text-center'>User Details</h2>

        <Link to="/login" className='text-green-500 hover:underline'>Logout</Link>
    </motion.div>
  )
}

export default Dashboard