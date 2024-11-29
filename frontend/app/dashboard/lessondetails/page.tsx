'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState, Fragment } from 'react';
import { useSearchParams } from 'next/navigation';
import { ShareIcon } from '@heroicons/react/24/outline';
import LessonComments from '@/components/dashboard/lessondetails/lessonComments';
import { BellAlertIcon } from '@heroicons/react/24/outline';
import { BiWorld } from 'react-icons/bi';
import { Dialog, Transition } from '@headlessui/react';
import { ChevronRightIcon, XMarkIcon } from '@heroicons/react/24/solid';

const lessons: any = [
    {
        id: 1,
        title: 'lessons 1 on math with 1 hour',
        description:
            'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Lorem ipsum dolor sit amet, consectetur adipisicing elit.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsum quo fugiat a. Consequatur quasi delectus voluptate esse, excepturi, repellendus culpa aperiam sunt quos non dolores, optio vel. Aliquam, ab delectus?',
        lessonCategory: {
            id: 1,
            name: 'math',
            duration: 'shourt'
        },
        date: '12-12-2024',
        startTime: '10:00',
        endTime: '11:00',
        teacher: {
            id: 1,
            name: 'Mr. Smith',
            email: 'smith@gmail.com',
            phone: '123456789',
            image: '/user-cover-2.png',
            bio: 'Mr. Smith is a math teacher',
            academicSpecialist: 'primary school'
        },
        classe: {
            id: 1,
            name: '1 TH Primary school',
            academicLevel: 'primary school',
            academicYear: 2024,
            description: 'some random description goes here'
        }
    },
    {
        id: 2,
        title: 'lessons 1 on math with 1 hour',
        description:
            'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsum quo fugiat a. Consequatur quasi delectus voluptate esse, excepturi, repellendus culpa aperiam sunt quos non dolores, optio vel. Aliquam, ab delectus?',
        lessonCategory: {
            id: 1,
            name: 'math',
            duration: 'shourt'
        },
        date: '12-12-2024',
        startTime: '10:00',
        endTime: '11:00',
        teacher: {
            id: 1,
            name: 'Mr. Smith',
            email: 'smith@gmail.com',
            phone: '123456789',
            image: '/user-cover-1.png',
            bio: 'Mr. Smith is a math teacher',
            academicSpecialist: 'primary school'
        },
        classe: {
            id: 1,
            name: '1 TH Primary school',
            academicLevel: 'primary school',
            academicYear: 2024,
            description: 'some random description goes here'
        }
    },
    {
        id: 3,
        title: 'lessons 1 on math with 1 hour',
        description:
            'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsum quo fugiat a. Consequatur quasi delectus voluptate esse, excepturi, repellendus culpa aperiam sunt quos non dolores, optio vel. Aliquam, ab delectus?',
        lessonCategory: {
            id: 1,
            name: 'math',
            duration: 'shourt'
        },
        date: '12-12-2024',
        startTime: '10:00',
        endTime: '11:00',
        teacher: {
            id: 1,
            name: 'Mr. Smith',
            email: 'smith@gmail.com',
            phone: '123456789',
            image: '/user-cover-4.png',
            bio: 'Mr. Smith is a math teacher',
            academicSpecialist: 'primary school'
        },
        classe: {
            id: 1,
            name: '1 TH Primary school',
            academicLevel: 'primary school',
            academicYear: 2024,
            description: 'some random description goes here'
        }
    },
    {
        id: 4,
        title: 'lessons 1 on math with 1 hour',
        description:
            'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsum quo fugiat a. Consequatur quasi delectus voluptate esse, excepturi, repellendus culpa aperiam sunt quos non dolores, optio vel. Aliquam, ab delectus?',
        lessonCategory: {
            id: 1,
            name: 'math',
            duration: 'shourt'
        },
        date: '12-12-2024',
        startTime: '10:00',
        endTime: '11:00',
        teacher: {
            id: 1,
            name: 'Mr. Smith',
            email: 'smith@gmail.com',
            phone: '123456789',
            image: '/user-cover-1.png',
            bio: 'Mr. Smith is a math teacher',
            academicSpecialist: 'primary school'
        },
        classe: {
            id: 1,
            name: '1 TH Primary school',
            academicLevel: 'primary school',
            academicYear: 2024,
            description: 'some random description goes here'
        }
    }
];
const candidates = [
    {
        id: 1,
        name: 'Emily Selman',
        academicLevel: '1 bac',
        imageUrl:
            'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        appliedDatetime: '2020-07-01T15:34:56'
    },
    {
        id: 2,
        name: 'Emily Selman',
        academicLevel: '1 bac',
        imageUrl:
            'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        appliedDatetime: '2020-07-01T15:34:56'
    },
    {
        id: 3,
        name: 'Emily Selman',
        academicLevel: '1 bac',
        imageUrl:
            'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        appliedDatetime: '2020-07-01T15:34:56'
    },
    {
        id: 4,
        name: 'Emily Selman',
        academicLevel: '1 bac',
        imageUrl:
            'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        appliedDatetime: '2020-07-01T15:34:56'
    }
];

