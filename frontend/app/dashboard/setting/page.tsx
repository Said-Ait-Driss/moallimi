'use client';

import BillingSettings from '@/components/dashboard/setting/billingSetting';
import GeneralSettings from '@/components/dashboard/setting/generalSetting';
import NotificationsSettings from '@/components/dashboard/setting/notificationSetting';
import PasswordSettings from '@/components/dashboard/setting/passwordSetting';
import PlanSetting from '@/components/dashboard/setting/planSetting';
import { useEffect, useState } from 'react';
import { signOut, useSession } from 'next-auth/react';
import { useAppDispatch } from '@/hooks/appHooks';
import { profile } from '@/store/features/profile/profileAction';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/redux';
import { academicLevelList } from '@/store/features/academicLevel/academicLevelAction';
import AcademicLevelSettings from '@/components/dashboard/setting/AcademicLevelSettings';

const tabs = [
    { name: 'General', href: '#', current: true },
    { name: 'Password', href: '#', current: false },
    { name: 'Academic Level', href: '#', current: false },
    { name: 'Notifications', href: '#', current: false },
    { name: 'Plan', href: '#', current: false },
    { name: 'Billing', href: '#', current: false }
];

function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ');
}

export default function Example() {
    const [selectedOption, setSelectedOption] = useState(tabs[0].name);

    const { data: session, status } = useSession();
    const dispatch = useAppDispatch();

    const profileData: any = useSelector((state: RootState) => state.profile.profile);
    const loading: any = useSelector((state: RootState) => state.profile.loading);
    const error: any = useSelector((state: RootState) => state.lesson.error);

    const academicLevels: any = useSelector((state: RootState) => state.academicLevel.academicLevels);
    const loading2: any = useSelector((state: RootState) => state.academicLevel.loading);

    useEffect(() => {
        if (!session?.user.id) {
            signOut({ callbackUrl: '/auth/login', redirect: true });
            return;
        }
        const result = dispatch(profile({ userId: session?.user.id }));
        return () => {
            result.abort();
        };
    }, []);

    useEffect(() => {
        if (!session?.user.id) {
            signOut({ callbackUrl: '/auth/login', redirect: true });
            return;
        }
        const result = dispatch(academicLevelList());
        return () => {
            result.abort();
        };
    }, []);

    const handleSelectedOption = (value: any) => {
        setSelectedOption(value);
    };

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-6">
            <div className="col-span-1"></div>
            <div className="col-span-8">
                <div className="max-w-3xl flex flex-col md:px-8 xl:px-0 mx-auto">
                    <main className="flex-1">
                        <div className="relative max-w-4xl mx-auto md:px-8 xl:px-0">
                            <div className="pt-10 pb-16">
                                <div className="px-4 sm:px-6 md:px-0">
                                    <h1 className="text-3xl font-extrabold text-primary">Settings</h1>
                                </div>
                                <div className="px-4 sm:px-6 md:px-0">
                                    <div className="hidden lg:block">
                                        <div className="border-b border-gray-200">
                                            <nav className="-mb-px flex space-x-8">
                                                {tabs.map((tab) => (
                                                    <button
                                                        key={tab.name}
                                                        onClick={() => handleSelectedOption(tab.name)}
                                                        className={classNames(
                                                            tab.name == selectedOption
                                                                ? 'border-primary text-primary'
                                                                : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                                                            'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm'
                                                        )}
                                                    >
                                                        {tab.name}
                                                    </button>
                                                ))}
                                            </nav>
                                        </div>
                                    </div>
                                    <div className="py-6">
                                        {selectedOption === 'General' &&
                                            (loading ? 'loading' : profileData.user ? <GeneralSettings profile={profileData} /> : '')}
                                        {selectedOption === 'Password' && <PasswordSettings />}
                                        {selectedOption === 'Academic Level' &&
                                            (loading || loading2 ? (
                                                'loading'
                                            ) : profileData.user ? (
                                                <AcademicLevelSettings
                                                    userAcademicLevel={profileData.user.academicSpecialist}
                                                    academicLevels={academicLevels}
                                                />
                                            ) : (
                                                ''
                                            ))}
                                        {selectedOption === 'Notifications' && <NotificationsSettings />}
                                        {selectedOption === 'Plan' && <PlanSetting />}
                                        {selectedOption === 'Billing' && <BillingSettings />}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>
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
