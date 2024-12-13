'use client';

import { PiStudent, PiChalkboardTeacher, PiBell } from 'react-icons/pi';
import { MdOutlineSpaceDashboard, MdOutlinePlayLesson, MdOutlinePerson3, MdLogout } from 'react-icons/md';
import { IoBookOutline, IoSettingsOutline } from 'react-icons/io5';
import { SiBasicattentiontoken } from 'react-icons/si';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { BellIcon } from '@heroicons/react/24/solid';

export default function SideBar() {
    const pathname = usePathname();
    const { data: session, status } = useSession();

    const isActive = (href: string) => pathname === href;

    return (
        <div className="flex flex-col mt-4 ml-8 w-64">
            <div className="flex items-center justify-center border rounded bg-lightPrimary ">
                <Link href={'/dashboard/profile?id=' + session?.user.id} className="m-4 text-center">
                    <Image src="/user-cover-2.png" alt="" width={80} height={80} className="rounded-full mx-auto" />
                    <div className="text-center">
                        <small className="text-center">Welcome back !</small>
                    </div>
                    {status != 'loading' && (
                        <strong className="my-4 text-center mx-auto"> {session?.user.firstName + ' ' + session?.user.lastName}</strong>
                    )}
                </Link>
            </div>
            <div className="max-h-96 overflow-y-auto overflow-x-hidden flex-grow border rounded bg-lightPrimary my-2">
                <ul className="flex flex-col py-4 space-y-1">
                    <li className="px-5">
                        <div className="flex flex-row items-center h-8">
                            <div className="text-sm font-light tracking-wide text-gray-500">Menu</div>
                        </div>
                    </li>
                    {status != 'loading' && session?.user.roles.includes('ROLE_ADMIN') ? (
                        <li>
                            <Link
                                href="/dashboard/state"
                                className={`relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 hover:border-primary pr-6 ${isActive('/dashboard/state') ? ' border-l-4 border-primary bg-gray-50' : ''}`}
                            >
                                <span className="inline-flex justify-center items-center ml-4">
                                    <MdOutlineSpaceDashboard />
                                </span>
                                <span className="ml-2 text-sm tracking-wide truncate">Dashboard</span>
                            </Link>
                        </li>
                    ) : (
                        ''
                    )}
                    <li>
                        <Link
                            href="/dashboard/notification"
                            className={`relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 hover:border-primary pr-6 ${isActive('/dashboard/notification') ? ' border-l-4 border-primary bg-gray-50' : ''}`}
                        >
                            <span className="inline-flex justify-center items-center ml-4">
                                <PiBell />
                            </span>
                            <span className="ml-2 text-sm tracking-wide truncate">Notifications</span>
                            <span className="px-2 py-0.5 ml-auto text-xs font-medium tracking-wide text-primary bg-indigo-50 rounded-full">New</span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/dashboard/student"
                            className={`relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 hover:border-primary pr-6 ${isActive('/dashboard/student') ? ' border-l-4 border-primary bg-gray-50' : ''}`}
                        >
                            <span className="inline-flex justify-center items-center ml-4">
                                <PiStudent />
                            </span>
                            <span className="ml-2 text-sm tracking-wide truncate">Students</span>
                            <span className="px-2 py-0.5 ml-auto text-xs font-medium tracking-wide text-primary bg-indigo-50 rounded-full">New</span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/dashboard/teacher"
                            className={`relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 hover:border-primary pr-6 ${isActive('/dashboard/teacher') ? ' border-l-4 border-primary bg-gray-50' : ''}`}
                        >
                            <span className="inline-flex justify-center items-center ml-4">
                                <PiChalkboardTeacher />
                            </span>
                            <span className="ml-2 text-sm tracking-wide truncate">Teachers</span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/dashboard/lesson"
                            className={`relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 hover:border-primary pr-6 ${isActive('/dashboard/lesson') ? ' border-l-4 border-primary bg-gray-50' : ''}`}
                        >
                            <span className="inline-flex justify-center items-center ml-4">
                                <MdOutlinePlayLesson />
                            </span>
                            <span className="ml-2 text-sm tracking-wide truncate">Lessons</span>
                            <span className="px-2 py-0.5 ml-auto text-xs font-medium tracking-wide text-red-500 bg-red-50 rounded-full">1.2k</span>
                        </Link>
                    </li>
                    {status != 'loading' && session?.user.roles?.includes('ROLE_STUDENT') ? (
                        <li>
                            <Link
                                href="/dashboard/mylessons"
                                className={`relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 hover:border-primary pr-6 ${isActive('/dashboard/mylessons') ? ' border-l-4 border-primary bg-gray-50' : ''}`}
                            >
                                <span className="inline-flex justify-center items-center ml-4">
                                    <MdOutlinePlayLesson />
                                </span>
                                <span className="ml-2 text-sm tracking-wide truncate">My Lessons</span>
                                <span className="px-2 py-0.5 ml-auto text-xs font-medium tracking-wide text-red-500 bg-red-50 rounded-full">
                                    1.2k
                                </span>
                            </Link>
                        </li>
                    ) : (
                        ''
                    )}
                    <li>
                        <Link
                            href="/dashboard/classe"
                            className={`relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 hover:border-primary pr-6 ${isActive('/dashboard/classe') ? ' border-l-4 border-primary bg-gray-50' : ''}`}
                        >
                            <span className="inline-flex justify-center items-center ml-4">
                                <IoBookOutline />
                            </span>
                            <span className="ml-2 text-sm tracking-wide truncate">Classe</span>
                            <span className="px-2 py-0.5 ml-auto text-xs font-medium tracking-wide text-red-500 bg-red-50 rounded-full">1.2k</span>
                        </Link>
                    </li>
                    {status != 'loading' && session?.user.roles.includes('ROLE_ADMIN') ? (
                        <li>
                            <Link
                                href="/dashboard/subscription"
                                className={`relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 hover:border-primary pr-6 ${isActive('/dashboard/subscription') ? ' border-l-4 border-primary bg-gray-50' : ''}`}
                            >
                                <span className="inline-flex justify-center items-center ml-4">
                                    <SiBasicattentiontoken />
                                </span>
                                <span className="ml-2 text-sm tracking-wide truncate">Subscriptions</span>
                                <span className="px-2 py-0.5 ml-auto text-xs font-medium tracking-wide text-red-500 bg-red-50 rounded-full">
                                    1.2k
                                </span>
                            </Link>
                        </li>
                    ) : null}
                </ul>
            </div>

            <div className="max-h-56 overflow-y-auto overflow-x-hidden flex-grow border rounded bg-lightPrimary my-2">
                <ul className="flex flex-col py-4 space-y-1">
                    <li className="px-5">
                        <div className="flex flex-row items-center h-8">
                            <div className="text-sm font-light tracking-wide text-gray-500">Settings</div>
                        </div>
                    </li>
                    <li>
                        <Link
                            href={'/dashboard/profile?id=' + session?.user.id}
                            className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-primary pr-6"
                        >
                            <span className="inline-flex justify-center items-center ml-4">
                                <MdOutlinePerson3 />
                            </span>
                            <span className="ml-2 text-sm tracking-wide truncate">Profile</span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/dashboard/setting"
                            className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-primary pr-6"
                        >
                            <span className="inline-flex justify-center items-center ml-4">
                                <IoSettingsOutline />
                            </span>
                            <span className="ml-2 text-sm tracking-wide truncate">Settings</span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="#"
                            className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-primary pr-6"
                        >
                            <span className="inline-flex justify-center items-center ml-4">
                                <MdLogout />
                            </span>
                            <span className="ml-2 text-sm tracking-wide truncate">Logout</span>
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
}
