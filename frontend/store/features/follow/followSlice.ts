import { RootState } from '@/store/redux';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FollowState } from './followInterface';
import { followersList, follow, unFollow } from './followAction';

const initialState: FollowState = {
    followers: [],
    loading: false,
    totalElements: 0,
    error: null
};

const teacherSlice = createSlice({
    name: 'follow',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(followersList.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(followersList.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.followers = action.payload;
                state.totalElements = action.payload.totalElements;
            })
            .addCase(followersList.rejected, (state, action: any) => {
                state.loading = false;
                state.error = action.payload;
            });

        builder
            .addCase(follow.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(follow.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false;
            })
            .addCase(follow.rejected, (state, action: any) => {
                state.loading = false;
                state.error = action.payload;
            });

        builder
            .addCase(unFollow.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(unFollow.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false;
            })
            .addCase(unFollow.rejected, (state, action: any) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export const selectTeachers = (state: RootState) => state.teacher.teachers;

export default teacherSlice.reducer;
