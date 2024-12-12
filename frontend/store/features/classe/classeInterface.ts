

export interface Classe{
    id: number,
    title: string,
}

export interface ClasseState {
    classes: Classe[] | any;
    loading: boolean;
    enrollLoading: boolean;
    error: string | null;
}
