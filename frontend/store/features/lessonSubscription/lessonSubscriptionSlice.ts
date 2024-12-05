import { RootState } from '@/store/redux';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LessonSubscriptionState } from './lessonSubscriptionInterface';
import { getLessonSubscribers, subscribeToLesson, unsubscribeToLesson } from './lessonSubscriptionAction';

const initialState: LessonSubscriptionState = {
    lessons: [],
    loading: false,
    error: null,
    subscribers: []
};

const lessonSubscriptionSlice = createSlice({
    name: 'lessonSubscription',
    initialState,
    reducers: {
        SET_LESSONS_SUBSCRIPTIONS(state, action) {
            state.lessons = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(subscribeToLesson.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(subscribeToLesson.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false;
            })
            .addCase(subscribeToLesson.rejected, (state, action: any) => {
                state.loading = false;
                state.error = action.payload;
            });
        builder
            .addCase(unsubscribeToLesson.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(unsubscribeToLesson.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false;
            })
            .addCase(unsubscribeToLesson.rejected, (state, action: any) => {
                state.loading = false;
                state.error = action.payload;
            });

        builder
            .addCase(getLessonSubscribers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getLessonSubscribers.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.subscribers = action.payload;
            })
            .addCase(getLessonSubscribers.rejected, (state, action: any) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export const { SET_LESSONS_SUBSCRIPTIONS } = lessonSubscriptionSlice.actions;
export const selectTeachers = (state: RootState) => state.lessonSubscription.lessons;

export default lessonSubscriptionSlice.reducer;
