'use client';
import { Fragment, useState } from 'react';
import { ComboboxButton, ComboboxInput, ComboboxOption, ComboboxOptions, Dialog, DialogBackdrop, DialogTitle, Transition } from '@headlessui/react';
import { CheckIcon } from '@heroicons/react/24/solid';
import { HiSelector } from 'react-icons/hi';
import { Combobox } from '@headlessui/react';
import Notification from '@/components/shared/Notification';
import { RootState } from '@/store/redux';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '@/hooks/appHooks';
import { createLesson, lessonsList } from '@/store/features/lesson/lessonAction';
import { useSession } from 'next-auth/react';
import { ADD_LESSON_TO_LIST } from '@/store/features/lesson/lessonSlice';

function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ');
}

export default function NewLesson() {
    const [open, setOpen] = useState(false);
    const [show, setShow] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const { data: session, status } = useSession();

    const [selectedClasse, setSelectedClasse]: any = useState();
    const [selectedCategory, setSelectedCategory]: any = useState();
    const [selectedLessonDuration, setSelectedLessonDuration]: any = useState();
    const [lessonDate, setLessonDate]: any = useState();
    const [lessonDescription, setLessonDescription]: any = useState();

    const classes: any = useSelector((state: RootState) => state.classe.classes);
    const loading = useSelector((state: RootState) => state.classe.loading);

    const lessonCategories: any = useSelector((state: RootState) => state.lessonCategories.lessonCategories);
    const loading2 = useSelector((state: RootState) => state.lessonCategories.loading);

    const lessonDurations: any = useSelector((state: RootState) => state.lessonDuration.lessonDurations);
    const loading3 = useSelector((state: RootState) => state.lessonDuration.loading);

    const dispatch = useAppDispatch();

    const onCreateNewLesson = async () => {
        if (!lessonDescription || !selectedClasse || !selectedCategory || !selectedLessonDuration || !lessonDate) {
            setShow(true);
            return;
        }
        if (session?.user?.roles?.includes('ROLE_TEACHER')) {
            const teacher = {
                id: session?.user.id,
                email: session?.user.email
            };
            const lessonToCreate = {
                title: lessonDescription,
                description: lessonDescription,
                teacher: teacher,
                lessonCategory: selectedCategory,
                classe: selectedClasse,
                lessonType: selectedLessonDuration,
                starTime: lessonDate,
                date: lessonDate
            };
            const result: any = await dispatch(createLesson(lessonToCreate));
            if (createLesson.fulfilled.match(result)) {
                setShowSuccess(true);
                setLessonDescription('');
                setSelectedCategory(null);
                setSelectedClasse(null);
                setSelectedLessonDuration(null);
                setLessonDate(null);
                setOpen(false);
                const result = dispatch(ADD_LESSON_TO_LIST({ lesson: lessonToCreate }));
            } else {
                console.log('here ');
                console.log(result.payload);
            }
        }
    };

    return (
        <div className="max-w-3xl border p-4 rounded mx-auto my-4">
            <div className="flex space-x-2">
                <img src="/user-cover-2.png" alt="" className="rounded-full h-12" />
                <div className="mb-6 flex-auto">
                    <textarea
                        id="postContent"
                        name="postContent"
                        onClick={() => setOpen(true)}
                        value={lessonDescription}
                        className="w-full border border-gray-300 rounded-md px-4 py-2 leading-5 transition duration-150 ease-in-out sm:text-sm
                    sm:leading-5 resize-none focus:outline-none focus:border-darkPrimary focus:border-2"
                        placeholder="What's on your mind?"
                    ></textarea>
                </div>
            </div>
            {!open && (
                <div>
                    <small className="text-gray-500">Start scheduling a lesson ?</small>
                </div>
            )}

            <Transition.Root show={open} as={Fragment}>
                <Dialog as="div" className="fixed inset-0 overflow-y-auto z-10" onClose={() => setOpen(false)}>
                    <DialogBackdrop className="fixed inset-0 bg-black/30" />
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                            &#8203;
                        </span>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                                <div>
                                    <div className="mt-3 text-center sm:mt-5">
                                        <DialogTitle as="h3" className="text-lg leading-6 font-medium text-gray-900">
                                            Create New Lesson
                                        </DialogTitle>
                                        <div className="mt-2">
                                            <div className="mb-6">
                                                <label htmlFor="fileAttachment" className="block text-gray-700 text-sm font-bold mb-2 text-start">
                                                    Lesson Description :
                                                </label>
                                                <textarea
                                                    id="postContent"
                                                    name="postContent"
                                                    rows={3}
                                                    value={lessonDescription}
                                                    onChange={(e) => setLessonDescription(e.target.value)}
                                                    className="w-full border border-gray-300 rounded-md px-4 py-2 leading-5 transition duration-150 ease-in-out sm:text-sm
                    sm:leading-5 resize-none focus:outline-none focus:border-darkPrimary hover:border-darkPrimary"
                                                    placeholder="What's on your mind?"
                                                ></textarea>
                                            </div>

                                            <div className="mb-6">
                                                <label htmlFor="fileAttachment" className="block text-gray-700 text-sm font-bold mb-2 text-start">
                                                    Lesson Classe:
                                                </label>
                                                <Combobox as="div" value={selectedClasse} onChange={setSelectedClasse}>
                                                    <div className="relative mt-1 ">
                                                        <ComboboxInput
                                                            className="w-full rounded-md border border-gray-300 bg-white shadow-sm hover:border-darkPrimary focus:border-primary focus:outline-none focus:ring-primary px-4 py-3"
                                                            displayValue={(classe: any) => classe?.title}
                                                        />
                                                        <ComboboxButton className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
                                                            <HiSelector className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                                        </ComboboxButton>

                                                        {loading
                                                            ? 'loading'
                                                            : classes?.content?.length > 0 && (
                                                                  <ComboboxOptions className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                                                      {classes?.content?.map((classe: any) => (
                                                                          <Combobox.Option
                                                                              key={classe?.id}
                                                                              value={classe}
                                                                              className={({ active }) =>
                                                                                  classNames(
                                                                                      'relative cursor-default select-none py-2 pl-3 pr-9',
                                                                                      active ? 'bg-darkPrimary text-white' : 'text-gray-900'
                                                                                  )
                                                                              }
                                                                          >
                                                                              {({ active, selected }) => (
                                                                                  <>
                                                                                      <span
                                                                                          className={classNames(
                                                                                              'block truncate',
                                                                                              selected && 'font-semibold'
                                                                                          )}
                                                                                      >
                                                                                          {classe?.title}
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
                                                                          </Combobox.Option>
                                                                      ))}
                                                                  </ComboboxOptions>
                                                              )}
                                                    </div>
                                                </Combobox>
                                            </div>

                                            {/*  lesson category */}
                                            <div className="mb-6">
                                                <label htmlFor="fileAttachment" className="block text-gray-700 text-sm font-bold mb-2 text-start">
                                                    Lesson Duration :
                                                </label>
                                                <Combobox as="div" value={selectedCategory} onChange={setSelectedCategory}>
                                                    <div className="relative mt-1 ">
                                                        <ComboboxInput
                                                            className="w-full rounded-md border border-gray-300 bg-white shadow-sm hover:border-darkPrimary focus:border-primary focus:outline-none focus:ring-primary px-4 py-3"
                                                            displayValue={(lessonType: any) => lessonType?.lessonCategory}
                                                        />
                                                        <ComboboxButton className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
                                                            <HiSelector className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                                        </ComboboxButton>

                                                        <ComboboxOptions className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                                            {loading2
                                                                ? 'loading'
                                                                : lessonCategories.map((lessonCategory: any) => (
                                                                      <ComboboxOption
                                                                          key={lessonCategory?.id}
                                                                          value={lessonCategory}
                                                                          className={({ active }) =>
                                                                              classNames(
                                                                                  'relative cursor-default select-none py-2 pl-3 pr-9',
                                                                                  active ? 'bg-darkPrimary text-white' : 'text-gray-900'
                                                                              )
                                                                          }
                                                                      >
                                                                          {({ active, selected }) => (
                                                                              <>
                                                                                  <span
                                                                                      className={classNames(
                                                                                          'block truncate',
                                                                                          selected && 'font-semibold'
                                                                                      )}
                                                                                  >
                                                                                      {lessonCategory?.lessonCategory}
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

                                            {/*  lesson duration */}
                                            <div className="mb-6">
                                                <label htmlFor="fileAttachment" className="block text-gray-700 text-sm font-bold mb-2 text-start">
                                                    Lesson Type :
                                                </label>
                                                <Combobox as="div" value={selectedLessonDuration} onChange={setSelectedLessonDuration}>
                                                    <div className="relative mt-1 ">
                                                        <ComboboxInput
                                                            className="w-full rounded-md border border-gray-300 bg-white shadow-sm hover:border-darkPrimary focus:border-primary focus:outline-none focus:ring-primary px-4 py-3"
                                                            displayValue={(lessonDuration: any) => lessonDuration?.type}
                                                        />
                                                        <ComboboxButton className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
                                                            <HiSelector className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                                        </ComboboxButton>

                                                        <ComboboxOptions className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                                            {loading3
                                                                ? 'loading'
                                                                : lessonDurations.map((lessonDuration: any) => (
                                                                      <ComboboxOption
                                                                          key={lessonDuration?.id}
                                                                          value={lessonDuration}
                                                                          className={({ active }) =>
                                                                              classNames(
                                                                                  'relative cursor-default select-none py-2 pl-3 pr-9',
                                                                                  active ? 'bg-darkPrimary text-white' : 'text-gray-900'
                                                                              )
                                                                          }
                                                                      >
                                                                          {({ active, selected }) => (
                                                                              <>
                                                                                  <span
                                                                                      className={classNames(
                                                                                          'block truncate',
                                                                                          selected && 'font-semibold'
                                                                                      )}
                                                                                  >
                                                                                      {lessonDuration?.type}
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

                                            <div className="mb-6">
                                                <label htmlFor="fileAttachment" className="block text-gray-700 text-sm font-bold mb-2 text-start">
                                                    Lesson Date:
                                                </label>
                                                <div className="relative border rounded-md px-4 py-3 bg-white flex items-center justify-between hover:border-darkPrimary transition duration-150 ease-in-out">
                                                    <input
                                                        type="datetime-local"
                                                        id="datePost"
                                                        name="datePost"
                                                        value={lessonDate}
                                                        onChange={(e) => setLessonDate(e.target.value)}
                                                        className="outline-none outline-0 ring-0 w-full cursor-pointer border-0 p-0"
                                                    />
                                                </div>
                                            </div>

                                            <div className="mb-6">
                                                <label htmlFor="fileAttachment" className="block text-gray-700 text-sm font-bold mb-2 text-start">
                                                    Attach File:
                                                </label>
                                                <div className="relative border rounded-md px-4 py-3 bg-white flex items-center justify-between hover:border-darkPrimary transition duration-150 ease-in-out">
                                                    <input
                                                        type="file"
                                                        id="fileAttachment"
                                                        name="fileAttachment"
                                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                                    />
                                                    <div className="flex items-center">
                                                        <svg
                                                            className="w-6 h-6 text-gray-400"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            viewBox="0 0 24 24"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <path
                                                                stroke-linecap="round"
                                                                stroke-linejoin="round"
                                                                stroke-width="2"
                                                                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                                            ></path>
                                                        </svg>
                                                        <span className="ml-2 text-sm text-gray-600">Choose a file</span>
                                                    </div>
                                                    <span className="text-sm text-gray-500">Max file size: 5MB</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                                    <button
                                        onClick={onCreateNewLesson}
                                        type="button"
                                        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary text-base font-medium text-white hover:bg-darkPrimary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-darkPrimary sm:col-start-2 sm:text-sm"
                                    >
                                        Create{' '}
                                        <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 24 24" id="send" fill="#fff">
                                            <path fill="none" d="M0 0h24v24H0V0z"></path>
                                            <path d="M3.4 20.4l17.45-7.48c.81-.35.81-1.49 0-1.84L3.4 3.6c-.66-.29-1.39.2-1.39.91L2 9.12c0 .5.37.93.87.99L17 12 2.87 13.88c-.5.07-.87.5-.87 1l.01 4.61c0 .71.73 1.2 1.39.91z"></path>
                                        </svg>
                                    </button>
                                    <button
                                        type="button"
                                        className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-darkPrimary sm:mt-0 sm:col-start-1 sm:text-sm"
                                        onClick={() => setOpen(false)}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition.Root>

            <Notification
                type="success"
                title="completed successfully !"
                message="Lesson Creation completed"
                show={showSuccess}
                setShow={setShowSuccess}
            />
            <Notification type="error" title="all fields are required" message="Please fill are required fields" show={show} setShow={setShow} />
        </div>
    );
}
