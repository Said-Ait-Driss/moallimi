import { configureStore } from '@reduxjs/toolkit';
import authReducer from '@/store/features/auth/authSlice';
import teacherReducer from '@/store/features/teacher/teacherSlice';
import { AuthState } from './features/auth/authInterface';
import { TeacherState } from './features/teacher/teacherInterface';

export interface RootState {
    auth: AuthState;
    teacher: TeacherState
}

export const store = configureStore({
    reducer: {
        auth: authReducer,
        teacher: teacherReducer
    }
});
export type AppDispatch = typeof store.dispatch;