'use client';

import { ChevronRightIcon, ShareIcon, XMarkIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';
import { BellAlertIcon  } from '@heroicons/react/24/outline';
import { BiComment, BiWorld } from 'react-icons/bi';
import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';

const candidates = [
    {
        id: 1,
        name: 'Emily Selman',
        academicLevel: '1 bac',
        imageUrl:
            'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        appliedDatetime: '2020-07-01T15:34:56',
    },
    {
        id: 2,
        name: 'Emily Selman',
        academicLevel: '1 bac',
        imageUrl:
            'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        appliedDatetime: '2020-07-01T15:34:56',
    },
    {
        id: 3,
        name: 'Emily Selman',
        academicLevel: '1 bac',
        imageUrl:
            'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        appliedDatetime: '2020-07-01T15:34:56',
    },
    {
        id: 4,
        name: 'Emily Selman',
        academicLevel: '1 bac',
        imageUrl:
            'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        appliedDatetime: '2020-07-01T15:34:56',
    }
];

export default function LessonCard({ lesson }: any) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [openModal, setOpenModal] = useState(false);

    // Function to toggle the expanded state
    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    const isLongText = lesson.description.length > 150;

    return (
        <div className="max-w-3xl border p-4 rounded-lg mx-auto my-2">
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
            <div className="text-sm my-2">
                <Link href={'/dashboard/lessondetails?lessinId=' + lesson.id}>
                    {isExpanded ? lesson.description : `${lesson.description.substring(0, 150)}${isLongText ? '...' : ''}`}
                </Link>
                {isLongText && (
                    <button onClick={toggleExpand} className="text-gray-400">
                        {isExpanded ? ' Read Less' : 'Read More'}
                    </button>
                )}
            </div>

            <div className="flex text-sm text-gray-500 justify-between">
                <button className="" onClick={() => setOpenModal(true)}>
                    600 subscribers
                </button>
                <span>Remote</span>
                <span className="text-red-600">Ended</span>
            </div>
            <div className="flex space-x-4 p-4">
                <button className="flex items-center pe-4 border-e">
                    <BellAlertIcon className="size-5 text-gray-600 me-2" />
                    <span className="text-gray-600">Subscribe</span>
                </button>
                <Link  href={'/dashboard/lessondetails?lessinId=' + lesson.id}>
                    <span className="flex items-center pe-4 border-e">
                        <BiComment className="size-5 text-gray-600 me-2" />
                        <span className="text-gray-600">13K</span>
                    </span>
                </Link>
                <button className="flex space-x-2 items-center">
                    <ShareIcon className="size-5 text-gray-600 me-2" />
                    <span className="text-gray-600">Share</span>
                </button>
            </div>

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
                                    <p className='text-center text-gray-400 text-sm'> list of students applied to the lesson.</p>
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
                                                                    <p className="text-sm font-medium text-purple-600 truncate">{candidate.name}</p>
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
                                    <button className='text-sm text-gray-400 py-2 mx-auto'>Show more</button>
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition.Root>
        </div>
    );
}
