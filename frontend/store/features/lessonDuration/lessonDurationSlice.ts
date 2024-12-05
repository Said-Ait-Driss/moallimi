import { RootState } from '@/store/redux';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LessonDurationsState } from './lessonDurationInterface';
import { lessonDurationsList } from './lessonDurationsAction';

const initialState: LessonDurationsState = {
    lessonDurations: [],
    loading: false,
    error: null
};

const lessonDurationsSlice = createSlice({
    name: 'lessonDurations',
    initialState,
    reducers: {
        SET_LESSONDURATIONS(state, action) {
            state.lessonDurations = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(lessonDurationsList.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(lessonDurationsList.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.lessonDurations = action.payload;
            })
            .addCase(lessonDurationsList.rejected, (state, action: any) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export const { SET_LESSONDURATIONS } = lessonDurationsSlice.actions;
export const selectLessonTypes = (state: RootState) => state.lessonDuration.lessonDurations;

export default lessonDurationsSlice.reducer;
