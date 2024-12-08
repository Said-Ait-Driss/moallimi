'use client';

import LessonCard from '@/components/dashboard/lesson/lessonCard';
import ErrorAlert from '@/components/shared/errorAlert';
import { useAppDispatch } from '@/hooks/appHooks';
import { myLessonsList } from '@/store/features/lesson/lessonAction';
import { SET_LESSONS } from '@/store/features/lesson/lessonSlice';
import { RootState } from '@/store/redux';
import { BellAlertIcon } from '@heroicons/react/24/solid';
import { useSession } from 'next-auth/react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { CgClose } from 'react-icons/cg';
import { useSelector } from 'react-redux';

export default function MyLessons() {
    const [inforOpen, setInfoOpen] = useState(true);
    const router = useRouter();
    const { data: session, status } = useSession();
    const dispatch = useAppDispatch();

    const searchParams = useSearchParams();
    const page = searchParams.get('page') || 0;
    const size = searchParams.get('size') || 10;
    let studentId = session?.user.roles?.includes('ROLE_STUDENT') ? session?.user.id : -1;

    const lessons: any = useSelector((state: RootState) => state.lesson.lessons);
    const loading: any = useSelector((state: RootState) => state.lesson.loading);
    const error: any = useSelector((state: RootState) => state.lesson.error);

    useEffect(() => {
        if (studentId < '0') {
            router.back();
        }
        dispatch(SET_LESSONS([]));
        const result = dispatch(myLessonsList({ page, size, studentId }));
        return () => {
            result.abort();
        };
    }, []);

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-6">
            <div className="col-span-1"></div>
            <div className="col-span-8">
                {inforOpen && (
                    <div className="text-center py-4 px-4 sm:px-6 lg:px-8 relative">
                        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">My Lessons</h1>
                        <p className="mt-4 max-w-xl mx-auto text-base text-gray-500">
                            The secret to a tidy desk? Don't get rid of anything, just put it in really really nice looking containers.
                        </p>
                        <button onClick={() => setInfoOpen(false)} className="absolute top-4 right-3">
                            <CgClose />
                        </button>
                    </div>
                )}

                <div className="max-w-3xl flex w-full items-center rounded-full mx-auto">
                    <div className="flex-1 border-b border-gray-300"></div>
                    <span className="text-black text-md font-semibold leading-8 px-8 py-3">Feed</span>
                    <div className="flex-1 border-b border-gray-300"></div>
                </div>

                {error ? <ErrorAlert title="service not available right now" message="Something wrong went happened please try later ." /> : ''}
                {loading ? 'loading' : lessons?.content && lessons.content?.map((lesson: any) => <LessonCard key={lesson.lesson.id} lessonProp={lesson} />)}
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
            </div>
        </div>
    );
}
