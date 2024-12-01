import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { cookies as nextCookies } from 'next/headers';
import { JWT } from 'next-auth/jwt';
import axiosInstance from '@/providers/axios.provider';

async function refreshToken(token: string, refreshToken: string, expiresIn: number): Promise<any> {
    try {
        const result: any = await axiosInstance.post('/api/auth/refreshtoken', {
            refreshToken: refreshToken,
            token: token
        });

        if (result.error || !result.data?.token) return null;

        return result.data;
    } catch (error) {
        return null;
    }
}

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: {
                    label: 'Email',
                    type: 'text',
                    placeholder: 'example@gmail.com'
                },
                password: {
                    label: 'Password',
                    type: 'password'
                }
            },
            async authorize(credentials: any, req: any): Promise<any | null> {
                if (!credentials.username || !credentials.password) {
                    throw new Error('Invalid username or password');
                }

                const { username, password } = credentials;

                try {
                    const result: any = await axiosInstance.post(
                        '/api/auth/signin',
                        {
                            username,
                            password
                        },
                        {
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        }
                    );
                    if (!result.data?.signIn) {
                        throw new Error('Invalid username or password');
                    }

                    const data = result.data.signIn;

                    const token = data.token;
                    const refreshToken = data.refreshToken;
                    const expiresIn = data.expiresIn;

                    nextCookies().set('moallimi-jwt', token);
                    nextCookies().set('moallimi-jwt-refresh', refreshToken);

                    return {
                        user: result.data,
                        tokens: {
                            token,
                            refreshToken,
                            expiresIn
                        }
                    };
                } catch (error) {
                    throw new Error('Invalid username or password');
                }
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }: any): Promise<any | null> {
            if (user) return { ...token, ...user };

            const currentDateTime = new Date().getTime();
            if (currentDateTime < token.tokens.expiresIn) return token;
            // token is expired then refresh token
            const newPayload = await refreshToken(token.tokens.token, token.tokens.refreshToken, token.tokens.expiresIn);

            if (!newPayload) return null;

            return {
                user: token.user,
                tokens: {
                    token: newPayload.token,
                    refreshToken: newPayload.refreshToken,
                    expiresIn: newPayload.expiresIn
                }
            };
        },
        session({ token, session }: any) {
            session.user = token.user;
            session.tokens = token.tokens;

            return Promise.resolve(session);
        }
    },
    pages: {
        signIn: '/auth/login',
        error: '/auth/login'
    },
    secret: process.env.NEXTAUTH_SECRET
};
