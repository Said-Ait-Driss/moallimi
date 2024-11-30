export interface AuthState {
    role: string;
    isLoggedIn: boolean;
    user: {
        firstName: string;
        email: string;
        username: string;
    };
    loading: boolean;
    error: any;
    successMessage: any
}
export interface UserData {
    email: string;
    password: string;
    role: string;
}