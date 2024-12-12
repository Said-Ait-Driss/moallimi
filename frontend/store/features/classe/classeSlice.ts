import { RootState } from '@/store/redux';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ClasseState } from './classeInterface';
import { classesList, enrollToClasse, unEnrollToClasse } from './classeAction';

const initialState: ClasseState = {
    classes: [],
    loading: false,
    enrollLoading: false,
    error: null
};

const classeSlice = createSlice({
    name: 'classe',
    initialState,
    reducers: {
        SET_STUDENTS(state, action) {
            state.classes = action.payload;
        },
        UNENROLLED_STUDENT_FROM_CLASSE(state, action) {
            return {
                ...state,
                classes: {
                    ...state.classes,
                    content: state.classes.content.map((item: any) => {
                        if (item.id === action.payload.classeId) {
                            return {
                                ...item,
                                isEnrolled: false
                            };
                        }
                        return item;
                    })
                }
            };
        },

        ENROLLED_STUDENT_TO_CLASSE(state, action) {
            return {
                ...state,
                classes: {
                    ...state.classes,
                    content: state.classes.content.map((item: any) => {
                        if (item.id === action.payload.classeId) {
                            return {
                                ...item,
                                isEnrolled: true
                            };
                        }
                        return item;
                    })
                }
            };
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

        builder
            .addCase(enrollToClasse.pending, (state) => {
                state.enrollLoading = true;
                state.error = null;
            })
            .addCase(enrollToClasse.fulfilled, (state, action: PayloadAction<any>) => {
                state.enrollLoading = false;
            })
            .addCase(enrollToClasse.rejected, (state, action: any) => {
                state.enrollLoading = false;
                state.error = action.payload;
            });

        builder
            .addCase(unEnrollToClasse.pending, (state) => {
                state.enrollLoading = true;
                state.error = null;
            })
            .addCase(unEnrollToClasse.fulfilled, (state, action: PayloadAction<any>) => {
                state.enrollLoading = false;
            })
            .addCase(unEnrollToClasse.rejected, (state, action: any) => {
                state.enrollLoading = false;
                state.error = action.payload;
            });
    }
});

export const { SET_STUDENTS, ENROLLED_STUDENT_TO_CLASSE, UNENROLLED_STUDENT_FROM_CLASSE } = classeSlice.actions;
export const selectTeachers = (state: RootState) => state.classe.classes;

export default classeSlice.reducer;
