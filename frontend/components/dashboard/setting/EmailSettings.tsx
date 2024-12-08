import Notification from '@/components/shared/Notification';
import { useAppDispatch } from '@/hooks/appHooks';
import { sendCodeToEmail, updateEmail } from '@/store/features/auth/authAction';
import { RootState } from '@/store/redux';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { useSelector } from 'react-redux';

export default function EmailSetting() {
    const { data: session, status } = useSession();

    const [currentEmail, setCurrentEmail] = useState('');
    const [newEmail, setNewEmail] = useState('');

    const [codeSent, setCodeSent] = useState('');

    const [show, setShow] = useState(false);
    const [alert, setAlert] = useState({ title: '', message: '', type: '' });

    const [showCodeSentField, setShowCodeSentField] = useState(false);

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
        if (!currentEmail || !newEmail) {
            setAlert({
                title: 'All fileds are required !',
                message: 'Please make sure to fill all required fields !',
                type: 'error'
            });
            setShow(true);
            return;
        }

        const result = await dispatch(sendCodeToEmail({ currentEmail, newEmail, userId: session?.user.id }));

        if (sendCodeToEmail.fulfilled.match(result)) {
            setShow(true);
            setAlert({
                title: 'Email sent successfully !',
                message: 'we have sent an email to your old email address, please check it and fill the field below !',
                type: 'success'
            });
            setShowCodeSentField(true);
        } else {
            setShow(true);
            setAlert({
                title: 'An Error occured !',
                message: 'An Error Occured please try again later or contact support for help !',
                type: 'error'
            });
        }
    };

    const onSubmit2 = async (e: any) => {
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
        if (!codeSent) {
            setAlert({
                title: 'OTP Code is required !',
                message: 'Please make sure to fill all required fields !',
                type: 'error'
            });
            setShow(true);
            return;
        }
        const result = await dispatch(updateEmail({ currentEmail, newEmail, userId: session?.user.id, code: codeSent }));

        if (updateEmail.fulfilled.match(result)) {
            setShow(true);
            setAlert({
                title: 'Email updated successfully !',
                message: 'we have sent an email to your old email address, please check it and fill the field below !',
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
        <>
            {showCodeSentField ? (
                <form className="mt-6" onSubmit={onSubmit2}>
                    <div className="mb-3">
                        <label htmlFor="code" className="block text-sm font-medium text-gray-700">
                            The Sent Code
                        </label>
                        <input
                            type="number"
                            placeholder="Code of 4 degit here"
                            name="code"
                            id="code"
                            value={codeSent}
                            onChange={(e) => setCodeSent(e.target.value)}
                            autoComplete="cc-given-name"
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
                </form>
            ) : (
                <form className="mt-6" onSubmit={onSubmit}>
                    <div className="mb-3">
                        <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                            Current Email
                        </label>
                        <input
                            type="email"
                            placeholder="your current Email here"
                            name="currentEmail"
                            id="currentEmail"
                            value={currentEmail}
                            onChange={(e) => setCurrentEmail(e.target.value)}
                            autoComplete="cc-given-name"
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-3 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                            New Email
                        </label>
                        <input
                            type="password"
                            placeholder="your new Email here"
                            name="newEmail"
                            id="newEmail"
                            value={newEmail}
                            onChange={(e) => setNewEmail(e.target.value)}
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
                            {loading ? 'Sending ... ' : 'Send OTP Code'}
                            <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 24 24" id="send" fill="#fff">
                                <path fill="none" d="M0 0h24v24H0V0z"></path>
                                <path d="M3.4 20.4l17.45-7.48c.81-.35.81-1.49 0-1.84L3.4 3.6c-.66-.29-1.39.2-1.39.91L2 9.12c0 .5.37.93.87.99L17 12 2.87 13.88c-.5.07-.87.5-.87 1l.01 4.61c0 .71.73 1.2 1.39.91z"></path>
                            </svg>
                        </button>
                    </div>
                    <Notification type={alert.type} title={alert.title} message={alert.message} show={show} setShow={setShow} />
                </form>
            )}
        </>
    );
}
