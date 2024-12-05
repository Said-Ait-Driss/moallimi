'use client';

import { useEffect, useState } from 'react';
import { MdFacebook } from 'react-icons/md';
import { FaInstagram, FaTwitter, FaLinkedin } from 'react-icons/fa';
import { useSearchParams, useRouter } from 'next/navigation';
import { useAppDispatch } from '@/hooks/appHooks';
import { profile } from '@/store/features/profile/profileAction';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/redux';
import { useSession } from 'next-auth/react';

const TabDetails = ({ profileData }: any) => (
    <div className="w-full my-auto py-6 flex flex-col justify-center gap-2">
        <div className="w-full flex sm:flex-row xs:flex-col gap-2 justify-center">
            <div className="w-full">
                <dl className="text-gray-900 divide-y divide-gray-200 ">
                    <div className="flex flex-col pb-3">
                        <dt className="mb-1 text-gray-500 md:text-lg ">First Name</dt>
                        <dd className="text-lg font-semibold">{profileData.firstName}</dd>
                    </div>
                    <div className="flex flex-col py-3">
                        <dt className="mb-1 text-gray-500 md:text-lg ">Last Name</dt>
                        <dd className="text-lg font-semibold">{profileData.lastName}</dd>
                    </div>
                    <div className="flex flex-col py-3">
                        <dt className="mb-1 text-gray-500 md:text-lg ">Date Of Birth</dt>
                        <dd className="text-lg font-semibold">{profileData.birthDate ?? 'Unknown'}</dd>
                    </div>
                    <div className="flex flex-col py-3">
                        <dt className="mb-1 text-gray-500 md:text-lg ">Gender</dt>
                        <dd className="text-lg font-semibold">{profileData.gender ?? 'Unknown'}</dd>
                    </div>
                </dl>
            </div>
            <div className="w-full">
                <dl className="text-gray-900 divide-y divide-gray-200 ">
                    <div className="flex flex-col pb-3">
                        <dt className="mb-1 text-gray-500 md:text-lg ">City</dt>
                        <dd className="text-lg font-semibold">{profileData.city ?? 'Unknown'}</dd>
                    </div>

                    <div className="flex flex-col pt-3">
                        <dt className="mb-1 text-gray-500 md:text-lg ">Phone Number</dt>
                        <dd className="text-lg font-semibold">{profileData.phoneNumber ?? 'Unknown'}</dd>
                    </div>
                    <div className="flex flex-col pt-3">
                        <dt className="mb-1 text-gray-500 md:text-lg ">Email</dt>
                        <dd className="text-lg font-semibold">{profileData.email ?? 'Unknown'}</dd>
                    </div>

                    <div className="flex flex-col pt-3">
                        <dt className="mb-1 text-gray-500 md:text-lg ">Address</dt>
                        <dd className="text-lg font-semibold hover:text-blue-500">
                            <a href="https://techakim.com">{profileData.address ?? 'Unknown'}</a>
                        </dd>
                    </div>
                </dl>
            </div>
        </div>
    </div>
);

