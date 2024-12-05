

export interface Profile{
    id: number,
    firstName: string,
    lastName: string,
}

export interface ProfileState {
    profile: Profile;
    loading: boolean;
    error: string | null;
}
