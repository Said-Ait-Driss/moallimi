

export interface LessonCategory{
    id: number,
    title: string,
}

export interface LessonCategoriesState {
    lessonCategories: LessonCategory[];
    loading: boolean;
    error: string | null;
}
