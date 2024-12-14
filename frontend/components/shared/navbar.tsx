'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { IoIosArrowRoundForward } from 'react-icons/io';
import { MdOutlineMenu, MdMenuOpen } from 'react-icons/md';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { SET_ROLE } from '@/store/features/auth/authSlice';
import { useSession } from 'next-auth/react';
import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { signOut } from 'next-auth/react';
import WebSocketService from '@/providers/webSocket.provider';
import Notification from './Notification';
import { ADD_NEW_NOTIFICATION, selectNotifications } from '@/store/features/notification/notificationSlice';

function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ');
}

export default function NavBar() {
    const [isOpen, setIsOpen] = useState(false);
    const [show, setShow] = useState(false);
    const [alert, setAlert] = useState({ title: '', message: '', type: '' });

    const notifications = useSelector(selectNotifications);

    const { data: session, status } = useSession();
    const teacherId = session?.user.id;

    const dispatch = useDispatch();
    const router = useRouter();

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };
    const handleNavigation = (path: string) => {
        dispatch(SET_ROLE('student'));
        router.push(path);
    };

    useEffect(() => {
        WebSocketService.connect((notification: any) => {
            dispatch(ADD_NEW_NOTIFICATION(notification));
        }, teacherId);

        return () => {
            WebSocketService.disconnect();
        };
    }, [teacherId]);
    useEffect(() => {
        console.log('Updated notifications: ', notifications);
        if (notifications.length > 0) {
            setAlert({
                title: 'new Notification',
                message: notifications[notifications.length - 1].content,
                type: 'info'
            });
            setShow(true);
        }
    }, [notifications]);

    const logout = async (e: any) => {
        e.preventDefault();
        await signOut({ callbackUrl: '/auth/login', redirect: true });
    };
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
                {status != 'loading' &&
                    (!session ? (
                        <div className="hidden md:flex space-x-4">
                            <button
                                onClick={() => handleNavigation('/auth/login')}
                                className="text-primary px-7 py-3 hover:text-darkPrimary font-bold"
                            >
                                Login
                            </button>
                            <button
                                onClick={() => handleNavigation('/auth/register')}
                                className="bg-primary text-white px-7 py-3 rounded-xl hover:bg-primary/90 font-bold flex items-center space-x-3"
                            >
                                Join Us
                                <IoIosArrowRoundForward />
                            </button>
                        </div>
                    ) : (
                        <div className="hidden md:flex space-x-4">
                            <Menu as="div" className="relative inline-block text-left">
                                <div className="relative">
                                    <Menu.Button
                                        className={`inline-flex justify-center w-full rounded-full border border-gray-300 shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 ring-2 ring-offset-2 ring-offset-gray-100 ${session?.user?.roles?.[0] == 'ROLE_STUDENT' ? 'ring-primary outline-primary' : 'ring-indigo-400 outline-indigo-400'}`}
                                    >
                                        <span className="inline-block h-10 w-10 rounded-full overflow-hidden bg-gray-100">
                                            <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                                            </svg>
                                        </span>
                                    </Menu.Button>
                                    {notifications.length ? (
                                        <span className="rounded-full bg-red-700 text-white p-2 px-3 text-xs font-bold absolute -top-3 -left-4">
                                            {notifications.length}
                                        </span>
                                    ) : (
                                        ''
                                    )}
                                </div>

                                <Transition
                                    as={Fragment}
                                    enter="transition ease-out duration-100"
                                    enterFrom="transform opacity-0 scale-95"
                                    enterTo="transform opacity-100 scale-100"
                                    leave="transition ease-in duration-75"
                                    leaveFrom="transform opacity-100 scale-100"
                                    leaveTo="transform opacity-0 scale-95"
                                >
                                    <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none">
                                        <div className="px-4 py-3">
                                            <p className="text-sm">Signed in as</p>
                                            <p className="text-sm font-medium text-gray-900 truncate">{session?.user?.email}</p>
                                        </div>
                                        <div className="py-1">
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <a
                                                        href="#"
                                                        className={classNames(
                                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                            'block px-4 py-2 text-sm'
                                                        )}
                                                    >
                                                        Account settings
                                                    </a>
                                                )}
                                            </Menu.Item>
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <Link
                                                        href="/dashboard/notification"
                                                        className={classNames(
                                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                            'block px-4 py-2 text-sm'
                                                        )}
                                                    >
                                                        Notifications
                                                    </Link>
                                                )}
                                            </Menu.Item>
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <a
                                                        href="#"
                                                        className={classNames(
                                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                            'block px-4 py-2 text-sm'
                                                        )}
                                                    >
                                                        License
                                                    </a>
                                                )}
                                            </Menu.Item>
                                        </div>
                                        <div className="py-1">
                                            <form method="POST" action="#">
                                                <Menu.Item>
                                                    {({ active }) => (
                                                        <button
                                                            onClick={logout}
                                                            type="submit"
                                                            className={classNames(
                                                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                                'block w-full text-left px-4 py-2 text-sm'
                                                            )}
                                                        >
                                                            Sign out
                                                        </button>
                                                    )}
                                                </Menu.Item>
                                            </form>
                                        </div>
                                    </Menu.Items>
                                </Transition>
                            </Menu>
                        </div>
                    ))}
                <div className="md:hidden">
                    <button onClick={toggleMenu} className="text-gray-300 hover:text-white focus:outline-none">
                        {isOpen ? <MdMenuOpen color="#3BCF41" size={30} /> : <MdOutlineMenu color="#3BCF41" size={30} />}
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
            <Notification type={alert.type} title={alert.title} message={alert.message} show={show} setShow={setShow} />
        </nav>
    );
}
