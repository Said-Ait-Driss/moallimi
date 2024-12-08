import { RootState } from '@/store/redux';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { StudentState } from './studentInterface';
import { studentsList } from './studentAction';

const initialState: StudentState = {
    students: [],
    loading: false,
    totalElements: 0,
    error: null
};

const studentSlice = createSlice({
    name: 'student',
    initialState,
    reducers: {
        SET_STUDENTS(state, action) {
            state.students = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(studentsList.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(studentsList.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.students = action.payload;
                state.totalElements = action.payload.totalElements;
            })
            .addCase(studentsList.rejected, (state, action: any) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export const { SET_STUDENTS } = studentSlice.actions;
export const selectTeachers = (state: RootState) => state.student.students;

export default studentSlice.reducer;
