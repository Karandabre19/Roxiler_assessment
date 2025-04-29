import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { loginUser , registerUser } from "../Async/AsyncFunction";

const initialState = {
    token:null,
    role:null,
    loading: false,
    isAuthenticated:false,
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
            state.token = action.payload.token;
            state.role = action.payload.user.role;
            console.log(state.role)
            toast.success(action.payload.message)
        }).addCase(loginUser.rejected, (state , action) => {
            state.loading = false ;
            toast.error(action.payload.message)
        })
    }
})

export default AuthenticationSlice.reducer;