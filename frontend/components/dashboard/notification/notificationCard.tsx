export default function NotificationCard({ notification }: any) {
    return (
        <li  className={`py-4 px-2 my-1 rounded ${notification.isRead == false ?  'bg-lightPrimary' :''}`}>
            <div className="flex space-x-3">
                <div className="">
                    {notification.from?.image ? (
                        <img className="h-12 w-12 rounded-full" src={notification.from.image} alt="" />
                    ) : (
                        <span className="h-12 w-12 inline-block rounded-full overflow-hidden bg-gray-100 mx-auto outline outline-2 outline-indigo-400">
                            <svg className="h-12 w-12 text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                        </span>
                    )}
                </div>
                <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                        <h3 className="text-sm font-medium">{notification.from.firstName + " " + notification.from.lastName }</h3>
                        <p className="text-sm text-gray-500">{notification.createdAt}</p>
                    </div>
                    <p className="text-sm text-gray-500">{notification.content}</p>
                </div>
            </div>
        </li>
    );
}
