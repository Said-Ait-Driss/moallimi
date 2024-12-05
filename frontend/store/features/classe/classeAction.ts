import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '@/providers/axios.provider';

export const classesList = createAsyncThunk('/api/classe/all', async (_, { rejectWithValue }) => {
    try {
        const response: any = await axiosInstance.get(`/api/classe/all`);
        return response.data;
    } catch (error: any) {
        return rejectWithValue(error.response.data.message);
    }
});