const TabExperience = ({ experiences }: any) => (
    <div className="w-full my-auto py-6 flex flex-col justify-center gap-2">
        <div className="w-full flex sm:flex-row xs:flex-col gap-2 justify-center">
            {experiences?.length
                ? experiences.map((item: any) => (
                      <div className="w-full" key={item.id}>
                          <dl className="text-gray-900 divide-y divide-gray-200 ">
                              <div className="flex flex-col pb-3">
                                  <dt className="mb-1 text-gray-500 md:text-lg ">Role</dt>
                                  <dd className="text-lg font-semibold">{item.role}</dd>
                              </div>
                              <div className="flex flex-col py-3">
                                  <dt className="mb-1 text-gray-500 md:text-lg ">Institut</dt>
                                  <dd className="text-lg font-semibold">{item.institute}</dd>
                              </div>
                              <div className="flex flex-col py-3">
                                  <dt className="mb-1 text-gray-500 md:text-lg ">Description</dt>
                                  <dd className="text-lg font-semibold">{item.description}</dd>
                              </div>
                              <div className="flex flex-col py-3">
                                  <dt className="mb-1 text-gray-500 md:text-lg ">Start Date</dt>
                                  <dd className="text-lg font-semibold">{item.startDate ? new Date(item.startDate).toDateString() : 'Unknown'}</dd>
                              </div>
                              <div className="flex flex-col py-3">
                                  <dt className="mb-1 text-gray-500 md:text-lg ">End Date</dt>
                                  <dd className="text-lg font-semibold">{item.startDate ? new Date(item.endDate).toDateString() : 'Unknown'}</dd>
                              </div>
                          </dl>
                      </div>
                  ))
                : ''}
        </div>
    </div>
);

