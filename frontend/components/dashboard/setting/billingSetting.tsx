import { useState } from 'react';
import { Switch } from '@headlessui/react';

function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ');
}

const payments = [
    {
        id: 1,
        date: '1/1/2020',
        datetime: '2020-01-01',
        description: 'Business Plan - Annual Billing',
        amount: 'CA$109.00',
        href: '#'
    },
    {
        id: 1,
        date: '1/1/2020',
        datetime: '2020-01-01',
        description: 'Business Plan - Annual Billing',
        amount: 'CA$109.00',
        href: '#'
    },
    {
        id: 1,
        date: '1/1/2020',
        datetime: '2020-01-01',
        description: 'Business Plan - Annual Billing',
        amount: 'CA$109.00',
        href: '#'
    }
];

const BillingSettings = () => {
    const [annualBillingEnabled, setAnnualBillingEnabled] = useState(true);

    return (
        <div className="mt-6">
            <Switch.Group as="div" className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:pt-5">
                <Switch.Label as="span" className="text-sm font-medium text-gray-500">
                    <span className="text-sm font-medium">Annual billing </span>
                    <span className="text-sm text-gray-500">(Save 10%)</span>
                </Switch.Label>

                <dd className="mt-1 flex text-sm text-primary sm:mt-0 sm:col-span-2">
                    <Switch
                        checked={annualBillingEnabled}
                        onChange={setAnnualBillingEnabled}
                        className={classNames(
                            annualBillingEnabled ? 'bg-primary' : 'bg-gray-200',
                            'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary sm:ml-auto'
                        )}
                    >
                        <span
                            aria-hidden="true"
                            className={classNames(
                                annualBillingEnabled ? 'translate-x-5' : 'translate-x-0',
                                'inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200'
                            )}
                        />
                    </Switch>
                </dd>
            </Switch.Group>
            <section aria-labelledby="billing-history-heading" className='border-t '>
                <div className="bg-white pt-6 sm:rounded-md sm:overflow-hidden">
                    <div className="">
                        <h2 id="billing-history-heading" className="text-lg leading-6 font-medium text-gray-900">
                            Billing history
                        </h2>
                    </div>
                    <div className="mt-6 flex flex-col">
                        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                                <div className="overflow-hidden border-t border-gray-200">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                >
                                                    Date
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                >
                                                    Description
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                >
                                                    Amount
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="relative px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                >
                                                    <span className="sr-only">View receipt</span>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {payments.map((payment) => (
                                                <tr key={payment.id}>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                        <time dateTime={payment.datetime}>{payment.date}</time>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{payment.description}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{payment.amount}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                        <a href={payment.href} className="text-primary hover:text-darkPrimary">
                                                            View receipt
                                                        </a>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default BillingSettings;
