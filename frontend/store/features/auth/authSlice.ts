import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '@/store/redux';

export interface AuthState {
    role: string;
    isLoggedIn: boolean;
    user: {
        firstName: string;
        email: string;
        username: string;
    };
}

const initialState: AuthState = {
    role: 'student',
    isLoggedIn: false,
    user: {
        firstName: '',
        email: '',
        username: ''
    }
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        SET_ROLE(state, action) {
            state.role = action.payload;
        },
        SET_LOGIN(state, action) {
            state.isLoggedIn = action.payload;
        },
        SET_USER(state, action) {
            const profile = action.payload;
            state.user.firstName = profile.name;
            state.user.username = profile.name;
            state.user.email = profile.email;
        }
    }
});

export const { SET_LOGIN, SET_USER, SET_ROLE } = authSlice.actions;

export const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn;
export const selectUser = (state: RootState) => state.auth.user;
export const selectRole = (state: RootState) => state.auth.role;

export default authSlice.reducer;
