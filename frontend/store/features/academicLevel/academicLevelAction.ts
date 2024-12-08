import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '@/providers/axios.provider';

export const academicLevelList = createAsyncThunk('/api/academic-level/all', async (_, { rejectWithValue }) => {
    try {
        const response: any = await axiosInstance.get(`/api/academic-level/all`);
        return response.data;
    } catch (error: any) {
        return rejectWithValue(error.response.data.message);
    }
});

export const changeAcademicLevel = createAsyncThunk('/api/academic-level/user/update', async (newValue:any, { rejectWithValue }) => {
    try {
        const response: any = await axiosInstance.put(`/api/academic-level/user/update`, newValue);
        return response.data;
    } catch (error: any) {
        return rejectWithValue(error.response.data);
    }
});
