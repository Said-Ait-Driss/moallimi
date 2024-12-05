import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '@/providers/axios.provider';

export const lessonsList = createAsyncThunk('/api/lesson/all', async (pageable: any, { rejectWithValue }) => {
    try {
        const response: any = await axiosInstance.get(
            `/api/lesson/all/${pageable.page}/${pageable.size}/${pageable.studentId}?recent=${pageable.recent}&face_to_face=${pageable.face_to_face}&remote=${pageable.remote}`
        );
        return response.data;
    } catch (error: any) {
        return rejectWithValue(error.response.data.message);
    }
});

export const createLesson = createAsyncThunk('/api/lesson/add', async (data: any, { rejectWithValue }) => {
    try {
        const response: any = await axiosInstance.post('/api/lesson/add', data);
        return response.data;
    } catch (error: any) {
        return rejectWithValue(error.response.data.message);
    }
});

export const getLessonDetails = createAsyncThunk('/api/lesson', async (data: any, { rejectWithValue }) => {
    try {
        const response: any = await axiosInstance.get(`/api/lesson/${data.lessonId}/${data.studentId}`);
        return response.data;
    } catch (error: any) {
        return rejectWithValue(error.response.data.message);
    }
});
