import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react';
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/20/solid';
import clsx from 'clsx';

export default function Filter({ filters, selected, setSelected, query, setQuery, onSubmitHandler }: any) {

    return (
        <>
            <form className="max-w-3xl mx-auto" onSubmit={onSubmitHandler}>
                <div className="flex">
                    <div className="w-52">
                        <Listbox value={selected} onChange={setSelected}>
                            <ListboxButton
                                className={clsx(
                                    'relative block w-full bg-gray-50 p-2.5 py-2.5 pr-8 pl-3 text-left text-sm/6 text-gray-900 rounded-lg rounded-ee-none rounded-se-none border-e-0 border border-gray-300 focus:ring-primary focus:border-primary',
                                    'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25'
                                )}
                            >
                                {selected.name}
                                <ChevronDownIcon
                                    className="group pointer-events-none absolute top-3 right-2.5 size-4 fill-gray-900"
                                    aria-hidden="true"
                                />
                            </ListboxButton>
                            <ListboxOptions
                                anchor="bottom"
                                transition
                                className={clsx(
                                    'w-[var(--button-width)] rounded-lg rounded-se-none border border-gray-300 bg-gray-50 p-1 [--anchor-gap:var(--spacing-1)] focus:outline-none',
                                    'transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0  '
                                )}
                            >
                                {filters.map((filter: any) => (
                                    <ListboxOption
                                        key={filter.name}
                                        value={filter}
                                        className="group flex cursor-default items-center gap-2 rounded-lg py-1.5 px-3 select-none data-[focus]:bg-white/10 hover:bg-primary hover:cursor-pointer"
                                    >
                                        <CheckIcon className="invisible size-4 fill-gray-900 group-data-[selected]:visible" />
                                        <div className="text-sm/6 text-gray-900">{filter.name}</div>
                                    </ListboxOption>
                                ))}
                            </ListboxOptions>
                        </Listbox>
                    </div>
                    <div className="relative w-full">
                        <input
                            type="search"
                            id="search-dropdown"
                            className="block p-2.5 py-3 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-primary focus:border-primary outline-none"
                            placeholder="Search Mockups, Logos, Design Templates..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                        />
                        <button
                            type="submit"
                            className="absolute top-0 bottom-0 end-0 p-2 mt-0.5 mb-0.5 me-0.5 flex justify-center items-center bg-primary hover:bg-darkPrimary focus:outline-none focus:shadow-outline-blue text-white py-2 px-4 rounded-md transition duration-300 gap-2"
                        >
                            Search
                            <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 24 24" id="send" fill="#fff">
                                <path fill="none" d="M0 0h24v24H0V0z"></path>
                                <path d="M3.4 20.4l17.45-7.48c.81-.35.81-1.49 0-1.84L3.4 3.6c-.66-.29-1.39.2-1.39.91L2 9.12c0 .5.37.93.87.99L17 12 2.87 13.88c-.5.07-.87.5-.87 1l.01 4.61c0 .71.73 1.2 1.39.91z"></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </form>
        </>
    );
}
