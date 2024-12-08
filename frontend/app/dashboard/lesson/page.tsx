'use client';

import NewLesson from '@/components/dashboard/lesson/newLesson';
import LessonCard from '@/components/dashboard/lesson/lessonCard';
import { useEffect, useState } from 'react';
import { CgClose } from 'react-icons/cg';
import { useSearchParams, useRouter } from 'next/navigation';

import { HiOutlineChatAlt2 } from 'react-icons/hi';
import { BellAlertIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';
import { useAppDispatch } from '@/hooks/appHooks';
import { classesList } from '@/store/features/classe/classeAction';
import { lessonCategoriesList } from '@/store/features/lessonCategories/lessonCategoriesAction';
import { lessonDurationsList } from '@/store/features/lessonDuration/lessonDurationsAction';
import { lessonsList } from '@/store/features/lesson/lessonAction';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/redux';
import ErrorAlert from '@/components/shared/errorAlert';
import { SET_LESSONS } from '@/store/features/lesson/lessonSlice';
import { useSession } from 'next-auth/react';
import Pagination from '@/components/dashboard/shared/pagination';

const trendingLessons = [
    {
        id: 1,
        user: {
            name: 'Floyd Miles',
            imageUrl:
                'https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
        },
        body: 'What books do you have on your bookshelf just to look smarter than you actually are?',
        comments: 291,
        subscribers: 291
    },
    {
        id: 2,
        user: {
            name: 'Floyd Miles',
            imageUrl:
                'https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
        },
        body: 'What books do you have on your bookshelf just to look smarter than you actually are?',
        comments: 291,
        subscribers: 291
    }
];

const filtertabs = [
    { name: 'Recent', id: 'recent', current: true },
    { name: 'Most Subscribed', id: 'face_to_face', current: false },
    { name: 'Only Remote', id: 'remote', current: false }
];

function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ');
}

