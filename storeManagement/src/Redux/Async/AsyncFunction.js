import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../services/api";
import { toast } from "react-toastify";


export const registerUser = createAsyncThunk(
    "auth/register" ,  async (userData , {rejectWithValue}) =>  {
        try {
            const response = await axiosInstance.post("/user/register" , userData)
            return response.data
        } catch (error) {
            console.error(error)
            toast.error(error.message)
            return rejectWithValue(error.response.data.message)
        }
    }
)

export const loginUser = createAsyncThunk(
    "auth/login" ,  async (userData , {rejectWithValue}) =>  {
        try {
            const response = await axiosInstance.post("/user/login" , userData)
            return response.data
        } catch (error) {
            return rejectWithValue(error.response.data.message)
        }
    }
)
