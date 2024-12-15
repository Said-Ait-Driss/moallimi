"use client"

import AcademicLevelsStateChart from '@/components/dashboard/state/academicLevelsStateChart';
// import Calendar from '@/components/dashboard/state/calendar';
import GeneralState from '@/components/dashboard/state/generalState';
import LatestActivitiesState from '@/components/dashboard/state/LatestActivitiesState';
import LatestLessons from '@/components/dashboard/state/latestLessons';
import SubscriptionsStateChart from '@/components/dashboard/state/SubscriptionsStateChart';
import UsersStateChart from '@/components/dashboard/state/usersStateChart';

import { useSearchParams, useRouter } from 'next/navigation';
import { selectNotifications } from '@/store/features/notification/notificationSlice';
import ErrorAlert from '@/components/shared/errorAlert';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/redux';
import { useAppDispatch } from '@/hooks/appHooks';
import { globalState } from '@/store/features/state/stateAction';
import { selectGlobalState } from '@/store/features/state/stateSlice';


export default function State() {
    const dispatch = useAppDispatch();

    const error: any = useSelector((state: RootState) => state.state.error);
    const loading: any = useSelector((state: RootState) => state.state.loading);
    const globalStates = useSelector(selectGlobalState);


    useEffect(() => {
        const result = dispatch(globalState());
        return () => {
            result.abort();
        };
    }, []);

    return (
        <>
            {/* this for students and teachers and parent */}
            {/* <h1 className="text-2xl font-semibold text-gray-900">My Calendar</h1> */}
            {/* <Calendar /> */}
            {/*  this for admins */}
            {error ? <ErrorAlert title="service not available right now" message="Something wrong went happened please try later ." /> : ''}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-6">
                <div className="col-span-8">
                    {
                        globalStates && <GeneralState state={globalStates}/>
                    }
                    {loading && 'loading'}
                    <h1 className="text-1xl font-semibold text-gray-900 mt-8">Monthly Subscriptions</h1>
                    <SubscriptionsStateChart />
                    <h1 className="text-1xl font-semibold text-gray-900 mt-8">Latest Lessons</h1>
                    <LatestLessons />
                </div>
                <div className="col-span-4 justify-items-start">
                    <UsersStateChart />
                    <AcademicLevelsStateChart />
                    <h1 className="text-1xl font-semibold text-gray-900 my-4">Latest Activities</h1>
                    <LatestActivitiesState />
                </div>
            </div>
        </>
    );
}



