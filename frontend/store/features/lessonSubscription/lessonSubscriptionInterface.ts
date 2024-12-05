

export interface LessonSubscription{
    id: number,
    title: string,
}

export interface LessonSubscriptionState {
    lessons: LessonSubscription[];
    loading: boolean;
    error: string | null;
    subscribers: any
}
