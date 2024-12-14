'use client';

import NotificationCard from '@/components/dashboard/notification/notificationCard';
import { useSession } from 'next-auth/react';
import Pagination from '@/components/dashboard/shared/pagination';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/redux';
import { useAppDispatch } from '@/hooks/appHooks';
import { notificationsList } from '@/store/features/notification/notificationAction';
import { useSearchParams, useRouter } from 'next/navigation';
import { selectNotifications } from '@/store/features/notification/notificationSlice';
import ErrorAlert from '@/components/shared/errorAlert';

const people = [
    {
        name: 'Lindsay Walton',
        imageUrl:
            'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=256&h=256&q=80'
    }
];

export default function Notification() {
    const { data: session, status } = useSession();
    const dispatch = useAppDispatch();

    const notifications = useSelector(selectNotifications);
    const error: any = useSelector((state: RootState) => state.notification.error);
    const loading: any = useSelector((state: RootState) => state.notification.loading);
    const totalElements: number | string = useSelector((state: RootState) => state.notification.totalElements);

    const router = useRouter();
    const searchParams = useSearchParams();
    const page: any = searchParams.get('page') || 0;
    const size = searchParams.get('size') || 10;

    let userId = session?.user.id;

    useEffect(() => {
        const result = dispatch(notificationsList({ page, size, userId }));
        return () => {
            result.abort();
        };
    }, []);

    const onPageChange = async (_page: any) => {
        try {
            const new_searchParams = new URLSearchParams(window.location.search);
            new_searchParams.set('page', _page.toString());

            const result = await dispatch(notificationsList({ page: _page, size, userId }));
            if (notificationsList.fulfilled.match(result)) {
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
            <div className="bg-white col-span-8">
                <div className="max-w-3xl flex w-full items-center rounded-full mx-auto">
                    <div className="flex-1 border-b border-gray-300"></div>
                    <span className="text-black text-md font-semibold leading-8 px-8 py-3">Notifications</span>
                    <div className="flex-1 border-b border-gray-300"></div>
                </div>

                <div className="max-w-3xl mx-auto overflow-hidden sm:px-6 lg:px-4">
                    {error ? <ErrorAlert title="service not available right now" message="Something wrong went happened please try later ." /> : ''}
                    <ul role="list" className="divide-y divide-gray-200">
                        {notifications?.content?.length > 0
                            ? notifications?.content?.map((item: any) => <NotificationCard notification={item} key={item.id} />)
                            : 'No Notification yet'}
                    </ul>
                    {loading && 'loading'}
                    <Pagination currentPage={page} totalResults={totalElements} resultsPerPage={size} onPageChange={onPageChange} />
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
