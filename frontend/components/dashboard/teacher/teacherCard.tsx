import Link from 'next/link';
import { StarIcon, MapPinIcon } from '@heroicons/react/24/solid';
import { useAppDispatch } from '@/hooks/appHooks';
import { useState } from 'react';
import { follow, unFollow } from '@/store/features/follow/followAction';
import Notification from '@/components/shared/Notification';
import { SET_FOLLOW_TEACHER, SET_UNFOLLOW_TEACHER } from '@/store/features/teacher/teacherSlice';

export default function TeacherCard({ teacher, reviews, isFollowed, user }: any) {
    const filledStars = Math.round(reviews.averageRating);
    const totalStars = 5;

    const dispatch = useAppDispatch();
    const [show, setShow] = useState(false);
    const [alert, setAlert] = useState({ title: '', message: '', type: '' });

    let isStudent = user.roles?.includes('ROLE_STUDENT') ? true : false;

    const followHandler = async (e: any) => {
        e.preventDefault();

        const result = await dispatch(follow({ studentId: user.id, teacherId: teacher.id }));
        if (follow.fulfilled.match(result)) {
            setAlert({
                title: 'followed successfully !',
                message: 'you have followed successfully',
                type: 'success'
            });
            dispatch(SET_FOLLOW_TEACHER({ teacherId: teacher.id }));
        } else {
            setAlert({
                title: 'error occured ',
                message: 'an error occured while trying to follow the teacher, please try later',
                type: 'error'
            });
        }
    };

    const unFollowHandler = async (e: any) => {
        e.preventDefault();

        const result = await dispatch(unFollow({ studentId: user.id, teacherId: teacher.id }));
        if (unFollow.fulfilled.match(result)) {
            setAlert({
                title: 'unFollowed successfully !',
                message: 'you have unFollowed successfully',
                type: 'success'
            });
            dispatch(SET_UNFOLLOW_TEACHER({ teacherId: teacher.id }));
        } else {
            setAlert({
                title: 'error occured ',
                message: 'an error occured while trying to unFollow the teacher, please try later',
                type: 'error'
            });
        }
    };

    return (
        <div key={teacher.id} className="group relative p-2 m-2 shadow border-gray-200 sm:p-3 max-w-md">
            <Link href={`/dashboard/profile?id=${teacher.id}`}>
                <div className="relative bg-gray-200 aspect-w-1 aspect-h-1 group-hover:opacity-75 text-center w-full h-24">
                    {teacher.image ? (
                        <img
                            src={teacher.image}
                            className="absolute -bottom-8 inset-x-0 w-20 h-20 rounded-full mx-auto outline outline-2 outline-indigo-400"
                            alt={teacher.firstName + ' ' + teacher.lastName}
                        />
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
                {isStudent &&
                    (!isFollowed ? (
                        <button
                            onClick={followHandler}
                            className="mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary text-base font-medium text-white hover:bg-darkPrimary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-darkPrimary sm:col-start-2 sm:text-sm"
                        >
                            Follow
                        </button>
                    ) : (
                        <button
                            onClick={unFollowHandler}
                            className="mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-lightPrimary text-primary border-primary text-base font-medium hover:bg-darkPrimary hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-darkPrimary sm:col-start-2 sm:text-sm"
                        >
                            UnFollow
                        </button>
                    ))}
            </div>
            <Notification type={alert.type} title={alert.title} message={alert.message} show={show} setShow={setShow} />
        </div>
    );
}
