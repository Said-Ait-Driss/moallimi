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

export const classeStudentCountState = createAsyncThunk('/api/state/classe-student-count', async (_, { rejectWithValue }) => {
    try {
        const response: any = await axiosInstance.get(`/api/state/classe-student-count`);
        return response.data;
    } catch (error: any) {
        return rejectWithValue(error.response.data.message);
    }
});

export const academicLevelStudentCountState = createAsyncThunk('/api/state/academic-level-student-count', async (_, { rejectWithValue }) => {
    try {
        const response: any = await axiosInstance.get(`/api/state/academic-level-student-count`);
        return response.data;
    } catch (error: any) {
        return rejectWithValue(error.response.data.message);
    }
});
