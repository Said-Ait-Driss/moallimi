'use client';

import ClasseCard from '@/components/dashboard/classe/classeCard';
import ErrorAlert from '@/components/shared/errorAlert';
import { useAppDispatch } from '@/hooks/appHooks';
import { classesList } from '@/store/features/classe/classeAction';
import { RootState } from '@/store/redux';
import { useEffect, useState } from 'react';
import { CgClose } from 'react-icons/cg';
import { useSelector } from 'react-redux';
import Filter from '@/components/dashboard/shared/filter';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';

const filters = [{ id: 2, name: 'Title' }];

export default function Classe() {
    const [inforOpen, setInfoOpen] = useState(true);

    const dispatch = useAppDispatch();
    const { data: session, status } = useSession();

    const [selectedFilter, setSelectedFilter] = useState(filters[0]);
    const [query, setQuery] = useState('');

    const searchParams = useSearchParams();
    const router = useRouter();

    const page = searchParams.get('page') || 0;
    const size = searchParams.get('size') || 10;
    const sQuery = searchParams.get('query') || '';
    const filter = searchParams.get('filter') || -1;

    let studentId = session?.user.roles?.includes('ROLE_STUDENT') ? session?.user.id : -1;

    const classes: any = useSelector((state: RootState) => state.classe.classes);
    const loading: any = useSelector((state: RootState) => state.classe.loading);
    const error: any = useSelector((state: RootState) => state.lesson.error);

    useEffect(() => {
        const result = dispatch(classesList({ page, size, query: sQuery, filter, studentId }));
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
        const result = await dispatch(classesList({ page, size, query: query, filter: selectedFilter.id.toString(), studentId }));
        if (classesList.fulfilled.match(result)) {
            router.replace(newUrl);
        }
    };

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-6">
            <div className="col-span-1"></div>
            <div className="bg-white col-span-8">
                {inforOpen && (
                    <div className="text-center py-4 px-4 sm:px-6 lg:px-8 relative">
                        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">Classes</h1>
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
                    <span className="text-black text-md font-semibold leading-8 px-8 py-3">Our Classes</span>
                    <div className="flex-1 border-b border-gray-300"></div>
                </div>
                <div className="max-w-3xl mx-auto overflow-hidden sm:px-6 lg:px-4">
                    <h2 className="sr-only">Classes</h2>
                    {error ? <ErrorAlert title="service not available right now" message="Something wrong went happened please try later ." /> : ''}
                    {loading ? (
                        'loading'
                    ) : (
                        <div className="-mx-px border-l border-gray-200 grid grid-cols-2 sm:mx-0 md:grid-cols-3">
                            {classes.content?.map((classe: any) => <ClasseCard key={classe.id} classe={classe} user={session?.user} />)}
                        </div>
                    )}
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
