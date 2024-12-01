import Link from 'next/link';
import { StarIcon, MapPinIcon } from '@heroicons/react/24/outline';

export default function TeacherCard({ teacher, reviews }: any) {
    const filledStars = Math.round(reviews.averageRating);
    const totalStars = 5;

    return (
        // <div className="border mx-auto bg-white rounded-md p-4 pb-0 flex flex-col justify-between leading-normal mt-2 max-w-3xl ">
        //     <div className="flex items-center justify-between">
        //         <Link href="/dashboard/profile">
        //             <div className="flex">
        //                 {teacher.image ? (
        //                     <img src={teacher.image} className="w-12 h-12 rounded-full mr-4" alt={teacher.firstName + ' ' + teacher.lastName} />
        //                 ) : (
        //                     <span className="inline-block h-12 w-12 rounded-full overflow-hidden bg-gray-100 mr-4">
        //                         <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
        //                             <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
        //                         </svg>
        //                     </span>
        //                 )}
        //                 <div className="text-sm">
        //                     <p className="text-gray-900 leading-none text-xl font-bold  ">{teacher.firstName + ' ' + teacher.lastName}</p>
        //                     <p className="text-gray-600 text-xs">{new Date(teacher.createdAt.toString()).toDateString()}</p>
        //                     <p className="text-gray-600 text-xs">{teacher.academicLevel || 'unknown'}</p>
        //                 </div>
        //             </div>
        //         </Link>
        //         <span className="bg-red-800/10 text-red-800 m-2 inline-block rounded border border-transparent py-1 px-2.5 text-xs font-medium justify-self-end">
        //             Top ranked
        //         </span>
        //     </div>
        //     <div className="">
        //         <p className="text-sm text-gray-600 flex items-center my-2">
        //             {[...Array(totalStars)].map((_, index) => (
        //                 <StarIcon key={index} className={`size-4 ${index < filledStars ? 'text-yellow-400' : ''}`} />
        //             ))}
        //             <span className="text-xs">&nbsp; (12K) </span>
        //         </p>
        //         <p className="text-gray-700 text-sm">
        //             Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, Nonea! Maiores et perferendis eaque, exercitationem
        //             praesentium nihil.
        //         </p>
        //         <div className="my-2 border-t p-2 flex space-x-4">
        //             <div className="flex items-center text-gray-400 space-x-1">
        //                 <BsPeopleFill className="" />
        //                 <span>13K</span>
        //             </div>
        //             <div className="flex items-center text-gray-400 space-x-1">
        //                 <BiBookAlt className="" />
        //                 <span>13K</span>
        //             </div>
        //         </div>
        //     </div>
        // </div>
        <div key={teacher.id} className="group relative p-2 m-2 shadow border-gray-200 sm:p-3 max-w-md">
            <Link href={`/dashboard/profile`}>
                <div className="relative bg-gray-200 aspect-w-1 aspect-h-1 group-hover:opacity-75 text-center w-full h-24">
                    {teacher.image ? (
                        <img src={teacher.image} className="absolute -bottom-8 inset-x-0 w-20 h-20 rounded-full mx-auto" alt={teacher.firstName + ' ' + teacher.lastName} />
                    ) : (
                        <span className="absolute -bottom-8 inset-x-0 inline-block h-20 w-20 rounded-full overflow-hidden bg-gray-100 mx-auto">
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
                <div className="mt-3 flex justify-center items-center gap-3">
                    <MapPinIcon className="size-4" />
                    <p className="mt-1 text-xs text-gray-500">{teacher.city ?? 'ouarzazate'}</p>
                </div>
                <p className="mt-4 text-base font-medium text-gray-900">{teacher.academicLevel}</p>
            </div>
        </div>
    );
}
