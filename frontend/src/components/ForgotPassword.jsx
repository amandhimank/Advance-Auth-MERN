import { useState } from "react";
import { useAuthStore } from "../store/authStore";
import { Loader, Mail, MoveLeft } from "lucide-react";
import { motion } from "framer-motion";
import Input from "./Input";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);

    const { isLoading, forgotPassword } = useAuthStore();


    const handleSubmit = async (e) => {
        e.preventDefault();
        await forgotPassword(email);
        setIsSubmitted(true);
        toast.success("password reset email sent successfully");
    }

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
                {!isSubmitted ? (
                    <form onSubmit={handleSubmit}>
                        <h2 className='text-3xl bg-gradient-to-r from-green-500 to-emerald-500 text-transparent bg-clip-text mb-6 font-bold text-center pb-1'>Forgot Password</h2>
                        <p className="text-gray-300 mb-6 text-center">Enter your email address and we will send you a link to reset your password.</p>
                        <Input
                            icon={Mail}
                            type="email"
                            placeholder="Email Address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <motion.button className="w-full bg-gradient-to-r from-green-500 to-emerald-600 px-4 py-2 rounded-lg shadow-lg text-white font-bold hover:bg-gradient-to-r hover:from-green-600 hover:to-emerald-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200 mt-4" whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.98 }}
                            type='submit'
                            disabled={isLoading}
                        >
                            {isLoading ? <Loader className='size-6 animate-spin mx-auto' /> : "Send Reset Link"}
                        </motion.button>
                    </form>
                ) : (
                    <div className="flex flex-col items-center justify-center">
                        <h2 className='text-3xl bg-gradient-to-r from-green-500 to-emerald-500 text-transparent bg-clip-text mb-5 font-bold text-center pb-1'>Email Sent</h2>
                        <Mail className="size-16 text-white bg-green-500 rounded-full p-2 mb-5" />
                        <p className="text-gray-300 mb-6 text-center">If an account exists for <span className="text-green-500">{email}</span>, you will recieve a password reset link shortly. </p>
                    </div>
                )}
            </div>
            <div className='px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center items-center hover:bg-gray-900'>
                <p className='text-white'>
                    <Link to="/login" className='text-green-500 flex gap-2 items-center'><MoveLeft /> Back to login</Link></p>
            </div>
        </motion.div>
    )
}

export default ForgotPassword;