'use client';

import SearchTeacher from '@/components/dashboard/teacher/search';
import TeacherCard from '@/components/dashboard/teacher/teacherCard';
import ErrorAlert from '@/components/shared/errorAlert';
import { useAppDispatch } from '@/hooks/appHooks';
import { teachersList } from '@/store/features/teacher/teacherAction';
import { RootState } from '@/store/redux';
import { useEffect, useState } from 'react';
import { CgClose } from 'react-icons/cg';
import { useSelector } from 'react-redux';


export default function Teacher() {
    const [inforOpen, setInfoOpen] = useState(true);
    const dispatch = useAppDispatch();
    const loading = useSelector((state: RootState) => state.teacher.loading);
    const teachers: any = useSelector((state: RootState) => state.teacher.teachers);
    const error = useSelector((state: RootState) => state.teacher.error);

    useEffect(() => {
        const result = dispatch(teachersList({ page: 0, size: 9 }));
        return () => {
            result.abort()
        }
    }, []);

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-6">
            <div className="col-span-1"></div>
            <section className="col-span-8 overflow-hidden">
                {inforOpen && (
                    <div className="text-center py-4 px-4 sm:px-6 lg:px-8 relative">
                        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">Teachers</h1>
                        <p className="mt-4 max-w-xl mx-auto text-base text-gray-500">
                            The secret to a tidy desk? Don't get rid of anything, just put it in really really nice looking containers.
                        </p>
                        <button onClick={() => setInfoOpen(false)} className="absolute top-4 right-3">
                            <CgClose />
                        </button>
                    </div>
                )}
                <SearchTeacher />
                <div className="max-w-3xl flex w-full items-center rounded-full mx-auto">
                    <div className="flex-1 border-b border-gray-300"></div>
                    <span className="text-black text-md font-semibold leading-8 px-8 py-3">Feed</span>
                    <div className="flex-1 border-b border-gray-300"></div>
                </div>
                <div>
                    {
                        error ? <ErrorAlert title="service not available right now" message="something wrong went happened please try later ." /> : ""
                    }
                </div>
                <div className='grid grid-cols-2 sm:mx-0 md:grid-cols-3'>

                    {loading && !error ? 'loading' : teachers?.content?.map((item: any) => <TeacherCard teacher={item.teacher} reviews={item.reviews} key={item.teacher?.id} />) || null}
                </div>
            </section>
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