export default function LessonDetails() {
    const [lesson, setLesson]: any = useState(null);
    const [openModal, setOpenModal] = useState(false);

    const searchParams = useSearchParams();

    useEffect(() => {
        const lessonId = searchParams.get('lessinId');
        setLesson(lessons.find((item: any) => (item.id = lessonId)));
    }, []);

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-6">
            <div className="col-span-1"></div>
            {lesson && (
                <div className="col-span-8">
                    <div className="max-w-3xl border p-4 rounded mx-auto my-2">
                        <div className="flex">
                            <img src={lesson.teacher.image} alt="" className="w-16 h-16 rounded-full" />
                            <div className="p-2">
                                <Link href={'/dashboard/profile'}>
                                    <strong>Said Ait Driss</strong>
                                </Link>
                                <div className="text-xs text-gray-500">Data Analyst</div>
                                <div className="text-xs text-gray-500">4 d</div>
                            </div>
                        </div>
                        <div className="text-sm my-2">{lesson.description}</div>
                        <div className="flex text-sm text-gray-500 justify-between">
                            <button className="" onClick={() => setOpenModal(true)}>600 subscribers</button>
                            <span>Remote</span>
                            <span className="text-red-600">Ended</span>
                        </div>
                        <div className="flex space-x-4 p-4">
                            <button className="flex items-center pe-4 border-e">
                                <BellAlertIcon className="size-5 text-gray-600 me-2" />
                                <span className="text-gray-600">Subscribe</span>
                            </button>
                            <button className="flex space-x-2 items-center">
                                <ShareIcon className="size-5 text-gray-600 me-2" />
                                <span className="text-gray-600">Share</span>
                            </button>
                        </div>
                    </div>
                    <LessonComments />
                    {/* subscribers modal */}
                    <Transition.Root show={openModal} as={Fragment}>
                        <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" open={openModal} onClose={() => setOpenModal(false)}>
                            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                                {/* This element is to trick the browser into centering the modal contents. */}
                                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                                    &#8203;
                                </span>
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                    enterTo="opacity-100 translate-y-0 sm:scale-100"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                    leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                >
                                    <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                                        <button onClick={() => setOpenModal(false)} className="float-end">
                                            <XMarkIcon className="size-5 text-gray-600 me-1" />
                                        </button>
                                        <div>
                                            <p className="text-center text-gray-400 text-sm"> list of students applied to the lesson.</p>
                                            <ul role="list" className="mt-5 border-t border-gray-200 divide-y divide-gray-200 sm:mt-0 sm:border-t-0">
                                                {candidates.map((candidate) => (
                                                    <li key={candidate.id}>
                                                        <Link href="/dashboard/profile" className="group block">
                                                            <div className="flex items-center py-3 px-4 sm:py-4 sm:px-0">
                                                                <div className="min-w-0 flex-1 flex items-center">
                                                                    <div className="flex-shrink-0">
                                                                        <img
                                                                            className="h-12 w-12 rounded-full group-hover:opacity-75"
                                                                            src={candidate.imageUrl}
                                                                            alt=""
                                                                        />
                                                                    </div>
                                                                    <div className="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
                                                                        <div>
                                                                            <p className="text-sm font-medium text-purple-600 truncate">
                                                                                {candidate.name}
                                                                            </p>
                                                                            <p className="mt-1 flex items-center text-sm text-gray-500">
                                                                                <BiWorld
                                                                                    className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                                                                                    aria-hidden="true"
                                                                                />
                                                                                <span className="truncate">{candidate.academicLevel}</span>
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div>
                                                                    <ChevronRightIcon
                                                                        className="h-5 w-5 text-gray-400 group-hover:text-gray-700"
                                                                        aria-hidden="true"
                                                                    />
                                                                </div>
                                                            </div>
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                            <button className="text-sm text-gray-400 py-2 mx-auto">Show more</button>
                                        </div>
                                    </div>
                                </Transition.Child>
                            </div>
                        </Dialog>
                    </Transition.Root>
                </div>
            )}
            <div className="col-span-3">
                <div className="flex items-center justify-center border rounded bg-lightPrimary max-w-72">
                    <div className="m-4">
                        <img
                            src="https://media.licdn.com/media/AAYQAgTPAAgAAQAAAAAAADVuOvKzTF-3RD6j-qFPqhubBQ.png"
                            alt=""
                            className="rounded mx-auto"
                        />
                        <div className="flex flex-wrap justify-center mt-2 gap-3 text-gray-500">
                            <small>Infos</small>
                            <small>Accessibilité</small>
                            <small>Assistance clientèle</small>
                            <small>Préférences Pubs</small>
                            <small>Publicité</small>
                            MyLogo Corporation © 2024
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
