import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '@/providers/axios.provider';

export const teachersList = createAsyncThunk('/api/teacher/all', async (pageable: any, { rejectWithValue }) => {
    try {
        const response: any = await axiosInstance.get(
            `/api/teacher/all/${pageable.page}/${pageable.size}/${pageable.userId}?filter=${pageable.filter}&query=${pageable.query}`
        );
        return response.data;
    } catch (error: any) {
        return rejectWithValue(error.response.data.message);
    }
});
