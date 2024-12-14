

export interface notification{
    id: number,
    title: string,
}

export interface notificationState {
    notifications: notification[] | any;
    notificationsBySocket: notification[] | any;
    loading: boolean;
    totalElements:any;
    error: string | null;
}