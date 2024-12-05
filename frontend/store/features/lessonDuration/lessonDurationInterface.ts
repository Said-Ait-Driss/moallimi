

export interface LessonDuration{
    id: number,
    lessonCategory: string,
}

export interface LessonDurationsState {
    lessonDurations: LessonDuration[];
    loading: boolean;
    error: string | null;
}
