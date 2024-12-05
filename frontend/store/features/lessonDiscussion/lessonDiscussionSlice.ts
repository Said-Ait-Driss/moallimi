import { RootState } from '@/store/redux';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LessonDiscussionState } from './lessonDiscussionInterface';
import { addComment, lessonDiscussionsList } from './lessonDiscussionAction';

const initialState: LessonDiscussionState = {
    lessonDiscussions: [],
    loading: false,
    error: null
};

const lessonSlice = createSlice({
    name: 'lessonDiscussion',
    initialState,
    reducers: {
        SET_LESSON_DUSCUSSIONS(state, action) {
            state.lessonDiscussions = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(lessonDiscussionsList.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(lessonDiscussionsList.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.lessonDiscussions = action.payload;
            })
            .addCase(lessonDiscussionsList.rejected, (state, action: any) => {
                state.loading = false;
                state.error = action.payload;
            });

        builder
            .addCase(addComment.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addComment.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.lessonDiscussions?.content?.unshift(action.payload);
            })
            .addCase(addComment.rejected, (state, action: any) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export const { SET_LESSON_DUSCUSSIONS } = lessonSlice.actions;
export const selectLessonSubscriptions = (state: RootState) => state.lessonDiscussion.lessonDiscussions;

export default lessonSlice.reducer;
