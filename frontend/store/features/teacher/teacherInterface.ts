

export interface Teacher{
    id: number,
    name: string,
    email: string,
    phone: string,
    address: string,
}

export interface TeacherState {
    teachers: Teacher[];
    loading: boolean;
    totalElements:number;
    error: string | null;
}
