import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '@/providers/axios.provider';

export const lessonCategoriesList = createAsyncThunk('/api/lesson-category/all', async (_, { rejectWithValue }) => {
    try {
        const response: any = await axiosInstance.get(`/api/lesson-category/all`);
        return response.data;
    } catch (error: any) {
        return rejectWithValue(error.response.data.message);
    }
});
