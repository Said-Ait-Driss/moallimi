import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '@/providers/axios.provider';

export const classesList = createAsyncThunk('/api/classe/all', async (pageable: any, { rejectWithValue }) => {
    try {
        const response: any = await axiosInstance.get(
            `/api/classe/all/${pageable.page}/${pageable.size}?filter=${pageable.filter}&query=${pageable.query}`
        );
        return response.data;
    } catch (error: any) {
        return rejectWithValue(error.response.data.message);
    }
});
