'use client';

import AcademicLevelsStateChart from '@/components/dashboard/state/academicLevelsStateChart';
// import Calendar from '@/components/dashboard/state/calendar';
import GeneralState from '@/components/dashboard/state/generalState';
import LatestLessons from '@/components/dashboard/state/latestLessons';
import LessonsStateChart from '@/components/dashboard/state/LessonsStateChart';
import UsersStateChart from '@/components/dashboard/state/usersStateChart';

import { useSearchParams, useRouter } from 'next/navigation';
import ErrorAlert from '@/components/shared/errorAlert';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/redux';
import { useAppDispatch } from '@/hooks/appHooks';
import { academicLevelStudentCountState, classeStudentCountState, globalState, latestLessons } from '@/store/features/state/stateAction';
import {
    selectAcademicLevelStudentCountState,
    selectClasseStudentCountState,
    selectGlobalState,
    selectLatestLessons
} from '@/store/features/state/stateSlice';

export default function State() {
    const dispatch = useAppDispatch();

    const error: any = useSelector((state: RootState) => state.state.error);
    const loading: any = useSelector((state: RootState) => state.state.loading);
    const globalStates = useSelector(selectGlobalState);
    const classeStudentCount = useSelector(selectClasseStudentCountState);
    const academicLevelStudentCount = useSelector(selectAcademicLevelStudentCountState);
    const latestLessonsState = useSelector(selectLatestLessons);

    useEffect(() => {
        const result = dispatch(globalState());
        const result1 = dispatch(classeStudentCountState());
        const result2 = dispatch(academicLevelStudentCountState());
        const result3 = dispatch(latestLessons());
        return () => {
            result.abort();
            result1.abort();
            result2.abort();
            result3.abort();
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
                    {globalStates && <GeneralState state={globalStates} />}
                    {loading && 'loading'}
                    <h1 className="text-1xl font-semibold text-gray-900 mt-8">Monthly Lessons</h1>
                    <LessonsStateChart />
                    <h1 className="text-1xl font-semibold text-gray-900 mt-8">Latest Lessons</h1>
                    <LatestLessons state={latestLessonsState} />
                </div>
                <div className="col-span-3 justify-items-start">
                    {classeStudentCount && <UsersStateChart state={classeStudentCount} />}
                    {academicLevelStudentCount && <AcademicLevelsStateChart state={academicLevelStudentCount} />}
                </div>
            </div>
        </>
    );
}
