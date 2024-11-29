const PasswordSettings = () => {
    return (
        <div className="mt-6">
            <div className="mb-3">
                <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                    Current Password
                </label>
                <input
                    type="password"
                    placeholder="your password here"
                    name="first-name"
                    id="first-name"
                    autoComplete="cc-given-name"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-3 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                />
            </div>
            <div className="mb-3">
                <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                    New Password
                </label>
                <input
                    type="password"
                    placeholder="your password here"
                    name="last-name"
                    id="last-name"
                    autoComplete="cc-family-name"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-3 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                />
            </div>
            <div className="mb-3">
                <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                    Confirm New Password
                </label>
                <input
                    type="password"
                    placeholder="your password here"
                    name="last-name"
                    id="last-name"
                    autoComplete="cc-family-name"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-3 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                />
            </div>
            <div className="mb-3">
                <button
                    type="button"
                    className="flex justify-center items-center bg-primary hover:bg-darkPrimary focus:outline-none focus:shadow-outline-blue text-white py-2 px-4 rounded-md transition duration-300 gap-2"
                >
                    Save
                    <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 24 24" id="send" fill="#fff">
                        <path fill="none" d="M0 0h24v24H0V0z"></path>
                        <path d="M3.4 20.4l17.45-7.48c.81-.35.81-1.49 0-1.84L3.4 3.6c-.66-.29-1.39.2-1.39.91L2 9.12c0 .5.37.93.87.99L17 12 2.87 13.88c-.5.07-.87.5-.87 1l.01 4.61c0 .71.73 1.2 1.39.91z"></path>
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default PasswordSettings;