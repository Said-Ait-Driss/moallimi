import { configureStore } from '@reduxjs/toolkit';
import authReducer, { AuthState } from '@/store/features/auth/authSlice';

export interface RootState {
    auth: AuthState;
}

export const store = configureStore({
    reducer: {
        auth: authReducer
    }
});
