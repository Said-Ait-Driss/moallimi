import NextAuth from 'next-auth';
import { JWT } from 'next-auth/jwt';

declare module 'next-auth' {
    interface Session {
        user: {
            id: string;
            firstName: string;
            lastName: string;
            email: string;
            username: string;
            status: string;
            roles: string[];
        };
        tokens: {
            token: string;
            refreshToken: string;
            expiresIn: number;
        };
    }
}



declare module 'next-auth/jwt' {
    interface JWT {
        user: {
            id: string;
            firstName: string;
            lastName: string;
            email: string;
            username: string;
            status: string;
            roles: string[];
        };
        tokens: {
            token: string;
            refreshToken: string;
            expiresIn: number;
        };
    }
}