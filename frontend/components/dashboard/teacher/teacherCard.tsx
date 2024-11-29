import { StarIcon } from '@heroicons/react/24/outline';
import { StarIcon as StartIconSoid } from '@heroicons/react/20/solid';
import { BsPeopleFill } from 'react-icons/bs';
import { BiBookAlt } from 'react-icons/bi';
import Link from 'next/link';

export default function TeacherCard() {
    return (
        <div className="border mx-auto bg-white rounded p-4 pb-0 flex flex-col justify-between leading-normal mt-2 max-w-3xl ">
            <div className="flex items-center justify-between">
                <Link href="/dashboard/profile">
                    <div className="flex">
                        <img className="w-14 h-14 rounded-full mr-4" src="/user-cover-2.png" alt="Avatar of Writer" />
                        <div className="text-sm">
                            <p className="text-gray-900 leading-none text-xl font-bold  ">John Smith</p>
                            <p className="text-gray-600">Aug 18</p>
                            <p className="text-gray-600">Data Analyst</p>
                        </div>
                    </div>
                </Link>
                <span className="bg-red-800/10 text-red-800 m-2 inline-block rounded border border-transparent py-1 px-2.5 text-xs font-medium justify-self-end">
                    Top ranked
                </span>
            </div>
            <div className="">
                <p className="text-sm text-gray-600 flex items-center my-2">
                    <StartIconSoid className="size-4 text-yellow-400" />
                    <StartIconSoid className="size-4 text-yellow-400" />
                    <StartIconSoid className="size-4 text-yellow-400" />
                    <StarIcon className="size-4" />
                    <StarIcon className="size-4" />
                    <span className='text-xs'>&nbsp; (12K) </span>
                </p>
                <p className="text-gray-700 text-sm">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, Nonea! Maiores et perferendis eaque, exercitationem
                    praesentium nihil.
                </p>
                <div className="my-2 border-t p-2 flex space-x-4">
                    <div className="flex items-center text-gray-400 space-x-1">
                        <BsPeopleFill className="" />
                        <span>13K</span>
                    </div>
                    <div className="flex items-center text-gray-400 space-x-1">
                        <BiBookAlt className="" />
                        <span>13K</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
