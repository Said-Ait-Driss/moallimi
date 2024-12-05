import { RootState } from '@/store/redux';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProfileState } from './profileInterface';
import { profile } from './profileAction';

const initialState: ProfileState = {
    profile: { id: 0, firstName: '', lastName: '' },
    loading: false,
    error: null
};

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        SET_STUDENTS(state, action) {
            state.profile = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(profile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(profile.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.profile = action.payload;
            })
            .addCase(profile.rejected, (state, action: any) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export const { SET_STUDENTS } = profileSlice.actions;
export const selectProfile = (state: RootState) => state.profile.profile;

export default profileSlice.reducer;
