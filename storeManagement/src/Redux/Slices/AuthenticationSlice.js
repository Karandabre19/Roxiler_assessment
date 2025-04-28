import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { loginUser } from "../Async/AsyncFunction";
import { registerUser } from "../Async/AsyncFunction";

const initialState = {
    token: localStorage.getItem("token") || null,
    role: localStorage.getItem("role") || null,
    loading: false,
    isAdmin: 0,
    isAuthenticated: localStorage.getItem("isAuthenticated") || false,
    };

export const AuthenticationSlice = createSlice({
    name :"Authentication",
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.role = null;
            state.isAdmin = 0;
            state.token = null;
            state.isAuthenticated = false;
            sessionStorage.clear();
            localStorage.clear();
            return state;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(registerUser.pending , (state) => {
            state.loading = true
        }).addCase(registerUser.fulfilled , (state , action) => {
            state.loading = false;
            window.location.href="/login"
            toast.success(action.payload.data.message)
        }).addCase(registerUser.rejected , (state) => {
            state.loading = false;
            toast.error("User not registered")
        })

        builder.addCase(loginUser.pending , ( state) => {
            state.loading = true;
        }).addCase(loginUser.fulfilled , ( state , action) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.token = action.payload.data.token;
            state.role = action.payload.data.user.role;
            state.isAdmin = action.payload.data.user.role === 'Admin' ? 1 : 0;
            toast.success(action.payload.message)
        })
    }
})