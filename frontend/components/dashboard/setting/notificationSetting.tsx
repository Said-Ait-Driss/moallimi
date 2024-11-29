'use client';

import { useState } from 'react';
import { Switch } from '@headlessui/react';

function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ');
}

const NotificationsSettings = () => {
    const [newLessonNotifications, setNewLessonsNotifications] = useState(false);
    const [newOffersNotifications, setNewOffersNotifications] = useState(true);

    return (
        <div className="mt-6">
            <Switch.Group as="div" className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:pt-5">
                <Switch.Label as="dt" className="text-sm font-medium text-gray-500" passive>
                    Email Notifications for new Lessons
                </Switch.Label>
                <dd className="mt-1 flex text-sm text-primary sm:mt-0 sm:col-span-2">
                    <Switch
                        checked={newLessonNotifications}
                        onChange={setNewLessonsNotifications}
                        className={classNames(
                            newLessonNotifications ? 'bg-primary' : 'bg-gray-200',
                            'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary sm:ml-auto'
                        )}
                    >
                        <span
                            aria-hidden="true"
                            className={classNames(
                                newLessonNotifications ? 'translate-x-5' : 'translate-x-0',
                                'inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200'
                            )}
                        />
                    </Switch>
                </dd>
            </Switch.Group>
            <Switch.Group as="div" className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:pt-5">
                <Switch.Label as="dt" className="text-sm font-medium text-gray-500" passive>
                    Email Notifications for new Offers
                </Switch.Label>
                <dd className="mt-1 flex text-sm text-primary sm:mt-0 sm:col-span-2">
                    <Switch
                        checked={newOffersNotifications}
                        onChange={setNewOffersNotifications}
                        className={classNames(
                            newOffersNotifications ? 'bg-primary' : 'bg-gray-200',
                            'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary sm:ml-auto'
                        )}
                    >
                        <span
                            aria-hidden="true"
                            className={classNames(
                                newOffersNotifications ? 'translate-x-5' : 'translate-x-0',
                                'inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200'
                            )}
                        />
                    </Switch>
                </dd>
            </Switch.Group>
        </div>
    );
};

export default NotificationsSettings;
