"use client"

import AcademicLevelsStateChart from '@/components/dashboard/state/academicLevelsStateChart';
// import Calendar from '@/components/dashboard/state/calendar';
import GeneralState from '@/components/dashboard/state/generalState';
import LatestActivitiesState from '@/components/dashboard/state/LatestActivitiesState';
import LatestLessons from '@/components/dashboard/state/latestLessons';
import SubscriptionsStateChart from '@/components/dashboard/state/SubscriptionsStateChart';
import UsersStateChart from '@/components/dashboard/state/usersStateChart';

export default function State() {
    return (
        <>
            {/* this for students and teachers and parent */}
            {/* <h1 className="text-2xl font-semibold text-gray-900">My Calendar</h1> */}
            {/* <Calendar /> */}
            {/*  this for admins */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-6">
                <div className="col-span-8">
                    <GeneralState />
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



