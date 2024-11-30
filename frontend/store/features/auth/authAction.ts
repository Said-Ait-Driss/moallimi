import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '@/providers/axios.provider';

interface UserData {
    email: string;
    password: string;
    role: string;
}

// actions
export const registerUser = createAsyncThunk<UserData, UserData>('/api/auth/signup', async (userData, { rejectWithValue }) => {
    try {
        const response: any = await axiosInstance.post('/api/auth/signup', userData);
        return response.data.message;
    } catch (error: any) {
        return rejectWithValue(error.response.data.message);
    }
});