export default function Lessons() {
    const [inforOpen, setInfoOpen] = useState(true);

    const [tabs, setTabs] = useState(filtertabs);
    const dispatch = useAppDispatch();
    const router = useRouter();
    const { data: session, status } = useSession();

    const searchParams = useSearchParams();
    const page: any = searchParams.get('page') || 0;
    const size = searchParams.get('size') || 10;
    const recent = searchParams.get('recent') || 'true';
    const face_to_face = searchParams.get('face_to_face') || 'false';
    const remote = searchParams.get('remote') || 'false';

    const lessons: any = useSelector((state: RootState) => state.lesson.lessons);
    const loading: any = useSelector((state: RootState) => state.lesson.loading);
    const totalElements: number | string = useSelector((state: RootState) => state.lesson.totalElements);
    const error: any = useSelector((state: RootState) => state.lesson.error);

    let studentId = session?.user.roles?.includes('ROLE_STUDENT') ? session?.user.id : -1;

    useEffect(() => {
        dispatch(SET_LESSONS([]));
        const result = dispatch(lessonsList({ page: page, size, recent, face_to_face, remote, studentId }));
        const result1 = dispatch(classesList({ page: 0, size: 100, filter: '', query: '' }));
        const result2 = dispatch(lessonCategoriesList());
        const result3 = dispatch(lessonDurationsList());
        return () => {
            result.abort();
            result1.abort();
            result2.abort();
            result3.abort();
        };
    }, []);

    const getLessonsByTab = async (id: string) => {
        const new_searchParams = new URLSearchParams(window.location.search);
        new_searchParams.set(id, 'true');
        tabs.forEach((item) => {
            if (item.id != id) new_searchParams.set(item.id, 'false');
        });
        const newUrl = `${window.location.pathname}?${new_searchParams.toString()}`;
        const result = await dispatch(lessonsList({ page, size, recent, face_to_face, remote, studentId }));
        router.replace(newUrl);
    };

    const onPageChange = async (_page: any) => {
        try {
            const new_searchParams = new URLSearchParams(window.location.search);
            new_searchParams.set('page', _page.toString());

            const result = await dispatch(lessonsList({ page: _page , size, recent, face_to_face, remote, studentId }));
            if (lessonsList.fulfilled.match(result)) {
                const newUrl = `${window.location.pathname}?${new_searchParams.toString()}`;
                router.replace(newUrl);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-6">
            <div className="col-span-1"></div>
            <div className="col-span-8">
                {inforOpen && (
                    <div className="text-center py-4 px-4 sm:px-6 lg:px-8 relative">
                        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">Lessons</h1>
                        <p className="mt-4 max-w-xl mx-auto text-base text-gray-500">
                            The secret to a tidy desk? Don't get rid of anything, just put it in really really nice looking containers.
                        </p>
                        <button onClick={() => setInfoOpen(false)} className="absolute top-4 right-3">
                            <CgClose />
                        </button>
                    </div>
                )}
                {session?.user?.roles?.includes('ROLE_TEACHER') ? <NewLesson /> : ''}
                <div className="max-w-3xl flex w-full items-center rounded-full mx-auto">
                    <div className="flex-1 border-b border-gray-300"></div>
                    <span className="text-black text-md font-semibold leading-8 px-8 py-3">Feed</span>
                    <div className="flex-1 border-b border-gray-300"></div>
                </div>
                <nav className="relative z-0 rounded-lg shadow flex divide-x divide-gray-200 max-w-3xl mx-auto mb-8" aria-label="Tabs">
                    <button
                        onClick={() => getLessonsByTab('recent')}
                        className={classNames(
                            recent == 'true' ? 'text-gray-900' : 'text-gray-500 hover:text-gray-700',
                            'group relative min-w-0 flex-1 overflow-hidden bg-white py-4 px-6 text-sm font-medium text-center hover:bg-gray-50 focus:z-10'
                        )}
                    >
                        <span>Recent</span>
                        <span
                            aria-hidden="true"
                            className={classNames(recent == 'true' ? 'bg-primary' : 'bg-transparent', 'absolute inset-x-0 bottom-0 h-0.5')}
                        />
                    </button>
                    <button
                        onClick={() => getLessonsByTab('face_to_face')}
                        className={classNames(
                            face_to_face == 'true' ? 'text-gray-900' : 'text-gray-500 hover:text-gray-700',
                            'group relative min-w-0 flex-1 overflow-hidden bg-white py-4 px-6 text-sm font-medium text-center hover:bg-gray-50 focus:z-10'
                        )}
                    >
                        <span>Face To Face</span>
                        <span
                            aria-hidden="true"
                            className={classNames(face_to_face == 'true' ? 'bg-primary' : 'bg-transparent', 'absolute inset-x-0 bottom-0 h-0.5')}
                        />
                    </button>
                    <button
                        onClick={() => getLessonsByTab('remote')}
                        className={classNames(
                            remote == 'true' ? 'text-gray-900' : 'text-gray-500 hover:text-gray-700',
                            'group relative min-w-0 flex-1 overflow-hidden bg-white py-4 px-6 text-sm font-medium text-center hover:bg-gray-50 focus:z-10'
                        )}
                    >
                        <span>Remote</span>
                        <span
                            aria-hidden="true"
                            className={classNames(remote == 'true' ? 'bg-primary' : 'bg-transparent', 'absolute inset-x-0 bottom-0 h-0.5')}
                        />
                    </button>
                </nav>
                {error ? <ErrorAlert title="service not available right now" message="Something wrong went happened please try later ." /> : ''}
                {lessons?.content?.length > 0
                    ? lessons?.content?.map((lesson: any) => <LessonCard key={lesson?.lesson?.id} lessonProp={lesson} />)
                    : 'No Lesson found'}
                {loading && 'loading'}
                <Pagination currentPage={page} totalResults={totalElements} resultsPerPage={size} onPageChange={onPageChange} />
            </div>
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
                <section aria-labelledby="trending-heading">
                    <div className="bg-white rounded-lg shadow  max-w-72">
                        <div className="p-6">
                            <h2 id="trending-heading" className="text-base font-medium text-gray-900">
                                Trending
                            </h2>
                            <div className="mt-6 flow-root">
                                <ul role="list" className="-my-4 divide-y divide-gray-200">
                                    {trendingLessons.map((post) => (
                                        <Link href={'/dashboard/lessondetails?lessinId=' + post.id} key={post.id}>
                                            <li className="flex py-4 space-x-3">
                                                <div className="flex-shrink-0">
                                                    <img className="h-8 w-8 rounded-full" src={post.user.imageUrl} alt={post.user.name} />
                                                </div>
                                                <div className="min-w-0 flex-1">
                                                    <p className="text-sm text-gray-800">{post.body}</p>
                                                    <div className="mt-2 flex">
                                                        <span className="inline-flex items-center text-sm space-x-2">
                                                            <button type="button" className="inline-flex space-x-2 text-gray-400 hover:text-gray-500">
                                                                <BellAlertIcon className="h-5 w-5" aria-hidden="true" />
                                                                <span className="font-medium text-gray-400">{post.subscribers}</span>
                                                            </button>
                                                            <button type="button" className="inline-flex space-x-2 text-gray-400 hover:text-gray-500">
                                                                <HiOutlineChatAlt2 className="h-5 w-5" aria-hidden="true" />
                                                                <span className="font-medium text-gray-400">{post.comments}</span>
                                                            </button>
                                                        </span>
                                                    </div>
                                                </div>
                                            </li>
                                        </Link>
                                    ))}
                                </ul>
                            </div>
                            <div className="mt-6">
                                <a
                                    href="#"
                                    className="w-full block text-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                                >
                                    View all
                                </a>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
