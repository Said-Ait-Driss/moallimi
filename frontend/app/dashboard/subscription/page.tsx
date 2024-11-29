import SubscribersPagination from "@/components/dashboard/subscription/pagination";
import SubscribersTable from "@/components/dashboard/subscription/table";


export default function Subscribers() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-6">
            <div className="col-span-1"></div>
            <div className="col-span-8">
                <div className="text-center py-4 px-4 sm:px-6 lg:px-8 relative">
                    <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">Subscribers</h1>
                    <p className="mt-4 max-w-xl mx-auto text-base text-gray-500">
                        The secret to a tidy desk? Don't get rid of anything, just put it in really really nice looking containers.
                    </p>
                </div>
                <SubscribersTable />
                <SubscribersPagination />
            </div>
        </div>
    );
}
