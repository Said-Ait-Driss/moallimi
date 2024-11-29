'use client';
import React, { useState } from 'react';
import {
    Dialog,
    DialogBackdrop,
    DialogPanel,
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems
} from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { ChevronDownIcon, FunnelIcon, MinusIcon, PlusIcon, Squares2X2Icon } from '@heroicons/react/20/solid';
import Image from 'next/image';
import { FaInstagram, FaTwitter, FaFacebook } from 'react-icons/fa';
import { IoMdStar } from 'react-icons/io';
import { IoMdStarOutline } from 'react-icons/io';


const sortOptions = [
    { name: 'Most Popular', href: '#', current: true },
    { name: 'Best Rating', href: '#', current: false },
    { name: 'Newest', href: '#', current: false }
];
const subSubjects = [
    { name: 'Totes', href: '#' },
    { name: 'Backpacks', href: '#' },
    { name: 'Travel Bags', href: '#' },
    { name: 'Hip Bags', href: '#' },
    { name: 'Laptop Sleeves', href: '#' }
];
const filters = [
    {
        id: 'subject',
        name: 'Subject',
        options: [
            { value: 'statistics', label: 'Statistics', checked: false },
            { value: 'probability', label: 'Probability', checked: false },
            { value: 'math', label: 'Math', checked: true },
        ]
    },
    {
        id: 'academic_level',
        name: 'Academic Level',
        options: [
            { value: 'primary school', label: 'Primary Schoole', checked: true },
            { value: 'college', label: 'College', checked: false },
        ]
    }
];
const teachers = [
    {
        name: 'john kinidy',
        image: '/user-cover-1.png',
        rating: 4.5,
        learnersCount: 222,
        socialMedia: {
            instagram: '#',
            facebook: '#',
            twitter: '#'
        }
    },
    {
        name: 'john kinidy',
        image: '/user-cover-2.png',
        rating: 4.5,
        learnersCount: 222,
        socialMedia: {
            instagram: '#',
            facebook: '#',
            twitter: '#'
        }
    },
    {
        name: 'john kinidy',
        image: '/user-cover-1.png',
        rating: 4.5,
        learnersCount: 222,
        socialMedia: {
            instagram: '#',
            facebook: '#',
            twitter: '#'
        }
    },
    {
        name: 'john kinidy',
        image: '/user-cover-4.png',
        rating: 4.5,
        learnersCount: 222,
        socialMedia: {
            instagram: '#',
            facebook: '#',
            twitter: '#'
        }
    }
];

function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ');
}

