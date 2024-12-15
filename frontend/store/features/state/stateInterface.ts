export interface state{
    id: number,
    title: string,
}

export interface stateState {
    global: state[] | any;
    loading: boolean;
    error: string | null;
}