'use client';

import { useState } from 'react';
import { RadioGroup } from '@headlessui/react';

function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ');
}

const plans = [
    { name: 'Basic', priceMonthly: 29, priceYearly: 290, limit: 'Up to 5 active job postings' },
    { name: 'Standard', priceMonthly: 99, priceYearly: 990, limit: 'Up to 25 active job postings' },
    { name: 'Premium', priceMonthly: 249, priceYearly: 2490, limit: 'Unlimited active job postings' }
];

export default function PlanSetting() {
    const [selectedPlan, setSelectedPlan] = useState(plans[1]);

    return (
        <section aria-labelledby="plan-heading">
            <form action="#" method="POST">
                <div className="sm:rounded-md sm:overflow-hidden">
                    <div className="bg-white py-6 px-4 space-y-6 sm:p-6">
                        <div>
                            <h2 id="plan-heading" className="text-lg leading-6 font-medium text-gray-900">
                                Plan
                            </h2>
                        </div>

                        <RadioGroup value={selectedPlan} onChange={setSelectedPlan}>
                            <RadioGroup.Label className="sr-only">Pricing plans</RadioGroup.Label>
                            <div className="relative bg-white rounded-md -space-y-px">
                                {plans.map((plan, planIdx) => (
                                    <RadioGroup.Option
                                        key={plan.name}
                                        value={plan}
                                        className={({ checked }) =>
                                            classNames(
                                                planIdx === 0 ? 'rounded-tl-md rounded-tr-md' : '',
                                                planIdx === plans.length - 1 ? 'rounded-bl-md rounded-br-md' : '',
                                                checked ? 'bg-lightPrimary border-lightPrimary z-10' : 'border-gray-200',
                                                'relative border border-l-0 border-r-0 p-4 flex flex-col cursor-pointer md:pl-4 md:pr-6 md:grid md:grid-cols-3 focus:outline-none'
                                            )
                                        }
                                    >
                                        {({ active, checked }) => (
                                            <>
                                                <div className="flex items-center text-sm">
                                                    <span
                                                        className={classNames(
                                                            checked ? 'bg-primary border-transparent' : 'bg-white border-gray-300',
                                                            active ? 'ring-2 ring-offset-2 ring-darkPrimary' : '',
                                                            'h-4 w-4 rounded-full border flex items-center justify-center'
                                                        )}
                                                        aria-hidden="true"
                                                    >
                                                        <span className="rounded-full bg-white w-1.5 h-1.5" />
                                                    </span>
                                                    <RadioGroup.Label as="span" className="ml-3 font-medium text-darkPrimary">
                                                        {plan.name}
                                                    </RadioGroup.Label>
                                                </div>
                                                <RadioGroup.Description className="ml-6 pl-1 text-sm md:ml-0 md:pl-0 md:text-center">
                                                    <span className={classNames(checked ? 'text-darkPrimary' : 'text-darkPrimary', 'font-medium')}>
                                                        ${plan.priceMonthly} / mo
                                                    </span>{' '}
                                                    <span className={checked ? 'text-primary' : 'text-gray-500'}>(${plan.priceYearly} / yr)</span>
                                                </RadioGroup.Description>
                                                <RadioGroup.Description
                                                    className={classNames(
                                                        checked ? 'text-primary' : 'text-gray-500',
                                                        'ml-6 pl-1 text-sm md:ml-0 md:pl-0 md:text-right'
                                                    )}
                                                >
                                                    {plan.limit}
                                                </RadioGroup.Description>
                                            </>
                                        )}
                                    </RadioGroup.Option>
                                ))}
                            </div>
                        </RadioGroup>

                    </div>
                    <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                        <button
                            type="submit"
                            className="bg-primary border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-darkPrimary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-darkPrimary"
                        >
                            Save
                        </button>
                    </div>
                </div>
            </form>
        </section>
    );
}
