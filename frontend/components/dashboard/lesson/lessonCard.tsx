'use client';

import { ShareIcon, XMarkIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';
import { BellAlertIcon, StarIcon } from '@heroicons/react/24/solid';
import { BiComment } from 'react-icons/bi';
import React, { Fragment, useState } from 'react';
import { Dialog, DialogBackdrop, Transition } from '@headlessui/react';
import { CgRemote } from 'react-icons/cg';
import {  FaRegCalendarAlt, FaRegClock } from 'react-icons/fa';
import {  HiOutlineLocationMarker } from 'react-icons/hi';
import { getLessonSubscribers, subscribeToLesson, unsubscribeToLesson } from '@/store/features/lessonSubscription/lessonSubscriptionAction';
import { useAppDispatch } from '@/hooks/appHooks';
import { useSession } from 'next-auth/react';
import Notification from '@/components/shared/Notification';
import { SET_LESSON_SUBSCRIBED, SET_LESSON_UNSUBSCRIBED } from '@/store/features/lesson/lessonSlice';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/redux';
import LessonSubscriber from './lessonSubscriber';

 function LessonCard({ lessonProp }: any) {
    const subscriptionsCount = lessonProp.subscriptionsCount;
    const commentsCount = lessonProp.commentsCount;
    const isSubscribed = lessonProp.isSubscribed;
    const lesson = lessonProp.lesson;

    const filledStars = Math.round(4);
    const totalStars = 5;
    const isLongText = lesson.description.length > 150;

    const [isExpanded, setIsExpanded] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [show, setShow] = useState(false);
    const [alert, setAlert] = useState({ title: '', message: '', type: '' });

    const dispatch = useAppDispatch();
    const { data: session, status } = useSession();
    const lessons: any = useSelector((state: RootState) => state.lesson.lessons);

    const subscribers: any = useSelector((state: RootState) => state.lessonSubscription.subscribers);
    const loading: any = useSelector((state: RootState) => state.lessonSubscription.loading);
    const error: any = useSelector((state: RootState) => state.lessonSubscription.error);

    // Function to toggle the expanded state
    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    const subscribeToLessonHandler = async (lessonId: string) => {
        if (session?.user?.roles?.includes('ROLE_STUDENT')) {
            let isSubscribed = lessons.content?.find((item: any) => item.lesson.id == lessonId && item.isSubscribed == true);
            if (!isSubscribed) {
                const result: any = await dispatch(
                    subscribeToLesson({
                        lessonId,
                        studentId: session?.user.id
                    })
                );
                if (subscribeToLesson.fulfilled.match(result)) {
                    await dispatch(SET_LESSON_SUBSCRIBED(lessonId));
                    setShow(true);
                    setAlert({
                        title: 'Subscribed successfully !',
                        message: 'you have Subscribed to the Lesson successfully !',
                        type: 'success'
                    });
                } else {
                    setShow(true);
                    setAlert({
                        title: 'All fields are required',
                        message: 'You must enter as student to subscribe to this lesson !',
                        type: 'error'
                    });
                }
            } else {
                const result: any = await dispatch(
                    unsubscribeToLesson({
                        lessonId,
                        studentId: session?.user.id
                    })
                );
                if (unsubscribeToLesson.fulfilled.match(result)) {
                    await dispatch(SET_LESSON_UNSUBSCRIBED(lessonId));
                    setShow(true);
                    setAlert({
                        title: 'UnSubscribed successfully !',
                        message: 'you have UnSubscribed to the Lesson successfully !',
                        type: 'success'
                    });
                } else {
                    setShow(true);
                    setAlert({
                        title: 'All fields are required',
                        message: 'You must enter as student to subscribe to this lesson !',
                        type: 'error'
                    });
                }
            }
        }
    };

    const getSubscribers = (lessonId: string) => {
        setOpenModal(true);
        const result = dispatch(getLessonSubscribers({ lessonId }));
    };
    return (
        <div className="max-w-3xl border border-gray-200  p-3 rounded-lg mx-auto my-4 bg-white">
            <div className="flex flex-row justify-between items-start">
                <div className="flex items-center">
                    <div>
                        {lesson.teacher.image ? (
                            <img
                                src={lesson.teacher.image}
                                className="w-16 h-16 rounded-full border-2 border-gray-300 shadow-sm outline outline-2 outline-indigo-400"
                                alt={`${lesson.teacher.firstName} ${lesson.teacher.lastName}`}
                            />
                        ) : (
                            <span className="inline-block h-16 w-16 rounded-full overflow-hidden bg-gray-100 border-2 border-gray-300 shadow-sm outline outline-2 outline-indigo-400">
                                <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                            </span>
                        )}
                        <p className="text-sm text-gray-600 flex items-center justify-center">
                            {[...Array(totalStars)].map((_, index) => (
                                <StarIcon key={index} className={`size-3 ${index < filledStars ? 'text-yellow-400' : ''}`} />
                            ))}
                        </p>
                    </div>
                    <div className="ml-2 mb-5">
                        <Link href={'/dashboard/profile?id=' + lesson.teacher.id}>
                            <strong className="text-lg text-gray-800 hover:text-gray-600 transition duration-200">
                                {lesson.teacher.firstName} {lesson.teacher.lastName}
                            </strong>
                        </Link>
                        <div className="text-xs text-gray-500">{lesson.teacher.academicSpecialist?.name ?? 'Unknown'}</div>
                        <div className="text-xs text-gray-500">{new Date(lesson.createdAt).toLocaleDateString()}</div>
                    </div>
                </div>
                <div className="self-start">
                    {lesson.date && new Date(lesson.date).getTime() < new Date().getTime() ? (
                        <span className="flex items-center space-x-2 p-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition duration-200">
                            <FaRegClock className="text-md" />
                            <span className="font-medium text-sm">Ended</span>
                        </span>
                    ) : (
                        <span className="flex items-center space-x-2 p-2 rounded-lg bg-green-100 text-green-600 hover:bg-green-200 transition duration-200">
                            <FaRegCalendarAlt className="text-md" />
                            <span className="font-medium text-sm">
                                {lesson.date ? `${new Date(lesson.date).toLocaleDateString()} - ${lesson.starTime }`: ""}
                            </span>
                        </span>
                    )}
                </div>
            </div>

            <div className="text-sm my-4">
                <Link href={'/dashboard/lessondetails?lessonId=' + lesson.id} className="text-gray-800 hover:text-gray-600 transition duration-200">
                    {isExpanded ? lesson.description : `${lesson.description.substring(0, 150)}${isLongText ? '...' : ''}`}
                </Link>
                {isLongText && (
                    <button onClick={toggleExpand} className="text-gray-400 hover:text-gray-600 transition duration-200">
                        {isExpanded ? ' Read Less' : 'Read More'}
                    </button>
                )}
            </div>

            <div className="flex text-sm text-gray-500 justify-between">
                <button className="hover:text-gray-600 transition duration-200" onClick={() => getSubscribers(lesson.id)}>
                    {subscriptionsCount} subscribers
                </button>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800"> {lesson.classe?.title?.toUpperCase()} </span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-pink-100 text-pink-800"> {lesson.lessonCategory?.lessonCategory} </span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800"> {lesson.lessonType.type} </span>
            </div>

            <div className="flex space-x-4 p-2 items-center border-t border-gray-200 mt-4">
                {session?.user.roles.includes('ROLE_STUDENT') ? (
                    <button onClick={() => subscribeToLessonHandler(lesson.id)} className="flex items-center pe-4 transition duration-200">
                        <BellAlertIcon className={`size-5 me-2 ${isSubscribed ? 'text-primary' : 'text-gray-600'}`} />
                        <span className={isSubscribed ? 'text-primary' : 'text-gray-600'}>{isSubscribed ? 'Subscribed' : 'Subscribe'}</span>
                    </button>
                ) : (
                    ''
                )}

                <Link href={'/dashboard/lessondetails?lessonId=' + lesson.id} className="flex items-centerpe-4 border-etransition duration-200">
                    <BiComment className="size-5 text-gray-600 me-1" />
                    <span className="text-gray-600 text-sm">{commentsCount}</span>
                </Link>
                <button className="flex items-center transition duration-200">
                    <ShareIcon className="size-5 text-gray-600 me-2" />
                    <span className="text-gray-600">Share</span>
                </button>
            </div>

            {/* Subscribers Modal */}
            <Transition.Root show={openModal} as={Fragment}>
                <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" open={openModal} onClose={() => setOpenModal(false)}>
                    <DialogBackdrop className="fixed inset-0 bg-black/30" />
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
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
                                    <p className="text-center text-gray-400 text-sm">List of students applied to the lesson.</p>
                                    {loading ? (
                                        'loading'
                                    ) : (
                                        <>
                                            <ul role="list" className="mt-5 border-t border-gray-200 divide-y divide-gray-200 sm:mt-0 sm:border-t-0">
                                                {subscribers.map((item: any) => (
                                                    <LessonSubscriber item={item} />
                                                ))}
                                            </ul>
                                            <button className="text-sm text-gray-400 py-2 mx-auto hover:text-gray-600 transition duration-200">
                                                Show more
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition.Root>
            <Notification type={alert.type} title={alert.title} message={alert.message} show={show} setShow={setShow} />
        </div>
    );
}

export default React.memo(LessonCard)