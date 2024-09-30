import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loader } from "lucide-react";
import { useAuthStore } from "../store/authStore";
import toast from "react-hot-toast";

const EmailVerification = () => {
    const [code, setCode] = useState(["", "", "", "", "", ""]);
    const inputRefs = useRef([]);
    const navigate = useNavigate();
    const { verifyEmail, error, isLoading } = useAuthStore();

    const handleChange = (index, value) => {
        const newCode = [...code];

        if (newCode.join('').length >= 6) {
            return; // Prevent any further input if 6 digits are already entered
        }

        // Handle pasted content
        if (value.length > 1) {
            const pastedCode = value.slice(0, 6).split("");
            for (let i = 0; i < 6; i++) {
                newCode[i] = pastedCode[i] || "";
            }
            setCode(newCode);

            // Focus on the last non-empty input or the first empty input one
            const lastFilledIndex = newCode.findLastIndex((digit) => digit !== "");
            const focusIndex = lastFilledIndex < 5 ? lastFilledIndex + 1 : 5;
            inputRefs.current[focusIndex].focus();
        } else {
            if (index < 6) {
                newCode[index] = value;
                setCode(newCode);
            }
        }

        // Move the focus to the next input field if value is entered
        if (value && index < 5) {
            inputRefs.current[index + 1].focus();
        }
    }

    const handleKeyDown = (index, e) => {
        if (e.key === "Backspace") {
            if (!code[index] && index > 0) {
                // If the current input is empty, move focus to the previous input
                inputRefs.current[index - 1].focus();
            } else if (code[index]) {
                // If the current input is not empty, clear the current input
                const newCode = [...code];
                newCode[index] = ""; // Clear the digit at the current index
                setCode(newCode);
            }
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const verificationCode = code.join("");
        console.log(`verification code submitted : ${verificationCode}`);
        try {
            const response = await verifyEmail(verificationCode);
            console.log(response);
            navigate("/");
            toast.success("Email verified successfully");
        }
        catch (err) {
            console.log(err);
        }
    }

    // Auto submit when user enters all 6 digits
    useEffect(() => {
        if (code.every(digit => digit !== "")) {
            handleSubmit(new Event("submit"));
        }
    }, [code])

    return (
        <motion.div
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
                duration: 0.5
            }}
            className='max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden p-8'
        >
            <h2 className='text-3xl bg-gradient-to-r from-green-500 to-emerald-500 text-transparent bg-clip-text  font-bold text-center pb-1'>Verify your email</h2>
            <p className="text-center text-gray-300 my-4">Enter the 6-digit code sent to your email address.</p>
            <form onSubmit={handleSubmit} className="my-8">
                <div className="flex justify-between">
                    {code.map((digit, index) => (
                        <input
                            key={index}
                            ref={(el) => (inputRefs.current[index] = el)}
                            type="text"
                            maxLength='6'
                            value={digit}
                            onChange={(e) => handleChange(index, e.target.value)}
                            onKeyDown={(e) => handleKeyDown(index, e)}
                            className="size-12 text-center text-2xl font-bold bg-gray-700 text-white border-2 border-gray-400 rounded-lg focus:border-green-500 focus:outline-none transition duration:300"
                        />
                    ))}
                </div>
            </form>
            {error && <p className='text-red-500 text-2xl font-semibold mb-4'>{error}</p>}
            <motion.button className="w-full bg-gradient-to-r from-green-500 to-emerald-600 px-4 py-2 rounded-lg shadow-lg text-white font-bold hover:bg-gradient-to-r hover:from-green-600 hover:to-emerald-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200 " whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                type='submit'
                disabled={isLoading}
            >
                {isLoading ? <Loader className='size-6 animate-spin mx-auto' /> : "Verify Email"}
            </motion.button>
        </motion.div>
    )
}

export default EmailVerification;