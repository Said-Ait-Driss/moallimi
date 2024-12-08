import { MapPinIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';

export default function StudentCard({ student }: any) {
    return (
        <div key={student.id} className="group relative p-2 m-2 shadow border-gray-200 sm:p-3 max-w-md">
            <Link href={`/dashboard/profile?id=${student.id}`}>
                <div className="relative bg-gray-200 aspect-w-1 aspect-h-1 group-hover:opacity-75 text-center w-full h-24">
                    {student.image ? (
                        <img
                            src={student.image}
                            className="absolute -bottom-8 inset-x-0 w-20 h-20 rounded-full mx-auto outline outline-2 outline-primary"
                            alt={student.firstName + ' ' + student.lastName}
                        />
                    ) : (
                        <span className="absolute -bottom-8 inset-x-0 inline-block h-20 w-20 rounded-full overflow-hidden bg-gray-100 mx-auto outline outline-2 outline-primary">
                            <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                        </span>
                    )}
                </div>
            </Link>
            <div className="pt-10 pb-4 text-center">
                <h3 className="text-xl font-bold text-gray-900">
                    <Link href={`/dashboard/profile`}>{student.firstName + ' ' + student.lastName}</Link>
                </h3>
                <div>
                    <p className="text-gray-600 text-xs">{new Date(student.createdAt.toString()).toDateString()}</p>
                    <p className="text-gray-600 text-xs">{student.academicLevel?.name || 'unknown'}</p>
                </div>
                <p className="text-sm text-gray-600 flex items-center justify-center my-2">{student.gender}</p>
                <div className="mt-3 flex justify-center items-center gap-1">
                    <MapPinIcon className="size-4" />
                    <p className="mt-1 text-xs text-gray-500">{student.city ?? 'unknown'}</p>
                </div>
                <p className="mt-4 text-sm text-gray-900">{student.academicLevel?.name}</p>
            </div>
        </div>
    );
}
