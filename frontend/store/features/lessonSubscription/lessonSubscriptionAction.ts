import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '@/providers/axios.provider';

export const subscribeToLesson = createAsyncThunk('/api/lesson-subscriptions/subscribe', async (data: any, { rejectWithValue }) => {
    try {
        const response: any = await axiosInstance.post(`/api/lesson-subscriptions/subscribe/student/${data.lessonId}/${data.studentId}`);
        return response.data;
    } catch (error: any) {
        return rejectWithValue(error.response.data.message);
    }
});

export const unsubscribeToLesson = createAsyncThunk('/api/lesson-subscriptions/unsubscribe', async (data: any, { rejectWithValue }) => {
    try {
        const response: any = await axiosInstance.post(`/api/lesson-subscriptions/unsubscribe/student/${data.lessonId}/${data.studentId}`);
        return response.data;
    } catch (error: any) {
        return rejectWithValue(error.response.data.message);
    }
});

export const getLessonSubscribers = createAsyncThunk('/api/lesson-subscriptions/subscribers', async (data: any, { rejectWithValue }) => {
    try {
        const response: any = await axiosInstance.get(`/api/lesson-subscriptions/subscribers/${data.lessonId}`);
        return response.data;
    } catch (error: any) {
        return rejectWithValue(error.response.data.message);
    }
});
