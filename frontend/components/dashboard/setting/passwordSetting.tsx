import ErrorAlert from '@/components/shared/errorAlert';
import Notification from '@/components/shared/Notification';
import { useAppDispatch } from '@/hooks/appHooks';
import { updatePassword } from '@/store/features/auth/authAction';
import { RootState } from '@/store/redux';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { useSelector } from 'react-redux';

const PasswordSettings = () => {
    const { data: session, status } = useSession();

    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmationPassword, setConfirmationPassword] = useState('');

    const [show, setShow] = useState(false);
    const [alert, setAlert] = useState({ title: '', message: '', type: '' });

    const dispatch = useAppDispatch();

    const loading: any = useSelector((state: RootState) => state.auth.loading);
    const error: any = useSelector((state: RootState) => state.auth.error);

    const onSubmit = async (e: any) => {
        e.preventDefault();

        if (!session?.user.id) {
            setAlert({
                title: 'An Error occured !',
                message: 'An Error Occured please try again later or contact support for help !',
                type: 'error'
            });
            setShow(true);
            return;
        }

        if (!currentPassword || !newPassword || !confirmationPassword) {
            setAlert({
                title: 'All fileds are required !',
                message: 'Please make sure to fill all required fields !',
                type: 'error'
            });
            setShow(true);
            return;
        }
        const result = await dispatch(updatePassword({ currentPassword, newPassword, confirmationPassword, userId: session?.user.id }));
        if (updatePassword.fulfilled.match(result)) {
            setShow(true);
            setAlert({
                title: 'Updated successfully !',
                message: 'you have Updated your password successfully !',
                type: 'success'
            });
        } else {
            setShow(true);
            setAlert({
                title: 'An Error occured !',
                message: 'An Error Occured please try again later or contact support for help !',
                type: 'error'
            });
        }
    };
    return (
        <form className="mt-6" onSubmit={onSubmit}>
            {error ? <ErrorAlert title="error" message={error} /> : ''}
            <div className="mb-3">
                <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                    Current Password
                </label>
                <input
                    type="password"
                    placeholder="your password here"
                    name="password"
                    id="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    autoComplete="cc-given-name"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-3 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                />
            </div>
            <div className="mb-3">
                <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                    New Password
                </label>
                <input
                    type="password"
                    placeholder="your password here"
                    name="newPassword"
                    id="newPassword"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    autoComplete="cc-family-name"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-3 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                />
            </div>
            <div className="mb-3">
                <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                    Confirm New Password
                </label>
                <input
                    type="password"
                    placeholder="your password here"
                    name="confirmationPassword"
                    id="confirmationPassword"
                    value={confirmationPassword}
                    onChange={(e) => setConfirmationPassword(e.target.value)}
                    autoComplete="cc-family-name"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-3 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                />
            </div>
            <div className="mb-3">
                <button
                    type="submit"
                    disabled={loading}
                    className="flex justify-center items-center bg-primary hover:bg-darkPrimary focus:outline-none focus:shadow-outline-blue text-white py-2 px-4 rounded-md transition duration-300 gap-2"
                >
                    {loading ? 'Saving ... ' : 'Save'}
                    <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 24 24" id="send" fill="#fff">
                        <path fill="none" d="M0 0h24v24H0V0z"></path>
                        <path d="M3.4 20.4l17.45-7.48c.81-.35.81-1.49 0-1.84L3.4 3.6c-.66-.29-1.39.2-1.39.91L2 9.12c0 .5.37.93.87.99L17 12 2.87 13.88c-.5.07-.87.5-.87 1l.01 4.61c0 .71.73 1.2 1.39.91z"></path>
                    </svg>
                </button>
            </div>
            <Notification type={alert.type} title={alert.title} message={alert.message} show={show} setShow={setShow} />
        </form>
    );
};

export default PasswordSettings;
