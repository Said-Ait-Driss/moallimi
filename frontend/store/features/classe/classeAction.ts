import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '@/providers/axios.provider';

export const classesList = createAsyncThunk('/api/classe/all', async (pageable: any, { rejectWithValue }) => {
    try {
        const response: any = await axiosInstance.get(
            `/api/classe/all/${pageable.page}/${pageable.size}/${pageable.studentId}?filter=${pageable.filter}&query=${pageable.query}`
        );
        return response.data;
    } catch (error: any) {
        return rejectWithValue(error.response.data.message);
    }
});

export const enrollToClasse = createAsyncThunk('/api/classe/enroll', async (data: any, { rejectWithValue }) => {
    try {
        const response: any = await axiosInstance.post(`/api/classe/enroll`, data);
        return response.data;
    } catch (error: any) {
        return rejectWithValue(error.response.data.message);
    }
});


export const unEnrollToClasse = createAsyncThunk('/api/classe/unenroll', async (data: any, { rejectWithValue }) => {
    try {
        const response: any = await axiosInstance.post(`/api/classe/unenroll`, data);
        return response.data;
    } catch (error: any) {
        return rejectWithValue(error.response.data.message);
    }
});
