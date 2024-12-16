import { ArrowSmallDownIcon, ArrowSmallUpIcon } from '@heroicons/react/24/solid';

const stats = [
    { name: 'Total Subscribers', stat: '71,897', previousStat: '70,946', change: '12%', changeType: 'increase' },
    { name: 'Total Students', stat: '58.16%', previousStat: '56.14%', change: '2.02%', changeType: 'increase' },
    { name: 'Total Teachers', stat: '24.57%', previousStat: '28.62%', change: '4.05%', changeType: 'decrease' },
    { name: 'Total Teachers', stat: '24.57%', previousStat: '28.62%', change: '4.05%', changeType: 'decrease' }
];

function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ');
}

export default function GeneralState({ state }: any) {
    return (
        <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900">Last 30 days</h3>
            <dl className="mt-5 grid grid-cols-1 rounded-lg bg-white overflow-hidden  divide-y divide-gray-200 md:grid-cols-5 md:divide-y-0 md:divide-x space-x-2">
                {state.map((item: any) => (
                    <div key={item.itemName} className="px-4 py-5 sm:p-6">
                        <dt className="text-sm font-normal text-gray-900">{item.itemName}</dt>
                        <dd className="mt-1 flex justify-between items-baseline md:block lg:flex">
                            <div className="flex items-baseline text-xl font-semibold text-primary">
                                {item.currentValue}
                                <span className="ml-2 text-xs font-medium text-gray-500">from {item.previousValue}</span>
                            </div>

                            <div
                                className={classNames(
                                    item.percentageIncrease > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800',
                                    'inline-flex items-baseline px-2.5 py-0.5 rounded-full text-xs font-medium md:mt-2 lg:mt-0'
                                )}
                            >
                                {item.percentageIncrease > 0 ? (
                                    <ArrowSmallUpIcon className="-ml-1 mr-0.5 flex-shrink-0 self-center h-5 w-5 text-green-500" aria-hidden="true" />
                                ) : (
                                    <ArrowSmallDownIcon className="-ml-1 mr-0.5 flex-shrink-0 self-center h-5 w-5 text-red-500" aria-hidden="true" />
                                )}

                                <span className="sr-only">{item.percentageIncrease > 0 ? 'Increased' : 'Decreased'} by</span>
                                {item.percentageIncrease}
                            </div>
                        </dd>
                    </div>
                ))}
            </dl>
        </div>
    );
}
