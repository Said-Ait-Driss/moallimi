import { RootState } from '@/store/redux';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TeacherState } from './teacherInterface';
import { teachersList } from './teacherAction';

const initialState: TeacherState = {
    teachers: [],
    loading: false,
    totalElements:0,
    error: null
};

const teacherSlice = createSlice({
    name: 'teacher',
    initialState,
    reducers: {
        SET_TEACHERS(state, action) {
            state.teachers = action.payload;
        },
        SET_FOLLOW_TEACHER(state, action) {
            return {
                ...state,
                teachers: {
                    ...state.teachers,
                    content: state.teachers.content.map((item: any) => {
                        if (item.teacher.id == action.payload.teacherId) {
                            return {
                                ...item,
                                isFollowed: true
                            };
                        }
                        return item;
                    })
                }
            };
        },
        SET_UNFOLLOW_TEACHER(state, action) {
            return {
                ...state,
                teachers: {
                    ...state.teachers,
                    content: state.teachers.content.map((item: any) => {
                        if (item.teacher.id == action.payload.teacherId) {
                            return {
                                ...item,
                                isFollowed: false
                            };
                        }
                        return item;
                    })
                }
            };
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
                state.totalElements = action.payload.totalElements
            })
            .addCase(teachersList.rejected, (state, action: any) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export const { SET_TEACHERS, SET_FOLLOW_TEACHER, SET_UNFOLLOW_TEACHER } = teacherSlice.actions;
export const selectTeachers = (state: RootState) => state.teacher.teachers;

export default teacherSlice.reducer;
