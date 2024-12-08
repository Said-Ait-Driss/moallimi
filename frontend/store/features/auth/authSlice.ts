import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/store/redux';
import { registerUser, sendCodeToEmail, updateEmail, updatePassword } from './authAction';
import { AuthState, EmailData, PasswordData, UserData } from './authInterface';

const initialState: AuthState = {
    role: 'student',
    isLoggedIn: false,
    user: {
        firstName: '',
        email: '',
        username: ''
    },
    loading: false,
    error: null,
    successMessage: null
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
        },
        SET_ERROR(state, action) {
            state.error = action.payload;
        },
        SET_SUCCESS_MESSAGE(state, action) {
            state.successMessage = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action: PayloadAction<UserData>) => {
                state.loading = false;
                state.isLoggedIn = true;
                state.user.email = action.payload.email;
                state.successMessage = 'Registered successfully';
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
        builder
            .addCase(updatePassword.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updatePassword.fulfilled, (state, action: PayloadAction<PasswordData>) => {
                state.loading = false;
                state.error = null;
            })
            .addCase(updatePassword.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

        builder
            .addCase(updateEmail.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateEmail.fulfilled, (state, action: PayloadAction<EmailData>) => {
                state.loading = false;
                state.error = null;
            })
            .addCase(updateEmail.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

        builder
            .addCase(sendCodeToEmail.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(sendCodeToEmail.fulfilled, (state, action: PayloadAction<EmailData>) => {
                state.loading = false;
                state.error = null;
            })
            .addCase(sendCodeToEmail.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export const { SET_LOGIN, SET_USER, SET_ROLE, SET_ERROR, SET_SUCCESS_MESSAGE } = authSlice.actions;

export const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn;
export const selectUser = (state: RootState) => state.auth.user;
export const selectRole = (state: RootState) => state.auth.role;

export default authSlice.reducer;
