import { configureStore } from '@reduxjs/toolkit';
import authReducer from '@/store/features/auth/authSlice';
import { AuthState } from './features/auth/authInterface';

export interface RootState {
    auth: AuthState;
}

export const store = configureStore({
    reducer: {
        auth: authReducer
    }
});
export type AppDispatch = typeof store.dispatch;