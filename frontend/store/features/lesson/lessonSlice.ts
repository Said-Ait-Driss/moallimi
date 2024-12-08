import { RootState } from '@/store/redux';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Lesson, LessonState } from './lessonInterface';
import { createLesson, getLessonDetails, lessonsList, myLessonsList } from './lessonAction';

const initialState: LessonState = {
    lesson: {
        id: -1,
        title: '',
        isSubscribed: false,
        subscriptionsCount: 0
    },
    lessons: [],
    totalPages: {},
    totalElements: 0,
    loading: false,
    error: null
};

const lessonSlice = createSlice({
    name: 'lesson',
    initialState,
    reducers: {
        SET_LESSONS(state, action) {
            state.lessons = action.payload;
        },
        ADD_LESSON_TO_LIST(state, action) {
            state.lessons.content.unshift(action.payload);
        },
        SET_LESSON_SUBSCRIBED(state, action) {
            state.lessons.content = state.lessons?.content?.map((lesson: any) => {
                if (lesson.lesson.id == action.payload) {
                    lesson.isSubscribed = true;
                    lesson.subscriptionsCount += 1;
                }
                return lesson;
            });
        },
        SET_LESSON_UNSUBSCRIBED(state, action) {
            state.lessons.content = state.lessons?.content?.map((lesson: any) => {
                if (lesson.lesson.id == action.payload) {
                    lesson.isSubscribed = false;
                    lesson.subscriptionsCount -= 1;
                }
                return lesson;
            });
        },
        SET_LESSON_DETAILS_SUBSCRIBED(state, action) {
            state.lesson.isSubscribed = true;
            state.lesson.subscriptionsCount += 1;
        },
        SET_LESSON_DETAILS_UNSUBSCRIBED(state, action) {
            state.lesson.isSubscribed = false;
            state.lesson.subscriptionsCount -= 1;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(lessonsList.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(lessonsList.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.totalPages = action.payload?.totalPages;
                state.totalElements = action.payload?.totalElements;
                state.lessons = action.payload;
            })
            .addCase(lessonsList.rejected, (state, action: any) => {
                state.loading = false;
                state.error = action.payload;
            });

        builder
            .addCase(createLesson.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createLesson.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false;
            })
            .addCase(createLesson.rejected, (state, action: any) => {
                state.loading = false;
                state.error = action.payload;
            });
        builder
            .addCase(myLessonsList.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(myLessonsList.fulfilled, (state, action) => {
                state.loading = false;
                state.totalPages = action.payload?.totalPages;
                state.totalElements = action.payload?.totalElements;
                state.lessons = action.payload;
            })
            .addCase(myLessonsList.rejected, (state, action: any) => {
                state.loading = false;
                state.error = action.payload;
            });
        builder
            .addCase(getLessonDetails.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getLessonDetails.fulfilled, (state, action) => {
                state.loading = false;
                state.lesson = action.payload;
            })
            .addCase(getLessonDetails.rejected, (state, action: any) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export const {
    SET_LESSONS,
    SET_LESSON_SUBSCRIBED,
    SET_LESSON_UNSUBSCRIBED,
    SET_LESSON_DETAILS_SUBSCRIBED,
    SET_LESSON_DETAILS_UNSUBSCRIBED,
    ADD_LESSON_TO_LIST
} = lessonSlice.actions;
export const selectTeachers = (state: RootState) => state.lesson.lessons;

export default lessonSlice.reducer;
