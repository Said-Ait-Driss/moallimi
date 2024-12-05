import { RootState } from '@/store/redux';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ClasseState } from './classeInterface';
import { classesList } from './classeAction';

const initialState: ClasseState = {
    classes: [],
    loading: false,
    error: null
};

const classeSlice = createSlice({
    name: 'classe',
    initialState,
    reducers: {
        SET_STUDENTS(state, action) {
            state.classes = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(classesList.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(classesList.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.classes = action.payload;
            })
            .addCase(classesList.rejected, (state, action: any) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export const { SET_STUDENTS } = classeSlice.actions;
export const selectTeachers = (state: RootState) => state.classe.classes;

export default classeSlice.reducer;
