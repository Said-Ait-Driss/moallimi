/* This example requires Tailwind CSS v2.0+ */
import { useAppDispatch } from '@/hooks/appHooks';
import { SET_SUCCESS_MESSAGE } from '@/store/features/auth/authSlice';
import { CheckCircleIcon } from '@heroicons/react/24/solid';

export default function SuucessAlert({ title, message }: any) {
    const dispatch = useAppDispatch();
    return (
        <div className="rounded-md bg-green-50 p-4">
            <div className="flex">
                <div className="flex-shrink-0">
                    <CheckCircleIcon className="h-5 w-5 text-green-400" aria-hidden="true" />
                </div>
                <div className="ml-3">
                    <h3 className="text-sm font-medium text-green-800"> {title}</h3>
                    <div className="mt-2 text-sm text-green-700">
                        <p>{message}</p>
                    </div>
                    <div className="mt-4">
                        <div className="-mx-2 -my-1.5 flex">
                            <button
                                type="button"
                                onClick={() => dispatch(SET_SUCCESS_MESSAGE(''))}
                                className="ml-3 bg-green-50 px-2 py-1.5 rounded-md text-sm font-medium text-green-800 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-green-50 focus:ring-green-600"
                            >
                                Dismiss
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
