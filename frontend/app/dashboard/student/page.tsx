'use client';

import StudentCard from '@/components/dashboard/student/studentCard';
import Filter from '@/components/dashboard/shared/filter';
import ErrorAlert from '@/components/shared/errorAlert';
import Notification from '@/components/shared/Notification';
import { useAppDispatch } from '@/hooks/appHooks';
import { studentsList } from '@/store/features/student/studentAction';
import { RootState } from '@/store/redux';
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { CgClose } from 'react-icons/cg';
import { useSelector } from 'react-redux';
import Pagination from '@/components/dashboard/shared/pagination';
import { useSession } from 'next-auth/react';

const filters = [
    { id: 1, name: 'classes' },
    { id: 3, name: 'Full Name' },
    { id: 4, name: 'City' }
];

export default function Student() {
    const [inforOpen, setInfoOpen] = useState(true);
    const [alert, setAlert] = useState({ title: '', message: '', type: '' });
    const [show, setShow] = useState(false);
    const [selectedFilter, setSelectedFilter] = useState(filters[1]);
    const [query, setQuery] = useState('');

    const dispatch = useAppDispatch();
    const { data: session, status } = useSession();

    let studentId = session?.user.roles.includes('ROLE_STUDENT') ? session.user.id : -1;

    const searchParams = useSearchParams();
    const router = useRouter();

    const page = searchParams.get('page') || 0;
    const size = searchParams.get('size') || 10;
    const sQuery = searchParams.get('query') || '';
    const filter = searchParams.get('filter') || -1;

    const loading = useSelector((state: RootState) => state.student.loading);
    const students: any = useSelector((state: RootState) => state.student.students);
    const totalElements: number | string = useSelector((state: RootState) => state.student.totalElements);

    const error = useSelector((state: RootState) => state.student.error);

    useEffect(() => {
        const result = dispatch(studentsList({ page, size, studentId, query: sQuery, filter }));
        return () => {
            result.abort();
        };
    }, []);

    const onSubmitHandler = async (e: any) => {
        e.preventDefault();
        const new_searchParams = new URLSearchParams(window.location.search);
        new_searchParams.set('filter', selectedFilter.id.toString());
        new_searchParams.set('query', query);

        const newUrl = `${window.location.pathname}?${new_searchParams.toString()}`;
        const result = await dispatch(studentsList({ page, size, studentId, query: query, filter: selectedFilter.id.toString() }));
        if (studentsList.fulfilled.match(result)) {
            router.replace(newUrl);
        }
    };

    const onPageChange = async (_page: any) => {
        try {
            const new_searchParams = new URLSearchParams(window.location.search);
            new_searchParams.set('page', _page.toString());

            const result = await dispatch(studentsList({ page: _page, size, filter, query }));
            if (studentsList.fulfilled.match(result)) {
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
                <Filter
                    filters={filters}
                    selected={selectedFilter}
                    setSelected={setSelectedFilter}
                    query={query}
                    setQuery={setQuery}
                    onSubmitHandler={onSubmitHandler}
                />

                <div className="max-w-3xl flex w-full items-center rounded-full mx-auto">
                    <div className="flex-1 border-b border-gray-300"></div>
                    <span className="text-black text-md font-semibold leading-8 px-8 py-3">Feed</span>
                    <div className="flex-1 border-b border-gray-300"></div>
                </div>
                <div className="grid grid-cols-2 sm:mx-0 md:grid-cols-3">
                    {error ? <ErrorAlert title="service not available right now" message="something wrong went happened please try later ." /> : ''}
                    {loading && !error
                        ? 'loading'
                        : students.content?.map((student: any) => student.id != studentId && <StudentCard student={student} />)}
                </div>
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
            </div>
            <Notification type={alert.type} title={alert.title} message={alert.message} show={show} setShow={setShow} />
        </div>
    );
}
