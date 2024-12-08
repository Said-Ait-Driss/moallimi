import { RootState } from '@/store/redux';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import ErrorAlert from '@/components/shared/errorAlert';
import Notification from '@/components/shared/Notification';
import { useAppDispatch } from '@/hooks/appHooks';
import { Combobox, ComboboxButton, ComboboxInput, ComboboxOption, ComboboxOptions } from '@headlessui/react';
import { HiSelector } from 'react-icons/hi';
import { CheckIcon } from '@heroicons/react/24/solid';
import { changeAcademicLevel } from '@/store/features/academicLevel/academicLevelAction';
import { profile } from '@/store/features/profile/profileAction';

function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ');
}

export default function AcademicLevelSettings({ userAcademicLevel, academicLevels }: any) {
    const { data: session, status } = useSession();

    const [show, setShow] = useState(false);
    const [alert, setAlert] = useState({ title: '', message: '', type: '' });
    const [selectedAcademicLevel, setSelectedAcademicLevel] = useState(userAcademicLevel);

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

        if (!selectedAcademicLevel) {
            setAlert({
                title: 'An Error occured !',
                message: 'Select a valid academic level !',
                type: 'error'
            });
            setShow(true);
            return;
        }
        const result = await dispatch(changeAcademicLevel({ userId: session.user.id, academicLevel: selectedAcademicLevel }));
        if (changeAcademicLevel.fulfilled.match(result)) {
            setShow(true);
            setAlert({
                title: 'Updated successfully !',
                message: 'you have Updated your password successfully !',
                type: 'success'
            });
            const result2 = dispatch(profile({ userId: session?.user.id }));
            return () => {
                result2.abort();
            };
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
                <div className="mb-6">
                    <label htmlFor="fileAttachment" className="block text-gray-700 text-sm mb-2 text-start">
                        Academic Level :
                    </label>
                    <Combobox as="div" value={selectedAcademicLevel} onChange={setSelectedAcademicLevel}>
                        <div className="relative mt-1 ">
                            <ComboboxInput
                                className="w-full rounded-md border border-gray-300 bg-white shadow-sm hover:border-darkPrimary focus:border-primary focus:outline-none focus:ring-primary px-4 py-3"
                                displayValue={(academicLevel: any) => academicLevel?.name}
                            />
                            <ComboboxButton className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
                                <HiSelector className="h-5 w-5 text-gray-400" aria-hidden="true" />
                            </ComboboxButton>

                            <ComboboxOptions className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                {loading
                                    ? 'loading'
                                    : academicLevels.map((academicLevel: any) => (
                                          <ComboboxOption
                                              key={academicLevel?.id}
                                              value={academicLevel}
                                              className={({ active }) =>
                                                  classNames(
                                                      'relative cursor-default select-none py-2 pl-3 pr-9',
                                                      active ? 'bg-darkPrimary text-white' : 'text-gray-900'
                                                  )
                                              }
                                          >
                                              {({ active, selected }) => (
                                                  <>
                                                      <span className={classNames('block truncate', selected && 'font-semibold')}>
                                                          {academicLevel?.name}
                                                      </span>

                                                      {selected && (
                                                          <span
                                                              className={classNames(
                                                                  'absolute inset-y-0 right-0 flex items-center pr-4',
                                                                  active ? 'text-white' : 'text-darkPrimary'
                                                              )}
                                                          >
                                                              <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                          </span>
                                                      )}
                                                  </>
                                              )}
                                          </ComboboxOption>
                                      ))}
                            </ComboboxOptions>
                        </div>
                    </Combobox>
                </div>
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
}