export default function Profile() {
    const [open, setOpen] = useState('about');
    const router = useRouter();
    const searchParams = useSearchParams();
    const profileId = searchParams.get('id');

    const dispatch = useAppDispatch();
    const { data: session, status } = useSession();

    const handleTabOpen = (tabCategory: any) => {
        setOpen(tabCategory);
    };

    useEffect(() => {
        if (!profileId) {
            router.replace('/404');
            return;
        }
        const result = dispatch(profile({ userId: profileId }));
        return () => {
            result.abort();
        };
    }, [searchParams, profileId]);

    const profileData: any = useSelector((state: RootState) => state.profile.profile);
    const loading: any = useSelector((state: RootState) => state.profile.loading);
    const error: any = useSelector((state: RootState) => state.lesson.error);

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-6">
            <div className="col-span-1"></div>
            <section className="col-span-8 overflow-hidden">
                <div className="flex flex-col max-w-3xl ">
                    {
                        <img
                            src={
                                loading
                                    ? 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHw5fHxjb3ZlcnxlbnwwfDB8fHwxNzEwNzQxNzY0fDA&ixlib=rb-4.0.3&q=80&w=1080'
                                    : profileData.user?.cover ||
                                      'https://images.unsplash.com/photo-1451187580459-43490279c0fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHw5fHxjb3ZlcnxlbnwwfDB8fHwxNzEwNzQxNzY0fDA&ixlib=rb-4.0.3&q=80&w=1080'
                            }
                            alt="User Cover"
                            className="w-full xl:h-[20rem] lg:h-[18rem] md:h-[16rem] sm:h-[14rem] xs:h-[11rem]"
                            onError={(e: any) => {
                                e.target.src = 'https://example.com/fallback-image.jpg';
                            }}
                        />
                    }

                    <div className="sm:w-[80%] xs:w-[90%] mx-auto flex mb-2">
                        {profileData.user?.image ? (
                            <img
                                src="/user-cover-2.png"
                                alt="User Profile"
                                className={`
                                    ${profileData.user.roles?.[0].name == 'ROLE_STUDENT' ? 'outline-primary' : 'outline-indigo-400'}
                                    "rounded-full h-20 w-20 outline outline-2 outline-offset-2  relative lg:bottom-[3rem] sm:bottom-[4rem] xs:bottom-[3rem]"
                                `}
                            />
                        ) : (
                            <span
                                className={` ${profileData.user?.roles?.[0].name == 'ROLE_STUDENT' ? 'outline-primary' : 'outline-indigo-400'} rounded-full max-h-20 max-w-20 overflow-hidden bg-gray-100 outline outline-2 outline-offset-2 relative lg:bottom-[3rem] sm:bottom-[4rem] xs:bottom-[3rem]`}
                            >
                                <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                            </span>
                        )}
                        <div className="p-2 text-start sm:mx-2 my-1 w-full">
                            {loading ? (
                                'loading'
                            ) : (
                                <h1 className="w-full text-left xs:pl-4 text-gray-800 lg:text-3xl md:text-3xl sm:text-3xl xs:text-xl font-serif">
                                    {profileData.user?.firstName + ' ' + profileData.user?.lastName}
                                </h1>
                            )}
                            {loading ? 'loading' : <div className="text-sm text-gray-500">{profileData.user?.academicLevel ?? 'Unknow'}</div>}
                        </div>
                        <div className="flex gap-2 w-full justify-end sm:mx-4 my-1">
                            <a href="#">
                                <MdFacebook className="size-6 text-gray-500" />
                            </a>
                            <a href="#">
                                <FaInstagram className="size-6 text-gray-500" />
                            </a>
                            <a href="#">
                                <FaTwitter className="size-6 text-gray-500" />
                            </a>
                            <a href="#">
                                <FaLinkedin className="size-6 text-gray-500" />
                            </a>
                        </div>
                    </div>

                    <div className="xl:w-[80%] lg:w-[90%] md:w-[90%] sm:w-[92%] xs:w-[90%] mx-auto flex flex-col gap-4 relative lg:-top-8 md:-top-6 sm:-top-4 xs:-top-4">
                        <p className="w-fit text-gray-700 text-md mt-6">{loading ? 'loading' : (profileData.user?.about ?? 'No Bio set yet.!')}</p>
                        <div className="flex flex-col flex-wrap border border-t-0 border-r-0 border-l-0 border-[#E4E4E4] pt-3 dark:border-dark-3 sm:flex-row">
                            <a
                                onClick={() => handleTabOpen('about')}
                                className={`cursor-pointer px-4 py-3 text-sm font-medium md:text-base lg:px-6 ${
                                    open === 'about'
                                        ? 'bg-lightPrimary text-primary border-b-2 border-primary'
                                        : 'text-body-color hover:border-b-2 hover:border-primary'
                                }`}
                            >
                                About
                            </a>
                            {!loading && profileData.user?.roles.find((role:any)=>role.name =="ROLE_TEACHER") ? (
                                <button
                                    onClick={() => handleTabOpen('experience')}
                                    className={`cursor-pointer px-4 py-3 text-sm font-medium md:text-base lg:px-6 ${
                                        open === 'experience'
                                            ? 'bg-lightPrimary text-primary border-primary'
                                            : 'text-body-color hover:border-b-2 hover:border-primary'
                                    }`}
                                >
                                    Experience
                                </button>
                            ) : (
                                ''
                            )}

                            <a
                                onClick={() => handleTabOpen('more')}
                                className={`cursor-pointer px-4 py-3 text-sm font-medium md:text-base lg:px-6 ${
                                    open === 'more'
                                        ? 'bg-lightPrimary text-primary border-primary'
                                        : 'text-body-color hover:border-b-2 hover:border-primary'
                                }`}
                            >
                                More Details
                            </a>
                        </div>
                        <div className="mb-14">
                            {loading ? (
                                'loading'
                            ) : (
                                profileData.user ?
                                <TabContent details={<TabDetails profileData={profileData.user} />} tabCategory="about" open={open} />
                                : ""
                            )}
                            {loading ? (
                                'loading'
                            ) : (
                                <TabContent details={<TabExperience experiences={profileData.experiences} />} tabCategory="experience" open={open} />
                            )}
                            <TabContent
                                details="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officia nisi, doloribus nulla cumque molestias corporis eaque harum vero! Quas sit odit optio debitis nulla quisquam, dolorum quaerat animi iusto quod."
                                tabCategory="more"
                                open={open}
                            />
                        </div>
                    </div>
                </div>
            </section>
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

const TabContent = ({ open, tabCategory, details }: any) => {
    return (
        <div>
            <div className={`p-6 text-base leading-relaxed text-body-color dark:text-dark-6 ${open === tabCategory ? 'block' : 'hidden'} `}>
                {details}
            </div>
        </div>
    );
};
