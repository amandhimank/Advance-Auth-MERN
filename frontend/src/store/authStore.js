import { create } from 'zustand';  // zustand => state management library
import axios from "axios";

const API_URL = "http://localhost:3000/auth";

export const useAuthStore = create((set) => ({
    user: null,
    isAuthenticated: false,
    error: null,
    isLoading: false,
    isCheckingAuth: true,

    signup: async (email, password, name) => {
        set({ isLoading: true, error: null});
        try {
            const response = await axios.post(API_URL + "/signup", {
                email,
                password,
                name
            }, {
                withCredentials: true // Include cookies in requests
            });
            set({ user: response.data.user, isAuthenticated: true, isLoading: false});
            return response;
        }
        catch ( err ) {
            set({ error: err.response.data.message || "Error signing up", isLoading: false});
            throw err;
        }
    },

    verifyEmail: async (verificationCode) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.post(API_URL + "/verify-email", {
                verificationCode
            },)
            set({ user: response.data.user, isAuthenticated: true, isLoading: false })
            return response.data;
        }
        catch (err) {
            set({ error: err.response.data.message || "Error verifying email", isLoading: false })
            throw err;
        }
    },

    checkAuth : async () => {
        set({ isCheckingAuth: true, error: null });

        try {
            const response = await axios.get(API_URL + "/check-auth", {
                withCredentials: true // Include cookies in requests
            });
            set({ user: response.data.user, isAuthenticated: true, isCheckingAuth: false });
            console.log(response);
        }
        catch (err) {
            set({ error: null, isCheckingAuth: false });
            throw err;
        }
    }
}))
