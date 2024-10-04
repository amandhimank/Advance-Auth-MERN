import { create } from 'zustand';  // zustand => state management library
import axios from "axios";
axios.defaults.withCredentials = true;

const API_URL = "http://localhost:3000/auth";

export const useAuthStore = create((set) => ({
    user: null,
    isAuthenticated: false,
    error: null,
    isLoading: false,
    isCheckingAuth: true,
    message: null,

    signup: async (email, password, name) => {
        set({ isLoading: true, error: null});
        try {
            const response = await axios.post(API_URL + "/signup", {
                email,
                password,
                name
            }, { withCredentials: true });
            localStorage.setItem("token", response.data.token);
            set({ user: response.data.user, isAuthenticated: true, isLoading: false});
        }
        catch ( err ) {
            set({ error: err.response?.data?.message || "Error signing up", isLoading: false});
            throw err;
        }
    },

    login: async (email, password) => {
        set({ isLoading: true, error: null });
        try{
            const response = await axios.post(API_URL + "/login", {
                email,
                password
            }, { withCredentials: true });
            localStorage.setItem("token", response.data.token);
            set({ isAuthenticated: true, user: response.data.user, error: null, isLoading: false });
        }
        catch (err) {
            set({ isLoading: false, error: err.response?.data?.message || "Error loging in" });
            throw err;
        }
    },

    logout: async () => {
        set({ isLoading: true, error: null });
        try {
            localStorage.removeItem("token");
            set({ user: null, isLoading: false, isAuthenticated: false, error: null });
            const response = await axios.post(API_URL + "/logout", { withCredentials: true });
            return { message: "Successfully logged out" }
        }
        catch(err) {
            set({ isLoading: false, isAuthenticated: true, error: err.response?.data?.message || "Error in logging out" });
            throw err;
        }
    },

    verifyEmail: async (verificationCode) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.post(API_URL + "/verify-email", {
                verificationCode
            })
            set({ user: response.data.user, isAuthenticated: true, isLoading: false })
            return response.data;
        }
        catch (err) {
            set({ error: err.response?.data?.message || "Error verifying email", isLoading: false })
            throw err;
        }
    },

    checkAuth : async () => {
        // const token = localStorage.getItem('token');
        
        set({ isCheckingAuth: true, error: null });
        try {
            const response = await axios.get(API_URL + "/check-auth", { withCredentials: true });
            set({ user: response.data.user, isAuthenticated: true, isCheckingAuth: false });
        }
        catch (err) {
            set({ error: null, isCheckingAuth: false, isAuthenticated: false });
        }
    },

    forgotPassword: async (email) => {
        set({ isLoading: true, error: null, message: null });
        try {
            const response = await axios.post(API_URL + "/forgot-password", { email }, { withCredentials: true });
            set({ message: response.data.message, isLoading: false });
        }
        catch (err) {
            set({ error: err.response?.data?.message || "Error in sending reset password email", isLoading: false });
            throw err;
        }
    },

    resetPassword: async (password, token) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.post(`${API_URL}/reset-password/${token}`, { password }, { withCredentials: true });
            set({ message: response.data.message, isLoading: false });
        }
        catch (err) {
            set({ error: err.response?.data?.message || "Error in resetting password", isLoading: false });
            throw err;
        }
    }
}))