export default function Wrapper() {
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

    return (
        <div className="bg-white">
            <div>
                {/* Mobile filter dialog */}
                <Dialog open={mobileFiltersOpen} onClose={setMobileFiltersOpen} className="relative z-40 lg:hidden">
                    <DialogBackdrop
                        transition
                        className="fixed inset-0 bg-black bg-opacity-25 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
                    />

                    <div className="fixed inset-0 z-40 flex">
                        <DialogPanel
                            transition
                            className="relative ml-auto flex h-full w-full max-w-xs transform flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl transition duration-300 ease-in-out data-[closed]:translate-x-full"
                        >
                            <div className="flex items-center justify-between px-4">
                                <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                                <button
                                    type="button"
                                    onClick={() => setMobileFiltersOpen(false)}
                                    className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                                >
                                    <span className="sr-only">Close menu</span>
                                    <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                                </button>
                            </div>

                            {/* Filters */}
                            <form className="mt-4 border-t border-gray-200">
                                <h3 className="sr-only">Subjects</h3>
                                <ul role="list" className="px-2 py-3 font-medium text-gray-900">
                                    {subSubjects.map((subject) => (
                                        <li key={subject.name}>
                                            <a href={subject.href} className="block px-2 py-3">
                                                {subject.name}
                                            </a>
                                        </li>
                                    ))}
                                </ul>

                                {filters.map((section) => (
                                    <Disclosure key={section.id} as="div" className="border-t border-gray-200 px-4 py-6">
                                        <h3 className="-mx-2 -my-3 flow-root">
                                            <DisclosureButton className="group flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                                                <span className="font-medium text-gray-900">{section.name}</span>
                                                <span className="ml-6 flex items-center">
                                                    <PlusIcon aria-hidden="true" className="h-5 w-5 group-data-[open]:hidden" />
                                                    <MinusIcon aria-hidden="true" className="h-5 w-5 [.group:not([data-open])_&]:hidden" />
                                                </span>
                                            </DisclosureButton>
                                        </h3>
                                        <DisclosurePanel className="pt-6">
                                            <div className="space-y-6">
                                                {section.options.map((option, optionIdx) => (
                                                    <div key={option.value} className="flex items-center">
                                                        <input
                                                            defaultValue={option.value}
                                                            defaultChecked={option.checked}
                                                            id={`filter-mobile-${section.id}-${optionIdx}`}
                                                            name={`${section.id}[]`}
                                                            type="checkbox"
                                                            className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                                                        />
                                                        <label
                                                            htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                                            className="ml-3 min-w-0 flex-1 text-gray-500"
                                                        >
                                                            {option.label}
                                                        </label>
                                                    </div>
                                                ))}
                                            </div>
                                        </DisclosurePanel>
                                    </Disclosure>
                                ))}
                            </form>
                        </DialogPanel>
                    </div>
                </Dialog>

                <main className="mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
                        <h1 className="text-4xl font-bold tracking-tight text-gray-900">New Arrivals</h1>

                        <div className="flex items-center">
                            <Menu as="div" className="relative inline-block text-left">
                                <div>
                                    <MenuButton className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                                        Sort
                                        <ChevronDownIcon
                                            aria-hidden="true"
                                            className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                                        />
                                    </MenuButton>
                                </div>

                                <MenuItems
                                    transition
                                    className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                                >
                                    <div className="py-1">
                                        {sortOptions.map((option) => (
                                            <MenuItem key={option.name}>
                                                <a
                                                    href={option.href}
                                                    className={classNames(
                                                        option.current ? 'font-medium text-gray-900' : 'text-gray-500',
                                                        'block px-4 py-2 text-sm data-[focus]:bg-gray-100'
                                                    )}
                                                >
                                                    {option.name}
                                                </a>
                                            </MenuItem>
                                        ))}
                                    </div>
                                </MenuItems>
                            </Menu>

                            <button type="button" className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7">
                                <span className="sr-only">View grid</span>
                                <Squares2X2Icon aria-hidden="true" className="h-5 w-5" />
                            </button>
                            <button
                                type="button"
                                onClick={() => setMobileFiltersOpen(true)}
                                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                            >
                                <span className="sr-only">Filters</span>
                                <FunnelIcon aria-hidden="true" className="h-5 w-5" />
                            </button>
                        </div>
                    </div>

                    <section aria-labelledby="teachers-heading" className="pb-24 pt-6">
                        <h2 id="teachers-heading" className="sr-only">
                            Teachers
                        </h2>

                        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                            {/* Filters */}
                            <form className="hidden lg:block">
                                <h3 className="sr-only">Subjects</h3>
                                <ul role="list" className="space-y-4 border-b border-gray-200 pb-6 text-sm font-medium text-gray-900">
                                    {subSubjects.map((subject) => (
                                        <li key={subject.name}>
                                            <a href={subject.href}>{subject.name}</a>
                                        </li>
                                    ))}
                                </ul>

                                {filters.map((section) => (
                                    <Disclosure key={section.id} as="div" className="border-b border-gray-200 py-6">
                                        <h3 className="-my-3 flow-root">
                                            <DisclosureButton className="group flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                                                <span className="font-medium text-gray-900">{section.name}</span>
                                                <span className="ml-6 flex items-center">
                                                    <PlusIcon aria-hidden="true" className="h-5 w-5 group-data-[open]:hidden" />
                                                    <MinusIcon aria-hidden="true" className="h-5 w-5 [.group:not([data-open])_&]:hidden" />
                                                </span>
                                            </DisclosureButton>
                                        </h3>
                                        <DisclosurePanel className="pt-6">
                                            <div className="space-y-4">
                                                {section.options.map((option, optionIdx) => (
                                                    <div key={option.value} className="flex items-center">
                                                        <input
                                                            defaultValue={option.value}
                                                            defaultChecked={option.checked}
                                                            id={`filter-${section.id}-${optionIdx}`}
                                                            name={`${section.id}[]`}
                                                            type="checkbox"
                                                            className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                                                        />
                                                        <label htmlFor={`filter-${section.id}-${optionIdx}`} className="ml-3 text-sm text-gray-600">
                                                            {option.label}
                                                        </label>
                                                    </div>
                                                ))}
                                            </div>
                                        </DisclosurePanel>
                                    </Disclosure>
                                ))}
                            </form>

                            {/* Teacher grid */}
                            <div className="lg:col-span-3">
                                <div className='flex space-x-3'>
                                    {
                                        teachers.map(teacher=>TeacherCard(teacher))
                                    }
                                </div>
                            </div>
                        </div>
                    </section>
                </main>
            </div>
        </div>
    );
}


interface TeacherCardProps {
    name: string;
    image: string;
    rating: number;
    socialMedia: {
        instagram: string;
        twitter: string;
        facebook: string;
    };
    learnersCount: number;
}


const TeacherCard: React.FC<any> = ({ name, image, rating, socialMedia, learnersCount }: TeacherCardProps) => {
    return (
        <div className="flex-1 rounded-lg shadow-lg max-w-80" key={name}>
            <div className="relative">
                <Image src={image} width={100} height={100} alt="" className="rounded object-cover w-full h-full" />
                <span className="flex items-center mx-auto w-24 absolute bottom-0 right-0">
                    <IoMdStar color="yellow" size={30} />
                    <IoMdStar color="yellow" size={30} />
                    <IoMdStar color="yellow" size={30} />
                    <IoMdStar color="yellow" size={30} />
                    <IoMdStarOutline color="yellow" size={30} />
                </span>
            </div>
            <h4 className="text-primaryText font-bold text-2xl my-4 text-center">{name}</h4>
            <p className="text-secondText text-center">more than {learnersCount} students</p>
            <div className="flex space-x-6 mx-auto my-4 justify-center">
                <a href={socialMedia.instagram}>
                    <FaInstagram size={30} color="#FF7171" />
                </a>
                <a href={socialMedia.facebook}>
                    <FaFacebook size={30} color="#FF7171" />
                </a>
                <a href={socialMedia.twitter}>
                    <FaTwitter size={30} color="#FF7171" />
                </a>
            </div>
        </div>
    );
};