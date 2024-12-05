import { RootState } from '@/store/redux';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LessonCategoriesState } from './lessonCategoriesInterface';
import { lessonCategoriesList } from './lessonCategoriesAction';

const initialState: LessonCategoriesState = {
    lessonCategories: [],
    loading: false,
    error: null
};

const lessonCategoriesSlice = createSlice({
    name: 'lessonCategories',
    initialState,
    reducers: {
        SET_LESSONSTYPES(state, action) {
            state.lessonCategories = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(lessonCategoriesList.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(lessonCategoriesList.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.lessonCategories = action.payload;
            })
            .addCase(lessonCategoriesList.rejected, (state, action: any) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export const { SET_LESSONSTYPES } = lessonCategoriesSlice.actions;
export const selectLessonCategories = (state: RootState) => state.lessonCategories.lessonCategories;

export default lessonCategoriesSlice.reducer;
