'use client';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectRole, SET_ERROR } from '@/store/features/auth/authSlice';
import { RootState } from '@/store/redux';
import { useAppDispatch } from '@/hooks/appHooks';
import { BiLoader } from 'react-icons/bi';
import { registerUser } from '@/store/features/auth/authAction';
import ErrorAlert from '@/components/shared/errorAlert';
import SuucessAlert from '@/components/shared/successAlert';
import { useRouter } from 'next/navigation';

export default function Register() {
    const role = useSelector(selectRole);
    const dispatch = useAppDispatch();
    const router = useRouter();

    const loading = useSelector((state: RootState) => state.auth.loading);
    const error = useSelector((state: RootState) => state.auth.error);
    const successMessage = useSelector((state: RootState) => state.auth.successMessage);

    const [user, setUser] = useState({
        username: '',
        email: '',
        firstName: '',
        lastName: '',
        password: '',
        role
    });
    useEffect(() => {
        setUser((prevUser) => ({
            ...prevUser,
            role: role
        }));
    }, [role]);

    const registerHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!user.email || !user.password || !user.username || !user.firstName || !user.lastName) {
            dispatch(SET_ERROR('all fileds are mendatory'));
            return;
        }
        dispatch(SET_ERROR(''));
        const resultAction = await dispatch(registerUser(user));
        if (registerUser.fulfilled.match(resultAction)) {
            router.replace('/auth/login');
        }
    };
    return (
        <div className="flex bg-lightPrimary min-h-screen">
            <div className="flex-1 p-4 ps-28 mt-12">
                <h3 className="text-primaryText font-bold text-8xl my-8 leading-snug">SIGN UP AS {role?.toUpperCase()} FOR IMMEDIATE ACCESS </h3>
                <p className="text-secondText font-base my-8">
                    If you already have an account. you can{' '}
                    <Link href="/auth/login" className="text-primary">
                        Sign In here
                    </Link>
                </p>
            </div>
            <div className="flex-1 p-4 pe-0 mt-20">
                <form className="bg-transparent rounded-lg p-4" onSubmit={registerHandler}>
                    <div className="flex flex-col gap-4  max-w-xl">
                        {error && <ErrorAlert title="There were errors with your submission" message={error} />}
                        {successMessage && <SuucessAlert title="Registraion completed !" message={successMessage} />}
                    </div>
                    <div className="flex flex-col gap-4 mb-2">
                        <label htmlFor="username" className="text-secondText font-base">
                            Username :{' '}
                        </label>
                        <input
                            type="text"
                            placeholder="example123"
                            required
                            id="username"
                            className="bg-lightSecondary rounded-lg p-4 max-w-xl"
                            value={user.username}
                            onChange={(e: any) => setUser({ ...user, username: e.target.value })}
                        />
                    </div>
                    <div className="flex flex-col gap-4 mb-2">
                        <label htmlFor="email" className="text-secondText font-base">
                            Email :{' '}
                        </label>
                        <input
                            type="email"
                            required
                            placeholder="example@gmail.com"
                            id="email"
                            className="bg-lightSecondary rounded-lg p-4 max-w-xl"
                            value={user.email}
                            onChange={(e: any) => setUser({ ...user, email: e.target.value })}
                        />
                    </div>
                    <div className="flex flex-col gap-4 mb-2">
                        <label htmlFor="firstName" className="text-secondText font-base">
                            First Name :{' '}
                        </label>
                        <input
                            type="firstName"
                            required
                            placeholder="Your first name"
                            id="firstName"
                            className="bg-lightSecondary rounded-lg p-4 max-w-xl"
                            value={user.firstName}
                            onChange={(e: any) => setUser({ ...user, firstName: e.target.value })}
                        />
                    </div>
                    <div className="flex flex-col gap-4 mb-2">
                        <label htmlFor="lastName" className="text-secondText font-base">
                        Last Name :{' '}
                        </label>
                        <input
                            type="lastName"
                            required
                            placeholder="Your last name here"
                            id="lastName"
                            className="bg-lightSecondary rounded-lg p-4 max-w-xl"
                            value={user.lastName}
                            onChange={(e: any) => setUser({ ...user, lastName: e.target.value })}
                        />
                    </div>
                    <div className="flex flex-col gap-4 mb-2">
                        <label htmlFor="password" className="text-secondText font-base">
                            Password :{' '}
                        </label>
                        <input
                            type="password"
                            required
                            placeholder="your password here"
                            id="password"
                            className="bg-lightSecondary rounded-lg p-4 max-w-xl"
                            value={user.password}
                            onChange={(e: any) => setUser({ ...user, password: e.target.value })}
                        />
                    </div>
                    <button disabled={loading} className="bg-primary w-full max-w-xl rounded-lg p-4 text-white font-bold block mt-8" type="submit">
                        {loading ? <BiLoader className="mx-auto" /> : 'SIGN UP'}
                    </button>
                </form>
            </div>
        </div>
    );
}
