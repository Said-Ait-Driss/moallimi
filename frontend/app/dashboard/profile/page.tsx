'use client';

import { useState } from 'react';
import { MdFacebook } from 'react-icons/md';
import { FaInstagram, FaTwitter, FaLinkedin } from 'react-icons/fa';

const TabDetails = () => (
    <div className="w-full my-auto py-6 flex flex-col justify-center gap-2">
        <div className="w-full flex sm:flex-row xs:flex-col gap-2 justify-center">
            <div className="w-full">
                <dl className="text-gray-900 divide-y divide-gray-200 ">
                    <div className="flex flex-col pb-3">
                        <dt className="mb-1 text-gray-500 md:text-lg ">First Name</dt>
                        <dd className="text-lg font-semibold">Samuel</dd>
                    </div>
                    <div className="flex flex-col py-3">
                        <dt className="mb-1 text-gray-500 md:text-lg ">Last Name</dt>
                        <dd className="text-lg font-semibold">Abera</dd>
                    </div>
                    <div className="flex flex-col py-3">
                        <dt className="mb-1 text-gray-500 md:text-lg ">Date Of Birth</dt>
                        <dd className="text-lg font-semibold">21/02/1997</dd>
                    </div>
                    <div className="flex flex-col py-3">
                        <dt className="mb-1 text-gray-500 md:text-lg ">Gender</dt>
                        <dd className="text-lg font-semibold">Male</dd>
                    </div>
                </dl>
            </div>
            <div className="w-full">
                <dl className="text-gray-900 divide-y divide-gray-200 ">
                    <div className="flex flex-col pb-3">
                        <dt className="mb-1 text-gray-500 md:text-lg ">Location</dt>
                        <dd className="text-lg font-semibold">Ethiopia, Addis Ababa</dd>
                    </div>

                    <div className="flex flex-col pt-3">
                        <dt className="mb-1 text-gray-500 md:text-lg ">Phone Number</dt>
                        <dd className="text-lg font-semibold">+251913****30</dd>
                    </div>
                    <div className="flex flex-col pt-3">
                        <dt className="mb-1 text-gray-500 md:text-lg ">Email</dt>
                        <dd className="text-lg font-semibold">samuelabera87@gmail.com</dd>
                    </div>

                    <div className="flex flex-col pt-3">
                        <dt className="mb-1 text-gray-500 md:text-lg ">Website</dt>
                        <dd className="text-lg font-semibold hover:text-blue-500">
                            <a href="https://techakim.com">https://www.teclick.com</a>
                        </dd>
                    </div>
                </dl>
            </div>
        </div>
    </div>
);

export default function Profile() {
    const [open, setOpen] = useState('about');

    const handleTabOpen = (tabCategory: any) => {
        setOpen(tabCategory);
    };

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-6">
            <div className="col-span-1"></div>
            <section className="col-span-8 overflow-hidden">
                <div className="flex flex-col max-w-3xl ">
                    <img
                        src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHw5fHxjb3ZlcnxlbnwwfDB8fHwxNzEwNzQxNzY0fDA&ixlib=rb-4.0.3&q=80&w=1080"
                        alt="User Cover"
                        className="w-full xl:h-[20rem] lg:h-[18rem] md:h-[16rem] sm:h-[14rem] xs:h-[11rem]"
                    />

                    <div className="sm:w-[80%] xs:w-[90%] mx-auto flex">
                        <img
                            src="/user-cover-2.png"
                            alt="User Profile"
                            className="rounded-full lg:w-[12rem] lg:h-[12rem] md:w-[10rem] md:h-[10rem] sm:w-[8rem] sm:h-[8rem] xs:w-[7rem] xs:h-[7rem] outline outline-2 outline-offset-2 outline-primary relative lg:bottom-[5rem] sm:bottom-[4rem] xs:bottom-[3rem]"
                        />
                        <div className="p-2 text-start sm:mx-4 my-1 w-full">
                            <h1 className="w-full text-left xs:pl-4 text-gray-800 lg:text-3xl md:text-3xl sm:text-3xl xs:text-xl font-serif">
                                Said Ait Driss
                            </h1>
                            <div className="text-sm text-gray-500">Data Analyst</div>
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
                        <p className="w-fit text-gray-700  text-md">
                            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quisquam debitis labore consectetur voluptatibus mollitia
                            dolorem veniam omnis ut quibusdam minima sapiente repellendus asperiores explicabo, eligendi odit, dolore similique fugiat
                            dolor, doloremque eveniet. Odit, consequatur. Ratione voluptate exercitationem hic eligendi vitae animi nam in, est earum
                            culpa illum aliquam.
                        </p>
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
                            <a
                                onClick={() => handleTabOpen('experience')}
                                className={`cursor-pointer px-4 py-3 text-sm font-medium md:text-base lg:px-6 ${
                                    open === 'experience'
                                        ? 'bg-lightPrimary text-primary border-primary'
                                        : 'text-body-color hover:border-b-2 hover:border-primary'
                                }`}
                            >
                                Experience
                            </a>
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
                            <TabContent details={<TabDetails />} tabCategory="about" open={open} />
                            <TabContent
                                details="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officia nisi, doloribus nulla cumque molestias corporis eaque harum vero! Quas sit odit optio debitis nulla quisquam, dolorum quaerat animi iusto quod.
  
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Suscipit mollitia nam eligendi reprehenderit reiciendis saepe laboriosam maiores voluptas. Quo, culpa amet fugiat ipsam sed quod hic, veritatis ducimus recusandae repellat quasi eaque, suscipit praesentium totam?"
                                tabCategory="experience"
                                open={open}
                            />
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
