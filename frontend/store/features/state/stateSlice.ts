import { RootState } from '@/store/redux';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { stateState } from './stateInterface';
import { globalState } from './stateAction';

const initialState: stateState = {
    global: [],
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
    }
});

export const selectGlobalState = (state: RootState) => state.state.global;

export default stateSlice.reducer;
