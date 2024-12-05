'use client';

import StudentCard from '@/components/dashboard/student/studentCard';
import ErrorAlert from '@/components/shared/errorAlert';
import { useAppDispatch } from '@/hooks/appHooks';
import { studentsList } from '@/store/features/student/studentAction';
import { RootState } from '@/store/redux';
import { useEffect, useState } from 'react';
import { CgClose } from 'react-icons/cg';
import { useSelector } from 'react-redux';

export default function Student() {
    const [inforOpen, setInfoOpen] = useState(true);
    const dispatch = useAppDispatch();
    const loading = useSelector((state: RootState) => state.student.loading);
    const students: any = useSelector((state: RootState) => state.student.students);
    const error = useSelector((state: RootState) => state.student.error);

    useEffect(() => {
        const result = dispatch(studentsList({ page: 0, size: 18 }));
        return () => {
            result.abort();
        };
    }, []);

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-6">
            <div className="col-span-1"></div>
            <div className="col-span-8 overflow-hidden">
                {inforOpen && (
                    <div className="text-center py-4 px-4 sm:px-6 lg:px-8 relative">
                        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">Students</h1>
                        <p className="mt-4 max-w-xl mx-auto text-base text-gray-500">
                            The secret to a tidy desk? Don't get rid of anything, just put it in really really nice looking containers.
                        </p>
                        <button onClick={() => setInfoOpen(false)} className="absolute top-4 right-3">
                            <CgClose />
                        </button>
                    </div>
                )}
                <form className="max-w-3xl mx-auto">
                    <div className="flex">
                        <label htmlFor="search-dropdown" className="mb-2 text-sm font-medium text-gray-900 sr-only ">
                            Your Email
                        </label>
                        <button
                            id="dropdown-button"
                            data-dropdown-toggle="dropdown"
                            className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100"
                            type="button"
                        >
                            All classes{' '}
                            <svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4" />
                            </svg>
                        </button>
                        <div id="dropdown" className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow">
                            <ul className="py-2 text-sm text-gray-700 " aria-labelledby="dropdown-button">
                                <li>
                                    <button type="button" className="inline-flex w-full px-4 py-2 hover:bg-gray-100">
                                        Mockups
                                    </button>
                                </li>
                                <li>
                                    <button type="button" className="inline-flex w-full px-4 py-2 hover:bg-gray-100">
                                        Templates
                                    </button>
                                </li>
                                <li>
                                    <button type="button" className="inline-flex w-full px-4 py-2 hover:bg-gray-100">
                                        Design
                                    </button>
                                </li>
                                <li>
                                    <button type="button" className="inline-flex w-full px-4 py-2 hover:bg-gray-100">
                                        Logos
                                    </button>
                                </li>
                            </ul>
                        </div>
                        <div className="relative w-full">
                            <input
                                type="search"
                                id="search-dropdown"
                                className="block p-2.5 py-3 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-primary focus:border-primary outline-none"
                                placeholder="Search Mockups, Logos, Design Templates..."
                                required
                            />
                            <button
                                type="submit"
                                className="absolute top-0 end-0 p-2 mt-0.5 mr-0.5 flex justify-center items-center bg-primary hover:bg-darkPrimary focus:outline-none focus:shadow-outline-blue text-white py-2 px-4 rounded-md transition duration-300 gap-2"
                            >
                                Search
                                <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 24 24" id="send" fill="#fff">
                                    <path fill="none" d="M0 0h24v24H0V0z"></path>
                                    <path d="M3.4 20.4l17.45-7.48c.81-.35.81-1.49 0-1.84L3.4 3.6c-.66-.29-1.39.2-1.39.91L2 9.12c0 .5.37.93.87.99L17 12 2.87 13.88c-.5.07-.87.5-.87 1l.01 4.61c0 .71.73 1.2 1.39.91z"></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                </form>

                <div className="max-w-3xl flex w-full items-center rounded-full mx-auto">
                    <div className="flex-1 border-b border-gray-300"></div>
                    <span className="text-black text-md font-semibold leading-8 px-8 py-3">Feed</span>
                    <div className="flex-1 border-b border-gray-300"></div>
                </div>
                <div className="grid grid-cols-2 sm:mx-0 md:grid-cols-3">
                    {error ? <ErrorAlert title="service not available right now" message="something wrong went happened please try later ." /> : ''}
                    {loading && !error ? 'loading' : students.content?.map((student: any) => <StudentCard student={student} />)}
                </div>
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
