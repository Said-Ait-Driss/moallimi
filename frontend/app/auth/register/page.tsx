'use client';
import Link from 'next/link';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectRole } from '@/store/features/auth/authSlice';

export default function Register() {

    const role = useSelector(selectRole);

    return(
        <div className="flex bg-lightPrimary min-h-screen">
            <div className="flex-1 p-4 ps-28 mt-28">
                <h3 className="text-primaryText font-bold text-8xl my-8 leading-snug">SIGN UP AS {role.toUpperCase()} FOR IMMEDIATE ACCESS </h3>
                <p className="text-secondText font-base my-8">If you already have an account. you can <Link href="/auth/login" className='text-primary'>Sign In here</Link></p>
            </div>
            <div className="flex-1 p-4 pe-0 mt-40">
                <form className="bg-transparent rounded-lg p-4">
                    <div className="flex flex-col gap-4 mb-2">
                        <label   htmlFor="email" className="text-secondText font-base">Email : </label>
                        <input type="email" placeholder='example@gmail.com' id='email' className="bg-lightSecondary rounded-lg p-4 max-w-xl" />
                    </div>
                    <div className="flex flex-col gap-4 mb-2">
                        <label htmlFor="password" className="text-secondText font-base">Password : </label>
                        <input type="password" placeholder='your password here' id='password' className="bg-lightSecondary rounded-lg p-4 max-w-xl" />
                    </div>
                    <button className="bg-primary w-full max-w-xl rounded-lg p-4 text-white font-bold block mt-8">SIGN UP</button>
                </form>
            </div>
        </div>
    )
}