export interface Lesson {
    id: number;
    title: string;
    isSubscribed: boolean;
    subscriptionsCount: number;
}

export interface LessonState {
    lesson: Lesson;
    lessons: Lesson[] | any;
    totalPages: any;
    totalElements:any;
    loading: boolean;
    error: string | null;
}
