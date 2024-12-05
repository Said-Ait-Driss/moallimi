

export interface LessonDiscussion{
    id: number,
    title: string,
}

export interface LessonDiscussionState {
    lessonDiscussions: LessonDiscussion[] | any;
    loading: boolean;
    error: string | null;
}
