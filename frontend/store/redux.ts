import { configureStore } from '@reduxjs/toolkit';
import authReducer from '@/store/features/auth/authSlice';
import teacherReducer from '@/store/features/teacher/teacherSlice';
import studentReducer from '@/store/features/student/studentSlice';
import classeReducer from '@/store/features/classe/classeSlice';
import lessonCategoriesReducer from '@/store/features/lessonCategories/lessonCategoriesSlice';
import lessonDurationsReducer from '@/store/features/lessonDuration/lessonDurationSlice';
import lessonReducer from '@/store/features/lesson/lessonSlice';
import profileReducer from '@/store/features/profile/profileSlice';
import lessonDiscussionReducer from "@/store/features/lessonDiscussion/lessonDiscussionSlice"
import lessonSubscriptionReducer from "@/store/features/lessonSubscription/lessonSubscriptionSlice"
import academicLevelReducer from "@/store/features/academicLevel/academicLevelSlice"
import notificationReducer from "@/store/features/notification/notificationSlice"

import { AuthState } from './features/auth/authInterface';
import { TeacherState } from './features/teacher/teacherInterface';
import { StudentState } from './features/student/studentInterface';
import { ClasseState } from './features/classe/classeInterface';
import { LessonCategoriesState } from './features/lessonCategories/lessonCategoriesInterface';
import { LessonDurationsState } from './features/lessonDuration/lessonDurationInterface';
import { LessonState } from './features/lesson/lessonInterface';
import { ProfileState } from './features/profile/profileInterface';
import { LessonDiscussionState } from './features/lessonDiscussion/lessonDiscussionInterface';
import { LessonSubscriptionState } from './features/lessonSubscription/lessonSubscriptionInterface';
import { academicLevelState } from './features/academicLevel/academicLevelInterface';
import { notificationState } from './features/notification/notificationInterface';

export interface RootState {
    auth: AuthState;
    teacher: TeacherState;
    student: StudentState;
    classe: ClasseState;
    lessonCategories: LessonCategoriesState;
    lessonDuration: LessonDurationsState;
    lesson: LessonState;
    profile: ProfileState;
    lessonDiscussion: LessonDiscussionState,
    lessonSubscription: LessonSubscriptionState,
    academicLevel: academicLevelState,
    notification: notificationState,
}

export const store = configureStore({
    reducer: {
        auth: authReducer,
        teacher: teacherReducer,
        student: studentReducer,
        classe: classeReducer,
        lessonCategories: lessonCategoriesReducer,
        lessonDuration: lessonDurationsReducer,
        lesson:  lessonReducer,
        profile:  profileReducer,
        lessonDiscussion: lessonDiscussionReducer,
        lessonSubscription : lessonSubscriptionReducer,
        academicLevel: academicLevelReducer,
        notification: notificationReducer,
    }
});
export type AppDispatch = typeof store.dispatch;
