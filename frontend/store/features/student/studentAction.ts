import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '@/providers/axios.provider';

export const studentsList = createAsyncThunk('/api/student/all', async (pageable: any, { rejectWithValue }) => {
    try {
        const response: any = await axiosInstance.get(`/api/student/all/${pageable.page}/${pageable.size}`);
        return response.data;
    } catch (error: any) {
        return rejectWithValue(error.response.data.message);
    }
});
