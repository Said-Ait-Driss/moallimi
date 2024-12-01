import { RootState } from '@/store/redux';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TeacherState } from './teacherInterface';
import { teachersList } from './teacherAction';

const initialState: TeacherState = {
    teachers: [],
    loading: false,
    error: null
};

const teacherSlice = createSlice({
    name: 'teacher',
    initialState,
    reducers: {
        SET_TEACHERS(state, action) {
            state.teachers = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(teachersList.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(teachersList.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.teachers = action.payload;
            })
            .addCase(teachersList.rejected, (state, action: any) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export const { SET_TEACHERS } = teacherSlice.actions;
export const selectTeachers = (state: RootState) => state.teacher.teachers;

export default teacherSlice.reducer;
