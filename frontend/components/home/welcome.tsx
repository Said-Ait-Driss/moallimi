"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { SET_ROLE } from '@/store/features/auth/authSlice';

export default function Welcome() {

    const dispatch = useDispatch(); 
    const router = useRouter();

    const handleNavigation = (path:string, role:string)=>{
        dispatch(SET_ROLE(role));
        router.push(path)
    }

    return (
        <div className='flex bg-lightPrimary'>
            <div className='flex-1 p-4 ps-28 mt-28'>
                <strong className='text-primary my-8'>For Better Future</strong>
                <h3 className='text-primaryText font-bold text-8xl my-8 leading-snug'>25K+ STUDENTS <br /> AND TEACHERS <br /> TRUST US</h3>
                <p className='text-secondText font-bold my-8'>Every day brings with it a fresh set of learning possibilities.</p>
                <p className='text-secondText font-light my-8 max-w-2xl'>Join us  as a student and have a banch of learning benifites, or as a parent and manage your kids learning journey with us.</p>
                <div className='flex space-x-3 my-8'>
                    <button onClick={()=>handleNavigation("/auth/register","student")} className="bg-primary text-white px-7 py-3 rounded-xl hover:bg-primary/90 font-bold flex items-center space-x-3">
                        Join Us Now
                    </button>
                    <button onClick={()=>handleNavigation("/auth/register","parent")} className="text-primary px-7 py-3 hover:text-darkPrimary rounded-xl border border-primary">
                        I am a parent
                    </button>
                </div>
                
            </div>
            <div className='flex-1 p-4 pe-0'>
            <Image
                src="/student.png" 
                alt="moallii students"
                layout='responsive'
                width={600}
                height={400}
            />
            </div>
        </div>
    )
}