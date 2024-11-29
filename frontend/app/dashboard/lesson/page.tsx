'use client';

import { NewPost } from '@/components/dashboard/lesson/newPost';
import LessonCard from '@/components/dashboard/lesson/lessonCard';
import { useState } from 'react';
import { CgClose } from 'react-icons/cg';
// import {
//     ChatAltIcon,
//   } from '@heroicons/react/22/solid'
import { HiChatAlt2,HiLockClosed, HiOutlineChatAlt2 } from 'react-icons/hi';
import { BellAlertIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';


const lessons: any = [
    {
        id: 1,
        title: 'lessons 1 on math with 1 hour',
        description:
            'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Lorem ipsum dolor sit amet, consectetur adipisicing elit.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsum quo fugiat a. Consequatur quasi delectus voluptate esse, excepturi, repellendus culpa aperiam sunt quos non dolores, optio vel. Aliquam, ab delectus?',
        lessonCategory: {
            id: 1,
            name: 'math',
            duration: 'shourt'
        },
        date: '12-12-2024',
        startTime: '10:00',
        endTime: '11:00',
        teacher: {
            id: 1,
            name: 'Mr. Smith',
            email: 'smith@gmail.com',
            phone: '123456789',
            image: '/user-cover-2.png',
            bio: 'Mr. Smith is a math teacher',
            academicSpecialist: 'primary school'
        },
        classe: {
            id: 1,
            name: '1 TH Primary school',
            academicLevel: 'primary school',
            academicYear: 2024,
            description: 'some random description goes here'
        }
    },
    {
        id: 2,
        title: 'lessons 1 on math with 1 hour',
        description:
            'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsum quo fugiat a. Consequatur quasi delectus voluptate esse, excepturi, repellendus culpa aperiam sunt quos non dolores, optio vel. Aliquam, ab delectus?',
        lessonCategory: {
            id: 1,
            name: 'math',
            duration: 'shourt'
        },
        date: '12-12-2024',
        startTime: '10:00',
        endTime: '11:00',
        teacher: {
            id: 1,
            name: 'Mr. Smith',
            email: 'smith@gmail.com',
            phone: '123456789',
            image: '/user-cover-1.png',
            bio: 'Mr. Smith is a math teacher',
            academicSpecialist: 'primary school'
        },
        classe: {
            id: 1,
            name: '1 TH Primary school',
            academicLevel: 'primary school',
            academicYear: 2024,
            description: 'some random description goes here'
        }
    },
    {
        id: 3,
        title: 'lessons 1 on math with 1 hour',
        description:
            'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsum quo fugiat a. Consequatur quasi delectus voluptate esse, excepturi, repellendus culpa aperiam sunt quos non dolores, optio vel. Aliquam, ab delectus?',
        lessonCategory: {
            id: 1,
            name: 'math',
            duration: 'shourt'
        },
        date: '12-12-2024',
        startTime: '10:00',
        endTime: '11:00',
        teacher: {
            id: 1,
            name: 'Mr. Smith',
            email: 'smith@gmail.com',
            phone: '123456789',
            image: '/user-cover-4.png',
            bio: 'Mr. Smith is a math teacher',
            academicSpecialist: 'primary school'
        },
        classe: {
            id: 1,
            name: '1 TH Primary school',
            academicLevel: 'primary school',
            academicYear: 2024,
            description: 'some random description goes here'
        }
    },
    {
        id: 4,
        title: 'lessons 1 on math with 1 hour',
        description:
            'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsum quo fugiat a. Consequatur quasi delectus voluptate esse, excepturi, repellendus culpa aperiam sunt quos non dolores, optio vel. Aliquam, ab delectus?',
        lessonCategory: {
            id: 1,
            name: 'math',
            duration: 'shourt'
        },
        date: '12-12-2024',
        startTime: '10:00',
        endTime: '11:00',
        teacher: {
            id: 1,
            name: 'Mr. Smith',
            email: 'smith@gmail.com',
            phone: '123456789',
            image: '/user-cover-1.png',
            bio: 'Mr. Smith is a math teacher',
            academicSpecialist: 'primary school'
        },
        classe: {
            id: 1,
            name: '1 TH Primary school',
            academicLevel: 'primary school',
            academicYear: 2024,
            description: 'some random description goes here'
        }
    }
];

const trendingLessons = [
    {
      id: 1,
      user: {
        name: 'Floyd Miles',
        imageUrl:
          'https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
      body: 'What books do you have on your bookshelf just to look smarter than you actually are?',
      comments: 291,
      subscribers: 291,
    },
    {
        id: 2,
        user: {
          name: 'Floyd Miles',
          imageUrl:
            'https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
        body: 'What books do you have on your bookshelf just to look smarter than you actually are?',
        comments: 291,
        subscribers: 291,
    },
]

const tabs = [
    { name: 'Recent', href: '#', current: true },
    { name: 'Most Liked', href: '#', current: false },
    { name: 'Most Answers', href: '#', current: false },
]

function classNames(...classes:any) {
    return classes.filter(Boolean).join(' ')
}

export default function Student() {
    const [inforOpen, setInfoOpen] = useState(true);

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-6">
            <div className="col-span-1"></div>
            <div className="col-span-8">
                {inforOpen && (
                    <div className="text-center py-4 px-4 sm:px-6 lg:px-8 relative">
                        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">Lessons</h1>
                        <p className="mt-4 max-w-xl mx-auto text-base text-gray-500">
                            The secret to a tidy desk? Don't get rid of anything, just put it in really really nice looking containers.
                        </p>
                        <button onClick={() => setInfoOpen(false)} className="absolute top-4 right-3">
                            <CgClose />
                        </button>
                    </div>
                )}

                <NewPost />
                <div className="max-w-3xl flex w-full items-center rounded-full mx-auto">
                    <div className="flex-1 border-b border-gray-300"></div>
                    <span className="text-black text-md font-semibold leading-8 px-8 py-3">Feed</span>
                    <div className="flex-1 border-b border-gray-300"></div>
                </div>
                <nav className="relative z-0 rounded-lg shadow flex divide-x divide-gray-200 max-w-3xl mx-auto mb-8" aria-label="Tabs">
                    {tabs.map((tab, tabIdx) => (
                      <a
                        key={tab.name}
                        href={tab.href}
                        aria-current={tab.current ? 'page' : undefined}
                        className={classNames(
                          tab.current ? 'text-gray-900' : 'text-gray-500 hover:text-gray-700',
                          tabIdx === 0 ? 'rounded-l-lg' : '',
                          tabIdx === tabs.length - 1 ? 'rounded-r-lg' : '',
                          'group relative min-w-0 flex-1 overflow-hidden bg-white py-4 px-6 text-sm font-medium text-center hover:bg-gray-50 focus:z-10'
                        )}
                      >
                        <span>{tab.name}</span>
                        <span
                          aria-hidden="true"
                          className={classNames(
                            tab.current ? 'bg-primary' : 'bg-transparent',
                            'absolute inset-x-0 bottom-0 h-0.5'
                          )}
                        />
                      </a>
                    ))}
                  </nav>
                {lessons.map((lesson: any) => (
                    <LessonCard key={lesson.id} lesson={lesson} />
                ))}
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
                <section aria-labelledby="trending-heading">
                  <div className="bg-white rounded-lg shadow  max-w-72">
                    <div className="p-6">
                      <h2 id="trending-heading" className="text-base font-medium text-gray-900">
                        Trending
                      </h2>
                      <div className="mt-6 flow-root">
                        <ul role="list" className="-my-4 divide-y divide-gray-200">
                          {trendingLessons.map((post) => (
                            <Link href={'/dashboard/lessondetails?lessinId=' + post.id}>
                              <li key={post.id} className="flex py-4 space-x-3">
                                <div className="flex-shrink-0">
                                  <img className="h-8 w-8 rounded-full" src={post.user.imageUrl} alt={post.user.name} />
                                </div>
                                <div className="min-w-0 flex-1">
                                  <p className="text-sm text-gray-800">{post.body}</p>
                                  <div className="mt-2 flex">
                                    <span className="inline-flex items-center text-sm space-x-2">
                                      <button
                                        type="button"
                                        className="inline-flex space-x-2 text-gray-400 hover:text-gray-500"
                                      >
                                        <BellAlertIcon className="h-5 w-5" aria-hidden="true" />
                                        <span className="font-medium text-gray-400">{post.subscribers}</span>
                                      </button>
                                      <button
                                        type="button"
                                        className="inline-flex space-x-2 text-gray-400 hover:text-gray-500"
                                      >
                                        <HiOutlineChatAlt2 className="h-5 w-5" aria-hidden="true" />
                                        <span className="font-medium text-gray-400">{post.comments}</span>
                                      </button>
                                    </span>
                                  </div>
                                </div>
                              </li>
                            </Link>
                          ))}
                        </ul>
                      </div>
                      <div className="mt-6">
                        <a
                          href="#"
                          className="w-full block text-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                        >
                          View all
                        </a>
                      </div>
                    </div>
                  </div>
                </section>
            </div>
        </div>
    );
}
