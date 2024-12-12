import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '@/providers/axios.provider';

export const followersList = createAsyncThunk('/api/follow/followed-teachers', async (pageable: any, { rejectWithValue }) => {
    try {
        const response: any = await axiosInstance.get(
            `/api/follow/followed-teachers/${pageable.page}/${pageable.size}?filter=${pageable.filter}&query=${pageable.query}`
        );
        return response.data;
    } catch (error: any) {
        return rejectWithValue(error.response.data.message);
    }
});


export const follow = createAsyncThunk('/api/follow/follow', async (data: any, { rejectWithValue }) => {
    try {
        const response: any = await axiosInstance.post(
            `/api/follow/follow/${data.studentId}/${data.teacherId}`
        );
        return response.data;
    } catch (error: any) {
        return rejectWithValue(error.response.data.message);
    }
});


export const unFollow = createAsyncThunk('/api/follow/unfollow', async (data: any, { rejectWithValue }) => {
    try {
        const response: any = await axiosInstance.post(
            `/api/follow/unfollow/${data.studentId}/${data.teacherId}`
        );
        return response.data;
    } catch (error: any) {
        return rejectWithValue(error.response.data.message);
    }
});
