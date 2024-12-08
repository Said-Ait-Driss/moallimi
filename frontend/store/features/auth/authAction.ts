import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '@/providers/axios.provider';

interface UserData {
    email: string;
    password: string;
    role: string;
}

interface PasswordData {
    currentPassword: string;
    newPassword: string;
    confirmationPassword: string;
    userId?: string;
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

export const updatePassword = createAsyncThunk<PasswordData, PasswordData>('/api/user/password/update', async (userData, { rejectWithValue }) => {
    try {
        const response: any = await axiosInstance.put('/api/user/password/update', userData);
        return response.data;
    } catch (error: any) {
        return rejectWithValue(error.response.data);
    }
});
