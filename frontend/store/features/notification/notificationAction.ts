import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '@/providers/axios.provider';

export const notificationsList = createAsyncThunk('/api/notification/all', async (pageable: any, { rejectWithValue }) => {
    try {
        const response: any = await axiosInstance.get(`/api/notification/all/${pageable.page}/${pageable.size}/${pageable.userId}`);
        return response.data;
    } catch (error: any) {
        return rejectWithValue(error.response.data.message);
    }
});
