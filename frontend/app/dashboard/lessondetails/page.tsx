'use client';

import Link from 'next/link';
import { useEffect, useState, Fragment } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { ShareIcon } from '@heroicons/react/24/outline';
import LessonComments from '@/components/dashboard/lessondetails/lessonComments';
import { BellAlertIcon } from '@heroicons/react/24/solid';
import { BiComment, BiWorld } from 'react-icons/bi';
import { Dialog, DialogBackdrop, Transition } from '@headlessui/react';
import { ChevronRightIcon, StarIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { useAppDispatch } from '@/hooks/appHooks';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/redux';
import { getLessonDetails } from '@/store/features/lesson/lessonAction';
import { FaRegCalendarAlt, FaRegClock } from 'react-icons/fa';
import { CgRemote } from 'react-icons/cg';
import { HiOutlineLocationMarker } from 'react-icons/hi';
import { useSession } from 'next-auth/react';
import { getLessonSubscribers, subscribeToLesson, unsubscribeToLesson } from '@/store/features/lessonSubscription/lessonSubscriptionAction';
import {
    SET_LESSON_DETAILS_SUBSCRIBED,
    SET_LESSON_DETAILS_UNSUBSCRIBED,
    SET_LESSON_SUBSCRIBED,
    SET_LESSON_UNSUBSCRIBED
} from '@/store/features/lesson/lessonSlice';
import Notification from '@/components/shared/Notification';
import LessonSubscriber from '@/components/dashboard/lesson/lessonSubscriber';

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
    const [openModal, setOpenModal] = useState(false);
    const router = useRouter();
    const searchParams = useSearchParams();
    const lessonId = searchParams.get('lessonId');
    const filledStars = Math.round(4);
    const totalStars = 5;

    const [show, setShow] = useState(false);
    const [alert, setAlert] = useState({ title: '', message: '', type: '' });

    const dispatch = useAppDispatch();
    const { data: session, status } = useSession();

    let studentId = session?.user.roles?.includes('ROLE_STUDENT') ? session?.user.id : -1;

    const lessonDetails: any = useSelector((state: RootState) => state.lesson.lesson);
    const loading: any = useSelector((state: RootState) => state.lesson.loading);
    const error: any = useSelector((state: RootState) => state.lesson.error);

    const subscribers: any = useSelector((state: RootState) => state.lessonSubscription.subscribers);
    const subscribersLoading: any = useSelector((state: RootState) => state.lessonSubscription.loading);
    const subscribersError: any = useSelector((state: RootState) => state.lessonSubscription.error);

    useEffect(() => {
        if (!lessonId) {
            router.replace('/404');
            return;
        }
        const result = dispatch(getLessonDetails({ lessonId, studentId }));
        return () => {
            result.abort();
        };
    }, []);

    const subscribeToLessonHandler = async (lessonId: string) => {
        if (session?.user?.roles?.includes('ROLE_STUDENT')) {
            let isSubscribed = lessonDetails.lesson.id == lessonId && lessonDetails.isSubscribed == true;
            if (!isSubscribed) {
                const result: any = await dispatch(
                    subscribeToLesson({
                        lessonId,
                        studentId: session?.user.id
                    })
                );
                if (subscribeToLesson.fulfilled.match(result)) {
                    await dispatch(SET_LESSON_DETAILS_SUBSCRIBED(lessonId));
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
                    await dispatch(SET_LESSON_DETAILS_UNSUBSCRIBED(lessonId));
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-6">
            <div className="col-span-1"></div>
            {loading && 'loading'}
            {!loading && !error && lessonDetails.lesson && (
                <div className="col-span-8">
                    <div className="max-w-3xl border p-4 rounded mx-auto my-2">
                        <div className="flex justify-between ">
                            <div className="flex items-center">
                                <div>
                                    {lessonDetails.lesson.teacher.image ? (
                                        <img
                                            src={lessonDetails.lesson.teacher.image}
                                            className="w-16 h-16 rounded-full border-2 border-gray-300 shadow-sm outline outline-2 outline-indigo-400"
                                            alt={`${lessonDetails.lesson.teacher.firstName} ${lessonDetails.lesson.teacher.lastName}`}
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
                                <div className="p-2 mb-5">
                                    <Link href={'/dashboard/profile'}>
                                        <strong>
                                            {lessonDetails.lesson.teacher.firstName} {lessonDetails.lesson.teacher.lastName}
                                        </strong>
                                    </Link>
                                    <div className="text-xs text-gray-500">{lessonDetails.lesson.teacher.academicSpecialist ?? 'Unkown'}</div>
                                    <div className="text-xs text-gray-500">{new Date(lessonDetails.lesson.createdAt).toDateString()}</div>
                                </div>
                            </div>
                            <div className="self-start">
                                {new Date(lessonDetails.lesson.date).getTime() < new Date().getTime() ? (
                                    <span className="flex items-center space-x-2 p-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition duration-200">
                                        <FaRegClock className="text-xl" />
                                        <span className="font-semibold text-sm">Ended</span>
                                    </span>
                                ) : (
                                    <span className="flex items-center space-x-2 p-2 rounded-lg bg-green-100 text-green-600 hover:bg-green-200 transition duration-200">
                                        <FaRegCalendarAlt className="text-xl" />
                                        <span className="font-semibold text-sm">
                                            {new Date(lessonDetails.lesson.date).toLocaleDateString()} - {lessonDetails.lesson.starTime}
                                        </span>
                                    </span>
                                )}
                            </div>
                        </div>
                        <div className="text-sm my-2">{lessonDetails.lesson.description}</div>
                        <div className="flex text-sm text-gray-500 justify-between">
                            <button className="" onClick={() => getSubscribers(lessonDetails.lesson.id)}>
                                {lessonDetails.subscriptionsCount} subscribers
                            </button>
                            <span className="flex items-center space-x-4">
                                {lessonDetails.lesson.lessonType.type.toLowerCase() === 'remote' ? (
                                    <CgRemote className="text-xl" />
                                ) : (
                                    <HiOutlineLocationMarker className="text-xl" />
                                )}
                                <span>{lessonDetails.lesson.lessonType.type.toLowerCase()}</span>
                            </span>
                        </div>
                        <div className="flex space-x-4 p-4">
                            {session?.user.roles.includes('ROLE_STUDENT') ? (
                                <button onClick={() => subscribeToLessonHandler(lessonDetails.lesson.id)} className="flex items-center pe-4 border-e">
                                    <BellAlertIcon className={`size-5 me-2 ${lessonDetails.isSubscribed ? 'text-primary' : 'text-gray-600'}`} />
                                    <span className={lessonDetails.isSubscribed ? 'text-primary' : 'text-gray-600'}>
                                        {lessonDetails.isSubscribed ? 'Subscribed' : 'Subscribe'}
                                    </span>
                                </button>
                            ) : (
                                ''
                            )}
                            <div className="flex items-centerpe-4 border-etransition duration-200">
                                <BiComment className="size-5 text-gray-600 me-1" />
                                <span className="text-gray-600 text-sm">{lessonDetails.commentsCount}</span>
                            </div>
                            <button className="flex space-x-2 items-center">
                                <ShareIcon className="size-5 text-gray-600 me-2" />
                                <span className="text-gray-600">Share</span>
                            </button>
                        </div>
                    </div>
                    <LessonComments commentsCount={lessonDetails.commentsCount} lesson={lessonDetails.lesson} user={session?.user} />
                    {/* subscribers modal */}
                    <Transition.Root show={openModal} as={Fragment}>
                        <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" open={openModal} onClose={() => setOpenModal(false)}>
                            <DialogBackdrop className="fixed inset-0 bg-black/30" />
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
                                            {loading ? (
                                                'loading'
                                            ) : (
                                                <>
                                                    <ul
                                                        role="list"
                                                        className="mt-5 border-t border-gray-200 divide-y divide-gray-200 sm:mt-0 sm:border-t-0"
                                                    >
                                                        {subscribers.map((item: any) => (
                                                            <LessonSubscriber item={item} />
                                                        ))}
                                                    </ul>
                                                    <button className="text-sm text-gray-400 py-2 mx-auto">Show more</button>
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
