import { RootState } from '@/store/redux';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { stateState } from './stateInterface';
import { academicLevelStudentCountState, classeStudentCountState, globalState } from './stateAction';

const initialState: stateState = {
    global: [],
    classeStudentCount: [],
    academicLevelStudentCount: [],
    loading: false,
    error: null
};

const stateSlice = createSlice({
    name: 'state',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(globalState.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(globalState.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.global = action.payload;
            })
            .addCase(globalState.rejected, (state, action: any) => {
                state.loading = false;
                state.error = action.payload;
            });

        builder
            .addCase(classeStudentCountState.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(classeStudentCountState.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.classeStudentCount = action.payload;
            })
            .addCase(classeStudentCountState.rejected, (state, action: any) => {
                state.loading = false;
                state.error = action.payload;
            });

        builder
            .addCase(academicLevelStudentCountState.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(academicLevelStudentCountState.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.academicLevelStudentCount = action.payload;
            })
            .addCase(academicLevelStudentCountState.rejected, (state, action: any) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export const selectGlobalState = (state: RootState) => state.state.global;
export const selectClasseStudentCountState = (state: RootState) => state.state.classeStudentCount;
export const selectAcademicLevelStudentCountState = (state: RootState) => state.state.academicLevelStudentCount;

export default stateSlice.reducer;
