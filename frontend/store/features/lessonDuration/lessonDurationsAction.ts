import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '@/providers/axios.provider';

export const lessonDurationsList = createAsyncThunk('/api/lesson-type/all', async (_, { rejectWithValue }) => {
    try {
        const response: any = await axiosInstance.get(`/api/lesson-type/all`);
        return response.data;
    } catch (error: any) {
        return rejectWithValue(error.response.data.message);
    }
});
