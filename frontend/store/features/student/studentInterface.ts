

export interface Student{
    id: number,
    name: string,
    email: string,
    phone: string,
    address: string,
}

export interface StudentState {
    students: Student[];
    loading: boolean;
    totalElements:number;
    error: string | null;
}
