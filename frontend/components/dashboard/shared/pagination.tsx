import { ArrowRightIcon, ArrowLeftIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';

export default function Pagination({ currentPage, totalResults, resultsPerPage, onPageChange }: any) {
    currentPage = parseInt(currentPage);
    const totalPages = Math.ceil(totalResults / resultsPerPage);
    let startResult = (currentPage - 1) * resultsPerPage + 1;
    const endResult = Math.min(currentPage + 1  * resultsPerPage, totalResults);
    startResult = startResult > 0 ? startResult : 1;

    const handlePrevious = () => {
        if (currentPage >= 1) {
            onPageChange(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage + 1 < totalPages) {
            onPageChange(currentPage + 1);
        }
    };

    return (
        <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
            <div className="flex-1 flex justify-between sm:hidden">
                <Link
                    href="#"
                    onClick={handlePrevious}
                    className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 ${currentPage == 0 ? 'cursor-not-allowed text-gray-300' : ''}`}
                    aria-disabled={currentPage == 0}
                >
                    Previous
                </Link>
                <Link
                    href="#"
                    onClick={handleNext}
                    className={`ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 ${currentPage === totalPages ? 'cursor-not-allowed text-gray-300' : ''}`}
                    aria-disabled={currentPage + 1 === totalPages}
                >
                    Next
                </Link>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                    <p className="text-sm text-gray-700">
                        Showing <span className="font-medium">{startResult}</span> to <span className="font-medium">{endResult}</span> of{' '}
                        <span className="font-medium">{totalResults}</span> results
                    </p>
                </div>
                <div>
                    <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                        <Link
                            href="#"
                            onClick={handlePrevious}
                            className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 ${currentPage == 0 ? 'cursor-not-allowed text-gray-300' : ''}`}
                            aria-disabled={currentPage == 0}
                        >
                            <span className="sr-only">Previous</span>
                            <ArrowLeftIcon className="h-5 w-5" aria-hidden="true" />
                        </Link>

                        {/* Render page numbers dynamically */}
                        {Array.from({ length: totalPages }, (_, index) => {
                            const pageNumber = index + 1;
                            if (pageNumber === 1 || pageNumber === totalPages || (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)) {
                                return (
                                    <Link
                                        key={pageNumber}
                                        href="#"
                                        onClick={() => onPageChange(pageNumber - 1)}
                                        className={` border-gray-300  hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium ${currentPage + 1 == pageNumber ? 'bg-primary text-white' : 'bg-white text-gray-500'}`}
                                    >
                                        {pageNumber}
                                    </Link>
                                );
                            }
                            if (pageNumber === currentPage - 2 || pageNumber === currentPage + 2) {
                                return (
                                    <span
                                        key={pageNumber}
                                        className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700"
                                    >
                                        ...
                                    </span>
                                );
                            }
                            return null;
                        })}

                        <Link
                            href="#"
                            onClick={handleNext}
                            className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 ${currentPage + 1 == totalPages ? 'cursor-not-allowed text-gray-300' : ''}`}
                            aria-disabled={currentPage + 1 === totalPages}
                        >
                            <span className="sr-only">Next</span>
                            <ArrowRightIcon className="h-5 w-5" aria-hidden="true" />
                        </Link>
                    </nav>
                </div>
            </div>
        </div>
    );
}
