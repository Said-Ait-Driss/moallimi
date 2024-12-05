import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '@/providers/axios.provider';

interface Comment {
    user: any;
    comment: string;
    lesson: any;
}

// actions
export const lessonDiscussionsList = createAsyncThunk('/api/lesson-discussion', async (pageable: any, { rejectWithValue }) => {
    try {
        const response: any = await axiosInstance.get(`/api/lesson-discussion/${pageable.lessonId}/${pageable.page}/${pageable.size}`);
        return response.data;
    } catch (error: any) {
        return rejectWithValue(error.response.data.message);
    }
});

export const addComment = createAsyncThunk<Comment, Comment>('/api/lesson-discussion/comment', async (data: any, { rejectWithValue }) => {
    try {
        const response: any = await axiosInstance.post(`/api/lesson-discussion/comment`, data);
        return response.data;
    } catch (error: any) {
        return rejectWithValue(error.response.data.message);
    }
});
