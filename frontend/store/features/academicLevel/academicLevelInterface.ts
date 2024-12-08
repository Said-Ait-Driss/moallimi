

export interface AcademicLevel{
    id: number,
    title: string,
}

export interface academicLevelState {
    academicLevels: AcademicLevel[];
    loading: boolean;
    error: string | null;
}
