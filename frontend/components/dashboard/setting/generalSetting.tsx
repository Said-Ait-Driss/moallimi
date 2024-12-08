'use client';

import { Fragment, useEffect, useState } from 'react';
import { Dialog, DialogBackdrop, DialogTitle, Switch, Transition } from '@headlessui/react';
import { useAppDispatch } from '@/hooks/appHooks';
import { updateUserInfo } from '@/store/features/profile/profileAction';
import Notification from '@/components/shared/Notification';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/redux';
import { academicLevelList } from '@/store/features/academicLevel/academicLevelAction';
import ErrorAlert from '@/components/shared/errorAlert';

function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ');
}

const GeneralSettings = ({ profile }: any) => {
    const dispatch = useAppDispatch();

    const [automaticTimezoneEnabled, setAutomaticTimezoneEnabled] = useState(true);
    const [autoUpdateApplicantDataEnabled, setAutoUpdateApplicantDataEnabled] = useState(false);
    const [openFirstName, setOpenFirstName] = useState(false);
    const [firstName, setFirstName] = useState(profile.user.firstName);

    const [openLastName, setOpenLastName] = useState(false);
    const [lastName, setLastName] = useState(profile.user.lastName);

    const [openAbout, setOpenAbout] = useState(false);
    const [about, setAbout] = useState(profile.user.about);

    const [openCity, setOpenCity] = useState(false);
    const [city, setCity] = useState(profile.user.city);

    const [openPhoneNumber, setOpenPhoneNumber] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState(profile.user.phoneNumber);

    const [openAddress, setOpenAddress] = useState(false);
    const [address, setAddress] = useState(profile.user.address);

    const [openProfession, setOpenProfession] = useState(false);
    const [profession, setProfession] = useState(profile.user.profession);

    const [openBirthDate, setOpenBirthDate] = useState(false);
    const [birthDate, setBirthDate] = useState(profile.user.birthDate);

    const [show, setShow] = useState(false);
    const [alert, setAlert] = useState({ title: '', message: '', type: '' });

    const loading: any = useSelector((state: RootState) => state.profile.loading);
    const error: any = useSelector((state: RootState) => state.profile.error);

    useEffect(() => {
        const result1 = dispatch(academicLevelList());
        return () => {
            result1.abort();
        };
    }, []);

    const onUpdateFirstName = () => {
        if (!firstName) {
            return;
        }
        setOpenFirstName(false);
    };
    const onUpdateLastName = () => {
        if (!lastName) {
            return;
        }
        setOpenLastName(false);
    };
    const onUpdateAbout = () => {
        if (!about) {
            return;
        }
        setOpenAbout(false);
    };
    const onUpdatePhoneNumber = () => {
        if (!phoneNumber) {
            return;
        }
        setOpenPhoneNumber(false);
    };
    const onUpdateBirthDate = () => {
        if (!birthDate) {
            return;
        }
        setOpenBirthDate(false);
    };
    const onUpdateCity = () => {
        if (!city) {
            return;
        }
        setOpenCity(false);
    };
    const onUpdateAddress = () => {
        if (!address) {
            return;
        }
        setOpenAddress(false);
    };
    const onUpdateProfession = () => {
        if (!profession) {
            return;
        }
        setOpenProfession(false);
    };

    const onUpdateAll = async (e: any) => {
        e.preventDefault();
        const newUser = { ...profile.user, firstName, lastName, city, profession, address, phoneNumber, birthDate, about };

        delete newUser.createdAt;
        delete newUser.password;
        delete newUser.classes;
        delete newUser.username;
        delete newUser.email;

        const result = await dispatch(updateUserInfo(newUser));
        if (updateUserInfo.fulfilled.match(result)) {
            setShow(true);
            setAlert({
                title: 'Updated successfully !',
                message: 'you have Updated your first name successfully !',
                type: 'success'
            });
        } else {
            setShow(true);
            setAlert({
                title: 'An Error occured !',
                message: 'An Error Occured please try again later or contact support for help !',
                type: 'error'
            });
        }
    };
    return (
        <>
            {/* Description list with inline editing */}
            <div className="mt-10 divide-y divide-gray-200">
                {error && <ErrorAlert title="error occur" message="An Error occur" />}
                <div className="space-y-1">
                    <h3 className="text-lg leading-6 font-medium text-primary">Profile</h3>
                    <p className="max-w-2xl text-sm text-gray-500">This information will be displayed publicly so be careful what you share.</p>
                </div>
                <div className="mt-6">
                    <dl className="divide-y divide-gray-200">
                        <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                            <dt className="text-sm font-medium text-gray-500">First Name</dt>
                            <dd className="mt-1 flex text-sm text-primary sm:mt-0 sm:col-span-2">
                                <span className="flex-grow">{firstName}</span>
                                <span className="ml-4 flex-shrink-0">
                                    <button
                                        type="button"
                                        onClick={() => setOpenFirstName(true)}
                                        className="bg-white rounded-md font-medium text-primary hover:text-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                                    >
                                        Update
                                    </button>
                                </span>
                            </dd>
                        </div>
                        <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                            <dt className="text-sm font-medium text-gray-500">Last Name</dt>
                            <dd className="mt-1 flex text-sm text-primary sm:mt-0 sm:col-span-2">
                                <span className="flex-grow">{lastName}</span>
                                <span className="ml-4 flex-shrink-0">
                                    <button
                                        type="button"
                                        onClick={() => setOpenLastName(true)}
                                        className="bg-white rounded-md font-medium text-primary hover:text-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                                    >
                                        Update
                                    </button>
                                </span>
                            </dd>
                        </div>
                        <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                            <dt className="text-sm font-medium text-gray-500">About</dt>
                            <dd className="mt-1 flex text-sm text-primary sm:mt-0 sm:col-span-2">
                                <span className="flex-grow">{about}</span>
                                <span className="ml-4 flex-shrink-0">
                                    <button
                                        type="button"
                                        onClick={() => setOpenAbout(true)}
                                        className="bg-white rounded-md font-medium text-primary hover:text-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                                    >
                                        Update
                                    </button>
                                </span>
                            </dd>
                        </div>
                        <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:pt-5">
                            <dt className="text-sm font-medium text-gray-500">Photo</dt>
                            <dd className="mt-1 flex text-sm text-primary sm:mt-0 sm:col-span-2 justify-between">
                                <span className="flex-grow sm:max-w-[10%] rounded-full">
                                    {profile.user?.image ? (
                                        <img className="h-8 w-8 rounded-full" src={profile.user?.image} alt="" />
                                    ) : (
                                        <span
                                            className={`${profile.user?.roles?.[0].name == 'ROLE_STUDENT' ? 'outline-primary' : 'outline-indigo-400'} rounded-full max-h-8 max-w-8 overflow-hidden bg-gray-100 outline outline-2 outline-offset-2`}
                                        >
                                            <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                                            </svg>
                                        </span>
                                    )}
                                </span>
                                <span className="ml-4 flex-shrink-0 flex items-start space-x-4">
                                    <button
                                        type="button"
                                        className="bg-white rounded-md font-medium text-primary hover:text-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                                    >
                                        Update
                                    </button>
                                    <span className="text-gray-300" aria-hidden="true">
                                        |
                                    </span>
                                    <button
                                        type="button"
                                        className="bg-white rounded-md font-medium text-primary hover:text-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                                    >
                                        Remove
                                    </button>
                                </span>
                            </dd>
                        </div>
                        <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:pt-5">
                            <dt className="text-sm font-medium text-gray-500">Phone Number</dt>
                            <dd className="mt-1 flex text-sm text-primary sm:mt-0 sm:col-span-2">
                                <span className="flex-grow">{phoneNumber || 'UnKnown'}</span>
                                <span className="ml-4 flex-shrink-0">
                                    <button
                                        type="button"
                                        onClick={() => setOpenPhoneNumber(true)}
                                        className="bg-white rounded-md font-medium text-primary hover:text-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                                    >
                                        Update
                                    </button>
                                </span>
                            </dd>
                        </div>
                        <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:pt-5">
                            <dt className="text-sm font-medium text-gray-500">City</dt>
                            <dd className="mt-1 flex text-sm text-primary sm:mt-0 sm:col-span-2">
                                <span className="flex-grow">{city || 'UnKnown'}</span>
                                <span className="ml-4 flex-shrink-0">
                                    <button
                                        type="button"
                                        onClick={() => setOpenCity(true)}
                                        className="bg-white rounded-md font-medium text-primary hover:text-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                                    >
                                        Update
                                    </button>
                                </span>
                            </dd>
                        </div>
                        <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:pt-5">
                            <dt className="text-sm font-medium text-gray-500">Birth Date</dt>
                            <dd className="mt-1 flex text-sm text-primary sm:mt-0 sm:col-span-2">
                                <span className="flex-grow">{(birthDate && new Date(birthDate).toDateString()) || 'UnKnown'}</span>
                                <span className="ml-4 flex-shrink-0">
                                    <button
                                        type="button"
                                        onClick={() => setOpenBirthDate(true)}
                                        className="bg-white rounded-md font-medium text-primary hover:text-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                                    >
                                        Update
                                    </button>
                                </span>
                            </dd>
                        </div>
                        <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:border-b sm:border-gray-200">
                            <dt className="text-sm font-medium text-gray-500">Address</dt>
                            <dd className="mt-1 flex text-sm text-primary sm:mt-0 sm:col-span-2">
                                <span className="flex-grow">{address || 'UnKnown'}</span>
                                <span className="ml-4 flex-shrink-0">
                                    <button
                                        type="button"
                                        onClick={() => setOpenAddress(true)}
                                        className="bg-white rounded-md font-medium text-primary hover:text-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                                    >
                                        Update
                                    </button>
                                </span>
                            </dd>
                        </div>
                        <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:border-b sm:border-gray-200">
                            <dt className="text-sm font-medium text-gray-500">Profession</dt>
                            <dd className="mt-1 flex text-sm text-primary sm:mt-0 sm:col-span-2">
                                <span className="flex-grow">{profession || 'UnKnown'}</span>
                                <span className="ml-4 flex-shrink-0">
                                    <button
                                        type="button"
                                        onClick={() => setOpenProfession(true)}
                                        className="bg-white rounded-md font-medium text-primary hover:text-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                                    >
                                        Update
                                    </button>
                                </span>
                            </dd>
                        </div>
                    </dl>
                </div>
            </div>

            <div className="mt-10 divide-y divide-gray-200">
                <div className="space-y-1">
                    <h3 className="text-lg leading-6 font-medium text-primary">Account</h3>
                    <p className="max-w-2xl text-sm text-gray-500">Manage how information is displayed on your account.</p>
                </div>
                <div className="mt-6">
                    <dl className="divide-y divide-gray-200">
                        <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                            <dt className="text-sm font-medium text-gray-500">Language</dt>
                            <dd className="mt-1 flex text-sm text-primary sm:mt-0 sm:col-span-2">
                                <span className="flex-grow">English</span>
                                <span className="ml-4 flex-shrink-0">
                                    <button
                                        type="button"
                                        className="bg-white rounded-md font-medium text-primary hover:text-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                                    >
                                        Update
                                    </button>
                                </span>
                            </dd>
                        </div>
                        <Switch.Group as="div" className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:pt-5">
                            <Switch.Label as="dt" className="text-sm font-medium text-gray-500" passive>
                                Automatic timezone
                            </Switch.Label>
                            <dd className="mt-1 flex text-sm text-primary sm:mt-0 sm:col-span-2">
                                <Switch
                                    checked={automaticTimezoneEnabled}
                                    onChange={setAutomaticTimezoneEnabled}
                                    className={classNames(
                                        automaticTimezoneEnabled ? 'bg-primary' : 'bg-gray-200',
                                        'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary sm:ml-auto'
                                    )}
                                >
                                    <span
                                        aria-hidden="true"
                                        className={classNames(
                                            automaticTimezoneEnabled ? 'translate-x-5' : 'translate-x-0',
                                            'inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200'
                                        )}
                                    />
                                </Switch>
                            </dd>
                        </Switch.Group>
                        <Switch.Group as="div" className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:border-b sm:border-gray-200">
                            <Switch.Label as="dt" className="text-sm font-medium text-gray-500" passive>
                                Auto-update applicant data
                            </Switch.Label>
                            <dd className="mt-1 flex text-sm text-primary sm:mt-0 sm:col-span-2">
                                <Switch
                                    checked={autoUpdateApplicantDataEnabled}
                                    onChange={setAutoUpdateApplicantDataEnabled}
                                    className={classNames(
                                        autoUpdateApplicantDataEnabled ? 'bg-primary' : 'bg-gray-200',
                                        'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary sm:ml-auto'
                                    )}
                                >
                                    <span
                                        aria-hidden="true"
                                        className={classNames(
                                            autoUpdateApplicantDataEnabled ? 'translate-x-5' : 'translate-x-0',
                                            'inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200'
                                        )}
                                    />
                                </Switch>
                            </dd>
                        </Switch.Group>
                    </dl>
                </div>
            </div>
            <div className="w-full my-4">
                <button
                    onClick={onUpdateAll}
                    type="button"
                    disabled={loading}
                    className="float-start inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary text-base font-medium text-white hover:bg-darkPrimary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-darkPrimary sm:col-start-2 sm:text-sm"
                >
                    <span className="me-1">{loading ? 'Updating ...' : ' Update '}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 24 24" id="send" fill="#fff">
                        <path fill="none" d="M0 0h24v24H0V0z"></path>
                        <path d="M3.4 20.4l17.45-7.48c.81-.35.81-1.49 0-1.84L3.4 3.6c-.66-.29-1.39.2-1.39.91L2 9.12c0 .5.37.93.87.99L17 12 2.87 13.88c-.5.07-.87.5-.87 1l.01 4.61c0 .71.73 1.2 1.39.91z"></path>
                    </svg>
                </button>
            </div>
            {/* update first name modal */}
            <Transition.Root show={openFirstName} as={Fragment}>
                <Dialog as="div" className="fixed inset-0 overflow-y-auto z-10" onClose={() => setOpenFirstName(false)}>
                    <DialogBackdrop className="fixed inset-0 bg-black/30" />
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                            &#8203;
                        </span>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                                <div>
                                    <div className="mt-3 text-center sm:mt-5">
                                        <DialogTitle as="h3" className="text-lg leading-6 font-medium text-gray-900">
                                            Update First Name
                                        </DialogTitle>
                                        <div className="mt-2">
                                            <div className="mb-6">
                                                <label htmlFor="fileAttachment" className="block text-gray-700 text-sm font-bold mb-2 text-start">
                                                    First Name :
                                                </label>
                                                <input
                                                    id="firstName"
                                                    name="firstName"
                                                    value={firstName}
                                                    onChange={(e) => setFirstName(e.target.value)}
                                                    className="w-full border border-gray-300 rounded-md px-4 py-2 leading-5 transition duration-150 ease-in-out sm:text-sm
                    sm:leading-5 resize-none focus:outline-none focus:border-darkPrimary hover:border-darkPrimary"
                                                    placeholder="Your New First Name !"
                                                ></input>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                                        <button
                                            onClick={onUpdateFirstName}
                                            type="button"
                                            disabled={loading}
                                            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary text-base font-medium text-white hover:bg-darkPrimary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-darkPrimary sm:col-start-2 sm:text-sm"
                                        >
                                            {loading ? 'Updating ...' : 'Done '}
                                        </button>
                                        <button
                                            type="button"
                                            className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-darkPrimary sm:mt-0 sm:col-start-1 sm:text-sm"
                                            onClick={() => setOpenFirstName(false)}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition.Root>

            {/* update last name modal */}
            <Transition.Root show={openLastName} as={Fragment}>
                <Dialog as="div" className="fixed inset-0 overflow-y-auto z-10" onClose={() => setOpenFirstName(false)}>
                    <DialogBackdrop className="fixed inset-0 bg-black/30" />
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                            &#8203;
                        </span>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                                <div>
                                    <div className="mt-3 text-center sm:mt-5">
                                        <DialogTitle as="h3" className="text-lg leading-6 font-medium text-gray-900">
                                            Update Last Name
                                        </DialogTitle>
                                        <div className="mt-2">
                                            <div className="mb-6">
                                                <label htmlFor="fileAttachment" className="block text-gray-700 text-sm font-bold mb-2 text-start">
                                                    Last Name :
                                                </label>
                                                <input
                                                    id="lastName"
                                                    name="lastName"
                                                    value={lastName}
                                                    onChange={(e) => setLastName(e.target.value)}
                                                    className="w-full border border-gray-300 rounded-md px-4 py-2 leading-5 transition duration-150 ease-in-out sm:text-sm
                    sm:leading-5 resize-none focus:outline-none focus:border-darkPrimary hover:border-darkPrimary"
                                                    placeholder="Your New Last Name !"
                                                ></input>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                                        <button
                                            onClick={onUpdateLastName}
                                            type="button"
                                            disabled={loading}
                                            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary text-base font-medium text-white hover:bg-darkPrimary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-darkPrimary sm:col-start-2 sm:text-sm"
                                        >
                                            {loading ? 'Updating ...' : 'Done '}
                                        </button>
                                        <button
                                            type="button"
                                            className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-darkPrimary sm:mt-0 sm:col-start-1 sm:text-sm"
                                            onClick={() => setOpenLastName(false)}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition.Root>

            {/* update last name modal */}
            <Transition.Root show={openAbout} as={Fragment}>
                <Dialog as="div" className="fixed inset-0 overflow-y-auto z-10" onClose={() => setOpenAbout(false)}>
                    <DialogBackdrop className="fixed inset-0 bg-black/30" />
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                            &#8203;
                        </span>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                                <div>
                                    <div className="mt-3 text-center sm:mt-5">
                                        <DialogTitle as="h3" className="text-lg leading-6 font-medium text-gray-900">
                                            Update About
                                        </DialogTitle>
                                        <div className="mt-2">
                                            <div className="mb-6">
                                                <label htmlFor="fileAttachment" className="block text-gray-700 text-sm font-bold mb-2 text-start">
                                                    About :
                                                </label>
                                                <input
                                                    id="about"
                                                    name="about"
                                                    value={about}
                                                    onChange={(e) => setAbout(e.target.value)}
                                                    className="w-full border border-gray-300 rounded-md px-4 py-2 leading-5 transition duration-150 ease-in-out sm:text-sm
                    sm:leading-5 resize-none focus:outline-none focus:border-darkPrimary hover:border-darkPrimary"
                                                    placeholder="Your New About !"
                                                ></input>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                                        <button
                                            onClick={onUpdateAbout}
                                            type="button"
                                            disabled={loading}
                                            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary text-base font-medium text-white hover:bg-darkPrimary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-darkPrimary sm:col-start-2 sm:text-sm"
                                        >
                                            {loading ? 'Updating ...' : 'Done '}
                                        </button>
                                        <button
                                            type="button"
                                            className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-darkPrimary sm:mt-0 sm:col-start-1 sm:text-sm"
                                            onClick={() => setOpenAbout(false)}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition.Root>

            {/* update Phone Number modal */}
            <Transition.Root show={openPhoneNumber} as={Fragment}>
                <Dialog as="div" className="fixed inset-0 overflow-y-auto z-10" onClose={() => setOpenPhoneNumber(false)}>
                    <DialogBackdrop className="fixed inset-0 bg-black/30" />
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                            &#8203;
                        </span>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                                <div>
                                    <div className="mt-3 text-center sm:mt-5">
                                        <DialogTitle as="h3" className="text-lg leading-6 font-medium text-gray-900">
                                            Update Phone Number
                                        </DialogTitle>
                                        <div className="mt-2">
                                            <div className="mb-6">
                                                <label htmlFor="fileAttachment" className="block text-gray-700 text-sm font-bold mb-2 text-start">
                                                    Profession :
                                                </label>
                                                <input
                                                    id="phoneNumber"
                                                    name="phoneNumber"
                                                    value={phoneNumber}
                                                    type="number"
                                                    max={10}
                                                    min={10}
                                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                                    className="w-full border border-gray-300 rounded-md px-4 py-2 leading-5 transition duration-150 ease-in-out sm:text-sm
                    sm:leading-5 resize-none focus:outline-none focus:border-darkPrimary hover:border-darkPrimary"
                                                    placeholder="Your New Academic Level !"
                                                ></input>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                                        <button
                                            onClick={onUpdatePhoneNumber}
                                            type="button"
                                            disabled={loading}
                                            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary text-base font-medium text-white hover:bg-darkPrimary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-darkPrimary sm:col-start-2 sm:text-sm"
                                        >
                                            {loading ? 'Updating ...' : 'Done'}
                                        </button>
                                        <button
                                            type="button"
                                            className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-darkPrimary sm:mt-0 sm:col-start-1 sm:text-sm"
                                            onClick={() => setOpenPhoneNumber(false)}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition.Root>

            {/* update city modal */}
            <Transition.Root show={openCity} as={Fragment}>
                <Dialog as="div" className="fixed inset-0 overflow-y-auto z-10" onClose={() => setOpenCity(false)}>
                    <DialogBackdrop className="fixed inset-0 bg-black/30" />
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                            &#8203;
                        </span>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                                <div>
                                    <div className="mt-3 text-center sm:mt-5">
                                        <DialogTitle as="h3" className="text-lg leading-6 font-medium text-gray-900">
                                            Update City
                                        </DialogTitle>
                                        <div className="mt-2">
                                            <div className="mb-6">
                                                <label htmlFor="fileAttachment" className="block text-gray-700 text-sm font-bold mb-2 text-start">
                                                    City :
                                                </label>
                                                <input
                                                    id="city"
                                                    name="city"
                                                    value={city}
                                                    onChange={(e) => setCity(e.target.value)}
                                                    className="w-full border border-gray-300 rounded-md px-4 py-2 leading-5 transition duration-150 ease-in-out sm:text-sm
                    sm:leading-5 resize-none focus:outline-none focus:border-darkPrimary hover:border-darkPrimary"
                                                    placeholder="Your New City !"
                                                ></input>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                                        <button
                                            onClick={onUpdateCity}
                                            type="button"
                                            disabled={loading}
                                            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary text-base font-medium text-white hover:bg-darkPrimary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-darkPrimary sm:col-start-2 sm:text-sm"
                                        >
                                            {loading ? 'Updating ...' : 'Done '}
                                        </button>
                                        <button
                                            type="button"
                                            className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-darkPrimary sm:mt-0 sm:col-start-1 sm:text-sm"
                                            onClick={() => setOpenCity(false)}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition.Root>

            {/* update birthDate modal */}
            <Transition.Root show={openBirthDate} as={Fragment}>
                <Dialog as="div" className="fixed inset-0 overflow-y-auto z-10" onClose={() => setOpenBirthDate(false)}>
                    <DialogBackdrop className="fixed inset-0 bg-black/30" />
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                            &#8203;
                        </span>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                                <div>
                                    <div className="mt-3 text-center sm:mt-5">
                                        <DialogTitle as="h3" className="text-lg leading-6 font-medium text-gray-900">
                                            Update Birth Date
                                        </DialogTitle>
                                        <div className="mt-2">
                                            <div className="mb-6">
                                                <label htmlFor="fileAttachment" className="block text-gray-700 text-sm font-bold mb-2 text-start">
                                                    City :
                                                </label>
                                                <input
                                                    id="birthDate"
                                                    name="birthDate"
                                                    value={birthDate}
                                                    type="date"
                                                    onChange={(e) => setBirthDate(e.target.value)}
                                                    className="w-full border border-gray-300 rounded-md px-4 py-2 leading-5 transition duration-150 ease-in-out sm:text-sm
                    sm:leading-5 resize-none focus:outline-none focus:border-darkPrimary hover:border-darkPrimary"
                                                    placeholder="Your New Birth Date !"
                                                ></input>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                                        <button
                                            onClick={onUpdateBirthDate}
                                            type="button"
                                            disabled={loading}
                                            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary text-base font-medium text-white hover:bg-darkPrimary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-darkPrimary sm:col-start-2 sm:text-sm"
                                        >
                                            {loading ? 'Updating ...' : 'Done '}
                                        </button>
                                        <button
                                            type="button"
                                            className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-darkPrimary sm:mt-0 sm:col-start-1 sm:text-sm"
                                            onClick={() => setOpenBirthDate(false)}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition.Root>

            {/* update Address modal */}
            <Transition.Root show={openAddress} as={Fragment}>
                <Dialog as="div" className="fixed inset-0 overflow-y-auto z-10" onClose={() => setOpenAddress(false)}>
                    <DialogBackdrop className="fixed inset-0 bg-black/30" />
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                            &#8203;
                        </span>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                                <div>
                                    <div className="mt-3 text-center sm:mt-5">
                                        <DialogTitle as="h3" className="text-lg leading-6 font-medium text-gray-900">
                                            Update Address
                                        </DialogTitle>
                                        <div className="mt-2">
                                            <div className="mt-2">
                                                <div className="mb-6">
                                                    <label htmlFor="fileAttachment" className="block text-gray-700 text-sm font-bold mb-2 text-start">
                                                        Address :
                                                    </label>
                                                    <input
                                                        id="address"
                                                        name="address"
                                                        value={address}
                                                        onChange={(e) => setAddress(e.target.value)}
                                                        className="w-full border border-gray-300 rounded-md px-4 py-2 leading-5 transition duration-150 ease-in-out sm:text-sm
                    sm:leading-5 resize-none focus:outline-none focus:border-darkPrimary hover:border-darkPrimary"
                                                        placeholder="Your New Address !"
                                                    ></input>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                                        <button
                                            onClick={onUpdateAddress}
                                            type="button"
                                            disabled={loading}
                                            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary text-base font-medium text-white hover:bg-darkPrimary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-darkPrimary sm:col-start-2 sm:text-sm"
                                        >
                                            {loading ? 'Updating ...' : 'Done '}
                                        </button>
                                        <button
                                            type="button"
                                            className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-darkPrimary sm:mt-0 sm:col-start-1 sm:text-sm"
                                            onClick={() => setOpenAddress(false)}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition.Root>

            {/* update Profession modal */}
            <Transition.Root show={openProfession} as={Fragment}>
                <Dialog as="div" className="fixed inset-0 overflow-y-auto z-10" onClose={() => setOpenProfession(false)}>
                    <DialogBackdrop className="fixed inset-0 bg-black/30" />
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                            &#8203;
                        </span>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                                <div>
                                    <div className="mt-3 text-center sm:mt-5">
                                        <DialogTitle as="h3" className="text-lg leading-6 font-medium text-gray-900">
                                            Update Profession
                                        </DialogTitle>
                                        <div className="mt-2">
                                            <div className="mb-6">
                                                <label htmlFor="fileAttachment" className="block text-gray-700 text-sm font-bold mb-2 text-start">
                                                    Profession :
                                                </label>
                                                <input
                                                    id="Profession"
                                                    name="Profession"
                                                    value={profession}
                                                    onChange={(e) => setProfession(e.target.value)}
                                                    className="w-full border border-gray-300 rounded-md px-4 py-2 leading-5 transition duration-150 ease-in-out sm:text-sm
                    sm:leading-5 resize-none focus:outline-none focus:border-darkPrimary hover:border-darkPrimary"
                                                    placeholder="Your New Profession !"
                                                ></input>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                                        <button
                                            onClick={onUpdateProfession}
                                            type="button"
                                            disabled={loading}
                                            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary text-base font-medium text-white hover:bg-darkPrimary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-darkPrimary sm:col-start-2 sm:text-sm"
                                        >
                                            {loading ? 'Updating ...' : 'Done'}
                                        </button>
                                        <button
                                            type="button"
                                            className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-darkPrimary sm:mt-0 sm:col-start-1 sm:text-sm"
                                            onClick={() => setOpenProfession(false)}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition.Root>

            <Notification type={alert.type} title={alert.title} message={alert.message} show={show} setShow={setShow} />
        </>
    );
};

export default GeneralSettings;
