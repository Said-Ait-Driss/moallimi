'use client';
import { selectRole } from '@/store/features/auth/authSlice';
import Link from 'next/link';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRef } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import ErrorAlert from '@/components/shared/errorAlert';
import { BiLoader } from 'react-icons/bi';

export default function Login() {
    const role = useSelector(selectRole);
    const username = useRef('');
    const password = useRef('');
    const router = useRouter();
    const searchParams = useSearchParams();
    const [error, setError] = React.useState('');
    const [loading, setLoading] = React.useState(false);


    useEffect(()=>{
        if(searchParams.has("error")){
            setError(searchParams.get("error") ?? "");
        }
    },[])

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            if (!username.current || !password.current) {
                setError('all fileds are mendatory');
                return;
            }

            setLoading(true);
            const result = await signIn('credentials', {
                username: username.current,
                password: password.current,
                role,
                redirect: true,
                callbackUrl: '/dashboard/state'
            });

            if (result?.error) {
                setError(result?.error);
            } else {
                setError('');
                router.push('/dashboard/lesson');
            }
        } catch (error) {
            setError('service not available at the moment . please contact the support');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex bg-lightPrimary min-h-screen">
            <div className="flex-1 p-4 ps-28 mt-28">
                <h3 className="text-primaryText font-bold text-8xl my-8 leading-snug">SIGN IN AS {role.toUpperCase()} FOR IMMEDIATE ACCESS</h3>
                <p className="text-secondText font-base my-8">
                    If you don't have account. you can{' '}
                    <Link href="/auth/register" className="text-primary">
                        Register here
                    </Link>
                </p>
            </div>
            <div className="flex-1 p-4 pe-0 mt-40">
                <form className="bg-transparent rounded-lg p-4" method="POST" onSubmit={onSubmit}>
                    <div className="flex flex-col gap-4 mb-2">{error && <ErrorAlert title="Sign in attempt filed" message={error} />}</div>
                    <div className="flex flex-col gap-4 mb-2">
                        <label htmlFor="username" className="text-secondText font-base">
                            Username :{' '}
                        </label>
                        <input
                            type="text"
                            placeholder="example123"
                            id="username"
                            name="username"
                            className="bg-lightSecondary rounded-lg p-4 max-w-xl"
                            onChange={(e) => (username.current = e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col gap-4 mb-2">
                        <label htmlFor="password" className="text-secondText font-base">
                            Password :{' '}
                        </label>
                        <input
                            type="password"
                            placeholder="your password here"
                            id="password"
                            name="password"
                            className="bg-lightSecondary rounded-lg p-4 max-w-xl"
                            onChange={(e) => (password.current = e.target.value)}
                        />
                    </div>
                    <button disabled={loading} className="bg-primary w-full max-w-xl rounded-lg p-4 text-white font-bold block mt-8">
                        {loading ? <BiLoader className="mx-auto" /> : 'LOG IN'}
                    </button>
                </form>
            </div>
        </div>
    );
}
