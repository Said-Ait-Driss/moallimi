'use client';
import Notification from '@/components/shared/Notification';
import { useAppDispatch } from '@/hooks/appHooks';
import { addComment, lessonDiscussionsList } from '@/store/features/lessonDiscussion/lessonDiscussionAction';
import { RootState } from '@/store/redux';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export default function LessonComments({ commentsCount, lesson, user }: any) {
    const dispatch = useAppDispatch();

    const [comment, setComment] = useState('');
    const [showSuccess, setShowSuccess] = useState(false);
    const [openErrNotification, setOpenErrNotification] = useState(false);

    const lessonDiscussions: any = useSelector((state: RootState) => state.lessonDiscussion.lessonDiscussions);
    const loading: any = useSelector((state: RootState) => state.lessonDiscussion.loading);
    const error: any = useSelector((state: RootState) => state.lessonDiscussion.error);

    useEffect(() => {
        const result = dispatch(lessonDiscussionsList({ lessonId: lesson.id, page: 0, size: 10 }));
        return () => {
            result.abort();
        };
    }, []);

    const postCommentHandler = async (e: any) => {
        e.preventDefault();
        if (!comment || !lesson.id || !user.id) {
            setOpenErrNotification(true);
            return;
        }
        const result = await dispatch(
            addComment({
                lesson,
                comment,
                user: { email: user.email, id: user.id, username: user.username, firstName: user.firstName, lastName: user.lastName }
            })
        );
        if (addComment.fulfilled.match(result)) {
            setComment('');
            setShowSuccess(true);
        }
    };

    return (
        <section className="bg-white py-8 antialiased">
            <div className="max-w-3xl mx-auto px-4">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-lg lg:text-1xl font-bold text-gray-900 ">Discussion ({commentsCount})</h2>
                </div>
                <form className="mb-6" onSubmit={postCommentHandler}>
                    <div
                        className={`py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 0 ${openErrNotification ? 'border border-1 border-red-400' : ''} `}
                    >
                        <label htmlFor="comment" className="sr-only">
                            Your comment
                        </label>
                        <textarea
                            id="comment"
                            rows={6}
                            className={`px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none ${openErrNotification ? 'border border-1 border-red-400' : ''} `}
                            placeholder="Write a comment..."
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        ></textarea>
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="inline-flex items-center py-2.5 px-4 rounded-md  text-center text-white bg-primary text-base font-medium hover:bg-darkPrimary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-darkPrimary sm:col-start-2 sm:text-sm"
                    >
                        {!loading ? 'Post comment' : 'adding ...'}
                    </button>
                </form>
                {loading
                    ? 'loading'
                    : lessonDiscussions.content?.map((subscription: any) => (
                          <article className="p-6 text-base bg-white rounded-lg ">
                              <footer className="flex justify-between items-center mb-2">
                                  <div className="flex items-center">
                                      <p className="inline-flex items-center mr-3 text-sm text-gray-900 font-semibold">
                                          {subscription.user.image ? (
                                              <img
                                                  src={subscription.user.image}
                                                  className="w-6 h-6 rounded-full border-2 border-gray-300 shadow-sm"
                                                  alt={`${subscription.user.firstName} ${subscription.user.lastName}`}
                                              />
                                          ) : (
                                              <span className="inline-block h-6 w-6 rounded-full overflow-hidden bg-gray-100 border-2 border-gray-300 shadow-sm">
                                                  <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                                                      <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                                                  </svg>
                                              </span>
                                          )}
                                          <span className="ms-2">{subscription.user.firstName + ' ' + subscription.user.lastName}</span>
                                      </p>
                                      <p className="text-sm text-gray-600 ">
                                          <time title="February 8th, 2022">{new Date(subscription.createdAt).toUTCString()}</time>
                                      </p>
                                  </div>
                                  <button
                                      id="dropdownComment1Button"
                                      data-dropdown-toggle="dropdownComment1"
                                      className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500  bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50"
                                      type="button"
                                  >
                                      <svg
                                          className="w-4 h-4"
                                          aria-hidden="true"
                                          xmlns="http://www.w3.org/2000/svg"
                                          fill="currentColor"
                                          viewBox="0 0 16 3"
                                      >
                                          <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                                      </svg>
                                      <span className="sr-only">Comment settings</span>
                                  </button>
                                  <div id="dropdownComment1" className="hidden z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow ">
                                      <ul className="py-1 text-sm text-gray-700 " aria-labelledby="dropdownMenuIconHorizontalButton">
                                          <li>
                                              <a href="#" className="block py-2 px-4 hover:bg-gray-100">
                                                  Edit
                                              </a>
                                          </li>
                                          <li>
                                              <a href="#" className="block py-2 px-4 hover:bg-gray-100">
                                                  Remove
                                              </a>
                                          </li>
                                          <li>
                                              <a href="#" className="block py-2 px-4 hover:bg-gray-100">
                                                  Report
                                              </a>
                                          </li>
                                      </ul>
                                  </div>
                              </footer>
                              <p className="text-gray-500 ">{subscription.comment}</p>
                          </article>
                      ))}
            </div>

            <Notification
                type="success"
                title="completed successfully !"
                message="Commented successfully !"
                show={showSuccess}
                setShow={setShowSuccess}
            />
            <Notification
                type="error"
                title="all fields are required"
                message="Please fill are required fields"
                show={openErrNotification}
                setShow={setOpenErrNotification}
            />
        </section>
    );
}
