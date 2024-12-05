import Link from 'next/link';
import { StarIcon, MapPinIcon } from '@heroicons/react/24/solid';

export default function TeacherCard({ teacher, reviews }: any) {
    const filledStars = Math.round(reviews.averageRating);
    const totalStars = 5;

    return (
        <div key={teacher.id} className="group relative p-2 m-2 shadow border-gray-200 sm:p-3 max-w-md">
            <Link href={`/dashboard/profile?id=${teacher.id}`}>
                <div className="relative bg-gray-200 aspect-w-1 aspect-h-1 group-hover:opacity-75 text-center w-full h-24">
                    {teacher.image ? (
                        <img src={teacher.image} className="absolute -bottom-8 inset-x-0 w-20 h-20 rounded-full mx-auto outline outline-2 outline-indigo-400" alt={teacher.firstName + ' ' + teacher.lastName} />
                    ) : (
                        <span className="absolute -bottom-8 inset-x-0 inline-block h-20 w-20 rounded-full overflow-hidden bg-gray-100 mx-auto outline outline-2 outline-indigo-400">
                            <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                        </span>
                    )}
                </div>
            </Link>
            <div className="pt-10 pb-4 text-center">
                <h3 className="text-xl font-bold text-gray-900">
                    <Link href={`/dashboard/profile`}>{teacher.firstName + ' ' + teacher.lastName}</Link>
                </h3>
                <div>
                    <p className="text-gray-600 text-xs">{new Date(teacher.createdAt.toString()).toDateString()}</p>
                    <p className="text-gray-600 text-xs">{teacher.academicLevel || 'unknown'}</p>
                </div>
                <p className="text-sm text-gray-600 flex items-center justify-center my-2">
                    {[...Array(totalStars)].map((_, index) => (
                        <StarIcon key={index} className={`size-4 ${index < filledStars ? 'text-yellow-400' : ''}`} />
                    ))}
                </p>
                <div className="mt-3 flex justify-center items-center gap-1">
                    <MapPinIcon className="size-4" />
                    <p className="mt-1 text-xs text-gray-500">{teacher.city ?? 'unknown'}</p>
                </div>
                <p className="mt-4 text-base font-medium text-gray-900">{teacher.academicLevel}</p>
            </div>
        </div>
    );
}
