

export interface Classe{
    id: number,
    title: string,
}

export interface ClasseState {
    classes: Classe[];
    loading: boolean;
    error: string | null;
}
