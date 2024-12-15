import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '@/providers/axios.provider';

export const globalState = createAsyncThunk('/api/state/general', async (_, { rejectWithValue }) => {
    try {
        const response: any = await axiosInstance.get(`/api/state/general`);
        return response.data;
    } catch (error: any) {
        return rejectWithValue(error.response.data.message);
    }
});