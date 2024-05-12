import { IoIosNotificationsOutline } from "react-icons/io";
import { useState } from "react";

const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState("Dashboard");

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const handleItemClick = (itemName) => {
        setSelectedItem(itemName);
    };

    return (
        <nav className="bg-gray-900 w-full z-20 border-b border-gray-200">
            <div className="px-2 md:px-0 md:w-[95%] xl:w-[85%] 2xl:w-[85%] flex flex-wrap items-center justify-between mx-auto p-4">
                <div className="flex w-full sm:w-fit justify-end md:justify-between md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                    <div className="flex items-center gap-4">
                        <div className="relative order-2">
                            <img className="w-10 h-10 rounded-full" src="https://images.pexels.com/photos/4668509/pexels-photo-4668509.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
                            <span className="top-0 left-7 absolute  w-3.5 h-3.5 bg-green-400 border-2 border-white dark:border-gray-800 rounded-full"></span>
                        </div>
                        <IoIosNotificationsOutline className="text-white text-[30px] order-1" />
                    </div>
                    <button
                        onClick={toggleMobileMenu}
                        type="button"
                        className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                        aria-controls="navbar-sticky"
                        aria-expanded={isMobileMenuOpen}
                    >
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                        </svg>
                    </button>
                </div>
                <div className={`items-center justify-between w-full md:flex md:w-auto md:order-1 ${isMobileMenuOpen ? 'block' : 'hidden'}`} id="navbar-sticky">
                    <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                        <li>
                            <a
                                href="/"
                                onClick={() => handleItemClick("Dashboard")}
                                className={`block py-2 px-3 ${
                                    selectedItem === "Dashboard" ? "text-blue-500" : "text-white"
                                } bg-blue-700 rounded md:bg-transparent md:p-0 md:hover:text-blue-700`}
                            >
                                 Home
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                onClick={() => handleItemClick("Master Price")}
                                className={`block py-2 px-3 ${
                                    selectedItem === "Master Price" ? "text-blue-500" : "text-gray-900"
                                } rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700`}
                            >
                                Dashboard
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                onClick={() => handleItemClick("Custom Price")}
                                className={`block py-2 px-3 ${
                                    selectedItem === "Custom Price" ? "text-blue-500" : "text-gray-900"
                                } rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700`}
                            >
                                Custom Price
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                onClick={() => handleItemClick("Calendar")}
                                className={`block py-2 px-3 ${
                                    selectedItem === "Calendar" ? "text-blue-500" : "text-gray-900"
                                } rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700`}
                            >
                                Calendar
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                onClick={() => handleItemClick("Reports")}
                                className={`block py-2 px-3 ${
                                    selectedItem === "Reports" ? "text-blue-500" : "text-gray-900"
                                } rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700`}
                            >
                                Reports
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
