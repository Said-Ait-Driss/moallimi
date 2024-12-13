import NotificationCard from '@/components/dashboard/notification/notificationCard';

const people = [
    {
        name: 'Lindsay Walton',
        imageUrl:
            'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=256&h=256&q=80'
    }
];
const notifications = [
    { id: 1, user: people[0], content: 'Said has follwed you', createdAt: '1h' },
    { id: 2, user: people[0], content: 'Said has follwed you', createdAt: '1h' },
    { id: 3, user: people[0], content: 'Said has follwed you', createdAt: '1h' },
    { id: 4, user: people[0], content: 'Said has follwed you', createdAt: '1h' },
    { id: 5, user: people[0], content: 'Said has follwed you', createdAt: '1h' },
];

export default function Notification() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-6">
            <div className="col-span-1"></div>
            <div className="bg-white col-span-8">
                <div className="max-w-3xl flex w-full items-center rounded-full mx-auto">
                    <div className="flex-1 border-b border-gray-300"></div>
                    <span className="text-black text-md font-semibold leading-8 px-8 py-3">Notifications</span>
                    <div className="flex-1 border-b border-gray-300"></div>
                </div>

                <div className="max-w-3xl mx-auto overflow-hidden sm:px-6 lg:px-4">
                    <ul role="list" className="divide-y divide-gray-200">
                        {notifications.map((item: any) => (
                            <NotificationCard notification={item} key={item.id} />
                        ))}
                    </ul>
                </div>
            </div>
            <div className="col-span-3">
                <div className="flex items-center justify-center border rounded bg-lightPrimary max-w-72">
                    <div className="m-4">
                        <img
                            src="https://media.licdn.com/media/AAYQAgTPAAgAAQAAAAAAADVuOvKzTF-3RD6j-qFPqhubBQ.png"
                            alt=""
                            className="rounded mx-auto"
                        />
                        <div className="flex flex-wrap justify-center mt-2 gap-3 text-gray-500">
                            <small>Infos</small>
                            <small>Accessibilité</small>
                            <small>Assistance clientèle</small>
                            <small>Préférences Pubs</small>
                            <small>Publicité</small>
                            MyLogo Corporation © 2024
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
