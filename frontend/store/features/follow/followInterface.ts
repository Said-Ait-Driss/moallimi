

export interface Follow{
    id: number,
    name: string,
    email: string,
    phone: string,
    address: string,
}

export interface FollowState {
    followers: Follow[] | any;
    loading: boolean;
    totalElements:number;
    error: string | null;
}
