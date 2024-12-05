import { Fragment, useState } from 'react';
import { Dialog, DialogBackdrop, DialogTitle, Switch, Transition } from '@headlessui/react';

function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ');
}

const GeneralSettings = ({ profile }: any) => {
    const [automaticTimezoneEnabled, setAutomaticTimezoneEnabled] = useState(true);
    const [autoUpdateApplicantDataEnabled, setAutoUpdateApplicantDataEnabled] = useState(false);
    const [openFirstName, setOpenFirstName] = useState(false);
    const [firstName, setFirstName] = useState('');

    const [openLastName, setOpenLastName] = useState(false);
    const [lastName, setLastName] = useState('');

    const [openEmail, setOpenEmail] = useState(false);
    const [email, setEmail] = useState('');

    const [openAcademicLevel, setOpenAcademicLevel] = useState(false);
    const [academicLevel, setAcademicLevel] = useState('');

    const [openProfession, setOpenProfession] = useState(false);
    const [profession, setProfession] = useState('');

    const onUpdateFirstName = () => {};
    const onUpdateLastName = () => {};
    const onUpdateEmail = () => {};
    const onUpdateAcademicLevel = () => {};
    const onUpdateProfession = () => {};
    return (
        <>
            {/* Description list with inline editing */}
            <div className="mt-10 divide-y divide-gray-200">
                <div className="space-y-1">
                    <h3 className="text-lg leading-6 font-medium text-primary">Profile</h3>
                    <p className="max-w-2xl text-sm text-gray-500">This information will be displayed publicly so be careful what you share.</p>
                </div>
                <div className="mt-6">
                    <dl className="divide-y divide-gray-200">
                        <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                            <dt className="text-sm font-medium text-gray-500">First Name</dt>
                            <dd className="mt-1 flex text-sm text-primary sm:mt-0 sm:col-span-2">
                                <span className="flex-grow">{profile.user?.firstName}</span>
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
                                <span className="flex-grow">{profile.user?.lastName}</span>
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
                            <dt className="text-sm font-medium text-gray-500">Email</dt>
                            <dd className="mt-1 flex text-sm text-primary sm:mt-0 sm:col-span-2">
                                <span className="flex-grow">{profile.user?.email}</span>
                                <span className="ml-4 flex-shrink-0">
                                    <button
                                        type="button"
                                        onClick={() => setOpenEmail(true)}
                                        className="bg-white rounded-md font-medium text-primary hover:text-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                                    >
                                        Update
                                    </button>
                                </span>
                            </dd>
                        </div>

                        <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:border-b sm:border-gray-200">
                            <dt className="text-sm font-medium text-gray-500">Academic Level</dt>
                            <dd className="mt-1 flex text-sm text-primary sm:mt-0 sm:col-span-2">
                                <span className="flex-grow">{profile.user?.AcademicLevel || 'UnKnown'}</span>
                                <span className="ml-4 flex-shrink-0">
                                    <button
                                        type="button"
                                        onClick={() => setOpenAcademicLevel(true)}
                                        className="bg-white rounded-md font-medium text-primary hover:text-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                                    >
                                        Update
                                    </button>
                                </span>
                            </dd>
                        </div>
                        {profile.user?.roles?.[0].name == 'ROLE_STUDENT' ? (
                            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:border-b sm:border-gray-200">
                                <dt className="text-sm font-medium text-gray-500">Profession</dt>
                                <dd className="mt-1 flex text-sm text-primary sm:mt-0 sm:col-span-2">
                                    <span className="flex-grow">{profile.user?.profession || 'UnKnown'}</span>
                                    <span className="ml-4 flex-shrink-0">
                                        <button
                                            type="button"
                                            onClick={()=>setOpenAcademicLevel(true)}
                                            className="bg-white rounded-md font-medium text-primary hover:text-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                                        >
                                            Update
                                        </button>
                                    </span>
                                </dd>
                            </div>
                        ) : (
                            ''
                        )}
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
                        <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:pt-5">
                            <dt className="text-sm font-medium text-gray-500">Date format</dt>
                            <dd className="mt-1 flex text-sm text-primary sm:mt-0 sm:col-span-2">
                                <span className="flex-grow">DD-MM-YYYY</span>
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
                                            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary text-base font-medium text-white hover:bg-darkPrimary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-darkPrimary sm:col-start-2 sm:text-sm"
                                        >
                                            Update{' '}
                                            <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 24 24" id="send" fill="#fff">
                                                <path fill="none" d="M0 0h24v24H0V0z"></path>
                                                <path d="M3.4 20.4l17.45-7.48c.81-.35.81-1.49 0-1.84L3.4 3.6c-.66-.29-1.39.2-1.39.91L2 9.12c0 .5.37.93.87.99L17 12 2.87 13.88c-.5.07-.87.5-.87 1l.01 4.61c0 .71.73 1.2 1.39.91z"></path>
                                            </svg>
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
                                            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary text-base font-medium text-white hover:bg-darkPrimary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-darkPrimary sm:col-start-2 sm:text-sm"
                                        >
                                            Update{' '}
                                            <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 24 24" id="send" fill="#fff">
                                                <path fill="none" d="M0 0h24v24H0V0z"></path>
                                                <path d="M3.4 20.4l17.45-7.48c.81-.35.81-1.49 0-1.84L3.4 3.6c-.66-.29-1.39.2-1.39.91L2 9.12c0 .5.37.93.87.99L17 12 2.87 13.88c-.5.07-.87.5-.87 1l.01 4.61c0 .71.73 1.2 1.39.91z"></path>
                                            </svg>
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

            {/* update email modal */}
            <Transition.Root show={openEmail} as={Fragment}>
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
                                            Update Email
                                        </DialogTitle>
                                        <div className="mt-2">
                                            <div className="mb-6">
                                                <label htmlFor="fileAttachment" className="block text-gray-700 text-sm font-bold mb-2 text-start">
                                                    Email :
                                                </label>
                                                <input
                                                    id="email"
                                                    name="email"
                                                    value={email}
                                                    onChange={(e) => setLastName(e.target.value)}
                                                    className="w-full border border-gray-300 rounded-md px-4 py-2 leading-5 transition duration-150 ease-in-out sm:text-sm
                    sm:leading-5 resize-none focus:outline-none focus:border-darkPrimary hover:border-darkPrimary"
                                                    placeholder="Your New Email !"
                                                ></input>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                                        <button
                                            onClick={onUpdateEmail}
                                            type="button"
                                            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary text-base font-medium text-white hover:bg-darkPrimary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-darkPrimary sm:col-start-2 sm:text-sm"
                                        >
                                            Update{' '}
                                            <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 24 24" id="send" fill="#fff">
                                                <path fill="none" d="M0 0h24v24H0V0z"></path>
                                                <path d="M3.4 20.4l17.45-7.48c.81-.35.81-1.49 0-1.84L3.4 3.6c-.66-.29-1.39.2-1.39.91L2 9.12c0 .5.37.93.87.99L17 12 2.87 13.88c-.5.07-.87.5-.87 1l.01 4.61c0 .71.73 1.2 1.39.91z"></path>
                                            </svg>
                                        </button>
                                        <button
                                            type="button"
                                            className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-darkPrimary sm:mt-0 sm:col-start-1 sm:text-sm"
                                            onClick={() => setOpenEmail(false)}
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

            {/* update AcademicLevel modal */}
            <Transition.Root show={openAcademicLevel} as={Fragment}>
                <Dialog as="div" className="fixed inset-0 overflow-y-auto z-10" onClose={() => setOpenAcademicLevel(false)}>
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
                                            Update Academic Level
                                        </DialogTitle>
                                        <div className="mt-2">
                                            <div className="mb-6">
                                                <label htmlFor="fileAttachment" className="block text-gray-700 text-sm font-bold mb-2 text-start">
                                                    Email :
                                                </label>
                                                <input
                                                    id="AcademicLevel"
                                                    name="AcademicLevel"
                                                    value={academicLevel}
                                                    onChange={(e) => setAcademicLevel(e.target.value)}
                                                    className="w-full border border-gray-300 rounded-md px-4 py-2 leading-5 transition duration-150 ease-in-out sm:text-sm
                    sm:leading-5 resize-none focus:outline-none focus:border-darkPrimary hover:border-darkPrimary"
                                                    placeholder="Your New Academic Level !"
                                                ></input>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                                        <button
                                            onClick={onUpdateAcademicLevel}
                                            type="button"
                                            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary text-base font-medium text-white hover:bg-darkPrimary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-darkPrimary sm:col-start-2 sm:text-sm"
                                        >
                                            Update{' '}
                                            <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 24 24" id="send" fill="#fff">
                                                <path fill="none" d="M0 0h24v24H0V0z"></path>
                                                <path d="M3.4 20.4l17.45-7.48c.81-.35.81-1.49 0-1.84L3.4 3.6c-.66-.29-1.39.2-1.39.91L2 9.12c0 .5.37.93.87.99L17 12 2.87 13.88c-.5.07-.87.5-.87 1l.01 4.61c0 .71.73 1.2 1.39.91z"></path>
                                            </svg>
                                        </button>
                                        <button
                                            type="button"
                                            className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-darkPrimary sm:mt-0 sm:col-start-1 sm:text-sm"
                                            onClick={() => setOpenAcademicLevel(false)}
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
                                                    Email :
                                                </label>
                                                <input
                                                    id="Profession"
                                                    name="Profession"
                                                    value={profession}
                                                    onChange={(e) => setProfession(e.target.value)}
                                                    className="w-full border border-gray-300 rounded-md px-4 py-2 leading-5 transition duration-150 ease-in-out sm:text-sm
                    sm:leading-5 resize-none focus:outline-none focus:border-darkPrimary hover:border-darkPrimary"
                                                    placeholder="Your New Academic Level !"
                                                ></input>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                                        <button
                                            onClick={onUpdateProfession}
                                            type="button"
                                            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary text-base font-medium text-white hover:bg-darkPrimary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-darkPrimary sm:col-start-2 sm:text-sm"
                                        >
                                            Update{' '}
                                            <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 24 24" id="send" fill="#fff">
                                                <path fill="none" d="M0 0h24v24H0V0z"></path>
                                                <path d="M3.4 20.4l17.45-7.48c.81-.35.81-1.49 0-1.84L3.4 3.6c-.66-.29-1.39.2-1.39.91L2 9.12c0 .5.37.93.87.99L17 12 2.87 13.88c-.5.07-.87.5-.87 1l.01 4.61c0 .71.73 1.2 1.39.91z"></path>
                                            </svg>
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
        </>
    );
};

export default GeneralSettings;
