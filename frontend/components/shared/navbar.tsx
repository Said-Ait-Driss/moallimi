'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { IoIosArrowRoundForward } from "react-icons/io";
import { MdOutlineMenu, MdMenuOpen } from "react-icons/md";
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { SET_ROLE } from '@/store/features/auth/authSlice';


export default function NavBar() {
    const [isOpen, setIsOpen] = useState(false);

    const dispatch = useDispatch(); 
    const router = useRouter();

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };
    const handleNavigation = (path:string)=>{
        dispatch(SET_ROLE("student"));
        router.push(path)
    }
    return (
        <nav className="bg-lightPrimary p-4 md:px-28">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-primaryText text-lg font-bold">MyLogo</div>
                <div className="hidden md:flex flex-grow justify-center space-x-4">
                    <Link href="/" className="text-secondText hover:text-primaryText">
                        Home
                    </Link>
                    <Link href="/teachers" className="text-secondText hover:text-primaryText">
                        Teachers
                    </Link>
                    <Link href="/pricing" className="text-secondText hover:text-primaryText">
                        Pricing
                    </Link>
                    <Link href="/about" className="text-secondText hover:text-primaryText">
                        About
                    </Link>
                    <Link href="/contact" className="text-secondText hover:text-primaryText">
                        Contact
                    </Link>
                </div>
                <div className="hidden md:flex space-x-4">
                    <button onClick={()=>handleNavigation("/auth/login")} className="text-primary px-7 py-3 hover:text-darkPrimary font-bold">
                        Login
                    </button>
                    <button onClick={()=>handleNavigation("/auth/register")} className="bg-primary text-white px-7 py-3 rounded-xl hover:bg-primary/90 font-bold flex items-center space-x-3">
                        Join Us
                        <IoIosArrowRoundForward />
                    </button>
                </div>
                <div className="md:hidden">
                    <button onClick={toggleMenu} className="text-gray-300 hover:text-white focus:outline-none">
                        {isOpen ? <MdMenuOpen color='#3BCF41' size={30} /> : <MdOutlineMenu color='#3BCF41' size={30} />}
                    </button>
                </div>
            </div>
            {isOpen && (
                <div className="md:hidden">
                    <div className="flex flex-col mt-4">
                        <a href="#" className="block text-secondText hover:text-primaryText py-2">
                            Home
                        </a>
                        <a href="#" className="block text-secondText hover:text-primaryText py-2">
                            About
                        </a>
                        <a href="#" className="block text-secondText hover:text-primaryText py-2">
                            Services
                        </a>
                        <a href="#" className="block text-secondText hover:text-primaryText py-2">
                            Contact
                        </a>
                        <div className="flex flex-col mt-4">
                            <Link href="/login" className="text-primary px-7 py-3  hover:text-primaryText">
                                Login
                            </Link>
                            <a href="#" className="bg-primary text-white px-7 py-3 rounded-lg hover:bg-primary/90">
                                Join Us
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}
