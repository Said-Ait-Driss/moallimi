import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '@/providers/axios.provider';

export const profile = createAsyncThunk('/api/profile', async (user: any, { rejectWithValue }) => {
    try {
        const response: any = await axiosInstance.get(`/api/user/profile/${user.userId}`);
        return response.data;
    } catch (error: any) {
        return rejectWithValue(error.response.data.message);
    }
});


export const updateUserInfo = createAsyncThunk('/api/user/update', async (user: any, { rejectWithValue }) => {
    try {
        const response: any = await axiosInstance.put(`/api/user/update`,user);
        return response.data;
    } catch (error: any) {
        return rejectWithValue(error.response.data.message);
    }
});