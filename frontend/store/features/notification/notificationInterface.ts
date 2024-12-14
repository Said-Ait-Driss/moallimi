

export interface notification{
    id: number,
    title: string,
}

export interface notificationState {
    notifications: notification[] | any;
    loading: boolean;
    error: string | null;
}