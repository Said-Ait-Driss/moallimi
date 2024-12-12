import Notification from '@/components/shared/Notification';
import { useAppDispatch } from '@/hooks/appHooks';
import { enrollToClasse, unEnrollToClasse } from '@/store/features/classe/classeAction';
import { ENROLLED_STUDENT_TO_CLASSE, UNENROLLED_STUDENT_FROM_CLASSE } from '@/store/features/classe/classeSlice';
import Link from 'next/link';
import { useState } from 'react';

export default function ClasseCard({ classe, user }: any) {
    const dispatch = useAppDispatch();
    const [show, setShow] = useState(false);
    const [alert, setAlert] = useState({ title: '', message: '', type: '' });

    let isStudent = user.roles?.includes('ROLE_STUDENT') ? true : false;

    const enrollHandler = async (e: any) => {
        e.preventDefault();

        const result = await dispatch(enrollToClasse({ classeId: classe.id, studentId: user.id }));
        if (enrollToClasse.fulfilled.match(result)) {
            setAlert({
                title: 'enrolled successfully !',
                message: 'you have enrolled successfully',
                type: 'success'
            });
            dispatch(ENROLLED_STUDENT_TO_CLASSE({ classeId: classe.id }));

        } else {
            setAlert({
                title: 'error occured ',
                message: 'an error occured while trying to enroll to the classe, please try later',
                type: 'error'
            });
        }
    };

    const unEnrollHandler = async (e: any) => {
        e.preventDefault();

        const result = await dispatch(unEnrollToClasse({ classeId: classe.id, studentId: user.id }));
        if (unEnrollToClasse.fulfilled.match(result)) {
            setAlert({
                title: 'unenroll successfully !',
                message: 'you have unenrolled successfully',
                type: 'success'
            });
            dispatch(UNENROLLED_STUDENT_FROM_CLASSE({ classeId: classe.id }));
        } else {
            setAlert({
                title: 'error occured ',
                message: 'an error occured while trying to unenroll to the classe, please try later',
                type: 'error'
            });
        }
    };

    return (
        <div key={classe.id} className="group relative p-2 border-r border-b border-gray-200 sm:p-4">
            <div className="rounded-lg overflow-hidden bg-gray-200 aspect-w-1 aspect-h-1 group-hover:opacity-75">
                <img src={classe.image} alt={classe.title} className="w-full h-full object-center object-cover" />
            </div>
            <div className="pt-10 pb-4 text-center">
                <h3 className="text-sm font-medium text-gray-900">
                    <Link href={'/classe/' + classe.id}>{classe.title}</Link>
                </h3>
                <div className="mt-3 flex flex-col items-center">
                    <p className="mt-1 text-sm text-gray-500">{classe.studentCount} students</p>
                </div>
                <p className="mt-4 text-base font-medium text-gray-900">{classe.academicLevel.name}</p>
                {isStudent &&
                    (!classe.isEnrolled ? (
                        <button
                            onClick={enrollHandler}
                            className="mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary text-base font-medium text-white hover:bg-darkPrimary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-darkPrimary sm:col-start-2 sm:text-sm"
                        >
                            Enroll
                        </button>
                    ) : (
                        <button
                            onClick={unEnrollHandler}
                            className="mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-lightPrimary text-primary border-primary text-base font-medium hover:bg-darkPrimary hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-darkPrimary sm:col-start-2 sm:text-sm"
                        >
                            Enrolled
                        </button>
                    ))}
            </div>

            <Notification type={alert.type} title={alert.title} message={alert.message} show={show} setShow={setShow} />
        </div>
    );
}
