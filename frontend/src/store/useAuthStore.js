import { create } from 'zustand';
import { axiosInstanace } from '../lib/axios'
import toast from 'react-hot-toast';
import { io } from "socket.io-client";

const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:5001" : "/";

export const useAuthStore = create((set, get) => ({
    authUser: null,
    isSignIngUp: false,
    isLoggingIng: false,
    isUpdatingProfile: false,
    isCheckingAuth: true,
    onlineUsers: [],
    socket: null,

    checkAuth: async () => {
        try {
            const response = await axiosInstanace.get("/auth/check");

            set({ authUser: response.data })
            get().connectSocket()
        } catch (error) {
            console.log("Error in check auth", error);
            set({ authUser: null })
        } finally {
            set({ isCheckingAuth: false })
        }
    },

    signup: async (data) => {
        set({ isSignIngUp: true });
        try {
            const response = await axiosInstanace.post("/auth/signup", data);
            set({ authUser: response.data });
            toast.success("Account created successfully");

            get().connectSocket()
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({ isSignIngUp: false });
        }
    },

    login: async (data) => {
        set({ isLoggingIng: true });
        try {
            const response = await axiosInstanace.post("/auth/signin", data);
            set({ authUser: response.data });
            toast.success("Looged in successfully");

            get().connectSocket()
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({ isLoggingIng: false });
        }
    },

    logout: async () => {
        try {
            await axiosInstanace.post("/auth/logout");
            set({ authUser: null });
            toast.success("Logged out successfully");
            get().disconnectSocket();
        } catch (error) {
            toast.error(error.response.data.message);
        }
    },

    updateProfile: async (data) => {
        set({ isUpdatingProfile: true });
        try {
            const response = await axiosInstanace.put("/auth/update-profile", data);
            set({ authUser: response.data });
            toast.success("Profile updated successfully");
        } catch (error) {
            console.log("Error in update profile", error);
            toast.error(error.response.data.message);
        } finally {
            set({ isUpdatingProfile: false })
        }
    },

    connectSocket: () => {
        const { authUser } = get()
        if (!authUser || get().socket?.connected) return;

        const socket = io(BASE_URL, {
            query: {
                userId: authUser._id,
            }
        })
        socket.connect();

        set({ socket: socket })

        socket.on("getOnlineUsers", (userIds) => {
            set({ onlineUsers: userIds })
        })
    },
    disconnectSocket: () => {
        if (get().socket?.connected) get().socket.disconnect();
    },
}))