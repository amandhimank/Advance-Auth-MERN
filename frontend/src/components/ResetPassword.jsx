import { useState } from "react";
import Input from "./Input";
import { useAuthStore } from "../store/authStore";
import { motion } from "framer-motion";
import { Loader, Lock } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

const ResetPassword = () => {
    const [ newPassword, setNewPassword ] = useState("");
    const [ confirmPassword, setConfirmPassword ] = useState("");

    const { isLoading, resetPassword, error, message } = useAuthStore();

    const { token } = useParams();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(newPassword !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        try {
            await resetPassword(newPassword, token);
            toast.success("password reset successfully, redirecting to login page...");
            setTimeout(() => {
                navigate("/login");
            }, 2000);

        } catch (err) {
            toast.error(err.message || "Error in resetting password");
        }
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
                <h2 className='text-3xl bg-gradient-to-r from-green-500 to-emerald-500 text-transparent bg-clip-text  font-bold text-center pb-1 mb-3'>Reset Password</h2>
                <form className='mt-4' onSubmit={handleSubmit}>
                    <Input
                        icon={Lock}
                        type="password"
                        placeholder="New Password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <Input
                        icon={Lock}
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />

                    {error && <p className='text-red-500 font-semibold test-sm my-4'>{error}</p>}

                    <motion.button className="w-full bg-gradient-to-r from-green-500 to-emerald-600 px-4 py-2 rounded-lg shadow-lg text-white font-bold hover:bg-gradient-to-r hover:from-green-600 hover:to-emerald-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200 mt-3" whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                        type='submit'
                        disabled={isLoading}
                    >
                        {isLoading ? <Loader className='size-6 animate-spin mx-auto' /> : "Set New Password"}
                    </motion.button>
                </form>
            </div>
        </motion.div>
    )
}

export default ResetPassword;