import { ChevronRightIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';
import { BiWorld } from 'react-icons/bi';

export default function LessonSubscriber({ item }: any) {
    return (
        <li key={item.id}>
            <Link href={`/dashboard/profile?id=${item.student.id}`} className="group block">
                <div className="flex items-center py-3 px-4 sm:py-4 sm:px-0">
                    <div className="min-w-0 flex-1 flex items-center">
                        <div className="flex-shrink-0">
                            {item.student.image ? (
                                <img className="h-12 w-12 rounded-full group-hover:opacity-75" src={item.student.image} alt="" />
                            ) : (
                                <span className="inline-block h-12 w-12 rounded-full overflow-hidden bg-gray-100 border-2 border-gray-300 shadow-sm outline outline-2 outline-indigo-400">
                                    <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                                    </svg>
                                </span>
                            )}
                        </div>
                        <div className="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
                            <div>
                                <p className="text-sm font-medium text-purple-600 truncate">{item.student.firstName + ' ' + item.student.lastName}</p>
                                <p className="mt-1 flex items-center text-xs text-gray-500">
                                    <BiWorld className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                                    <span className="truncate ">{item.student.academicLevel || 'Unkown level'}</span>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <ChevronRightIcon className="h-5 w-5 text-gray-400 group-hover:text-gray-700" aria-hidden="true" />
                    </div>
                </div>
            </Link>
        </li>
    );
}
