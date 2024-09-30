import React, { useState } from 'react'
import { motion } from 'framer-motion';
import Input from './Input';
import { Lock, Mail, Loader } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import toast from 'react-hot-toast';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { isLoading, login, error } = useAuthStore();

    const handleLogin = async (e) => {
        e.preventDefault();
        const response = await login(email, password);
        toast.success("Logged in successfully");
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
                <h2 className='text-3xl bg-gradient-to-r from-green-500 to-emerald-500 text-transparent bg-clip-text  font-bold text-center pb-1'>Welcome Back</h2>
                <form className='mt-4' onSubmit={handleLogin}>
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

                    <div className='flex items-center mb-6'>
                        <Link to="/forgot-password" className='text-sm text-green-400 hover:underline'>Forgot Password?</Link>
                    </div>

                    {error && <p className='text-red-500 font-semibold test-sm my-4'>{error}</p>}

                    <motion.button className="w-full bg-gradient-to-r from-green-500 to-emerald-600 px-4 py-2 rounded-lg shadow-lg text-white font-bold hover:bg-gradient-to-r hover:from-green-600 hover:to-emerald-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200 " whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                        type='submit'
                        disabled={isLoading}
                    >
                        {isLoading ? <Loader className='size-6 animate-spin mx-auto' /> : "Login"}
                    </motion.button>
                </form>
            </div>
            <div className='px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center items-center'>
                <p className='text-white'>New User? {" "}
                    <Link to="/signup" className='text-green-500 hover:underline'>Signup</Link></p>
            </div>
        </motion.div>
    )
}

export default Login;