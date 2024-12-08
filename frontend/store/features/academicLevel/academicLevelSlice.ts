import { RootState } from '@/store/redux';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { academicLevelState } from './academicLevelInterface';
import { academicLevelList, changeAcademicLevel } from './academicLevelAction';

const initialState: academicLevelState = {
    academicLevels: [],
    loading: false,
    error: null
};

const classeSlice = createSlice({
    name: 'academicLevel',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(academicLevelList.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(academicLevelList.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.academicLevels = action.payload;
            })
            .addCase(academicLevelList.rejected, (state, action: any) => {
                state.loading = false;
                state.error = action.payload;
            });
        builder
            .addCase(changeAcademicLevel.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(changeAcademicLevel.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.error = null;
            })
            .addCase(changeAcademicLevel.rejected, (state, action: any) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export const selectAcademicLevels = (state: RootState) => state.academicLevel.academicLevels;

export default classeSlice.reducer;
