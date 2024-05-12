import { useEffect, useRef, useState } from 'react';
import { Calendar } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

import { format } from 'date-fns';


const DateRangePicker = ({ ReturnDateHide, onReturnDateClick, setFormattedStartDate }) => {

    const [showDatPicker, setShowDatPicker] = useState(false);
    const [selectedStartDate, setSelectedStartDate] = useState(() => {
        const storedDate = sessionStorage.getItem('selectedStartDate');
        return storedDate ? new Date(storedDate) : new Date();
    });

    const formattedStartDate = selectedStartDate ? format(selectedStartDate, "yyyy-MM-dd") : '';
    const minDate = new Date();


    // -----------------------For hide and show --------------------
    const inputRef = useRef(null);
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (inputRef.current && !inputRef.current.contains(event.target)) {
                setShowDatPicker(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const toggleDatPicker = () => {
        setShowDatPicker(!showDatPicker);
    };
    // -----------------------End For hide and show --------------------





    const handleDateRangeChange = (date) => {
        setSelectedStartDate(date);
        setShowDatPicker(false);
        // Store the selected date as a string in local storage
        sessionStorage.setItem('selectedStartDate', date);

    };

    // ---------passing date oneWay -------------------
    useEffect(() => {
        setFormattedStartDate(formattedStartDate);
    }, [formattedStartDate, setFormattedStartDate]);
    // ---------End passing date oneWay -------------------


    // ------------comming to FlightSearchForm > OneWay by pops--------------
    const handleReturnDateClick = () => {
        if (typeof onReturnDateClick === 'function') {
            onReturnDateClick(); // Call the function passed from the parent component
        }
    };



    return (
        <div className="relative w-full">
            <div className="flex items-center w-full gap-3">
                <div
                    className=" cursor-pointer flex flex-col gap-2 rounded-md border border-[#ced4da] p-2 w-full bg-transparent"
                    onClick={toggleDatPicker}
                >
                    <span className='text-sm'>JOURNEY DATE</span>
                    <input
                        className='outline-none w-full cursor-pointer bg-transparent'
                        type="text"
                        placeholder=""
                        name="Date"
                        value={formattedStartDate}
                        readOnly
                    />
                </div>

                {
                    ReturnDateHide === false ?
                        '' : <div
                            onClick={handleReturnDateClick}
                            className=" cursor-pointer flex flex-col gap-2 rounded-md border border-[#ced4da] p-2 w-full bg-transparent"

                        >
                            <span className='text-sm'>RETURN DATE</span>
                            <input
                                className='outline-none w-full cursor-pointer bg-transparent'
                                type="text"
                                placeholder="Tap to book return ticket"
                                name="Date"
                                readOnly
                            />
                        </div>
                }

            </div>


            {showDatPicker && (
                <div ref={inputRef} className='border border-[#8e2157] absolute bg-white md:w-[350px]'>
                    <h4 className="text-center text-md pt-3 font-bold text-gray-600">Select journey date</h4>
                    <Calendar
                        className='flex justify-center m-auto'
                        onChange={handleDateRangeChange}
                        date={selectedStartDate}
                        minDate={minDate}
                    // maxDate={moment().add(12, "months").toDate()} //USER WILL BE ABLE TO SELECT END DATE MAX WITHIN 1 YEAR.

                    />
                    {/* <div className="h-[200px]"></div> */}
                </div>
            )}
        </div>
    );
};

export default DateRangePicker;
