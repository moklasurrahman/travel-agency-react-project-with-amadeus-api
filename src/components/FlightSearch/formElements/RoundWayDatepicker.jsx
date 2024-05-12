import { useEffect, useRef, useState } from 'react';
import { DateRange } from "react-date-range";
import { format, addDays } from 'date-fns';

const RoundWayDatepicker = ({setFormattedStartDate, setFormattedEndDate}) => {
    const [journeyDateVisible, setJourneyDateVisible] = useState(false);
    const [returnDateVisible, setReturnDateVisible] = useState(false);
    
    const [journeyDates, setJourneyDates] = useState(() => {
        const storedJourneyDates = JSON.parse(sessionStorage.getItem('journeyDates'));
        return storedJourneyDates || [
            {
                startDate: new Date(),
                endDate: addDays(new Date(), 1),
                key: "selection"
            }
        ];
    });

    const [returnDates, setReturnDates] = useState(() => {
        const storedReturnDates = JSON.parse(sessionStorage.getItem('returnDates'));
        return storedReturnDates || [
            {
                startDate: new Date(),
                endDate: addDays(new Date(), 1),
                key: "selection"
            }
        ];
    });


    const formattedJourneyStartDate = journeyDates[0].startDate ? format(journeyDates[0].startDate, "yyyy-MM-dd") : '';
    const formattedReturnEndDate = returnDates[0].endDate ? format(returnDates[0].endDate, "yyyy-MM-dd") : '';

    // console.log("formattedJourneyStartDate:",formattedJourneyStartDate)
    // console.log("formattedReturnEndDate",formattedReturnEndDate)


    const handleJourneyDateChange = (item) => {
        const newStartDate = item.selection.startDate;
        const newEndtDate = item.selection.endDate;
        setJourneyDates([item.selection]);
        setJourneyDateVisible(false);
        setReturnDateVisible(true);
        // Update the endDate of the returnDates state with the same start date
        setReturnDates([
            {
                ...returnDates[0],
                startDate: newStartDate,
                endDate: addDays(newStartDate, 1),
            }
        ]);
        setJourneyDates([
            {
                ...journeyDates[0],
                startDate: newStartDate,
                endDate:  newStartDate,
            }
        ])
    };

    const journeyDate = journeyDates[0];
    const returnDate = returnDates[0];
    const handleReturnDateChange = (item) => {
        // Update both returnDates and journeyDates states with the new end date
        const newEndDate = item.selection.endDate;
        setReturnDateVisible(false);
        setReturnDates([
            {
                ...returnDate,
                endDate: newEndDate,
            }
        ]);
        setJourneyDates([
            {
                ...journeyDate,
                endDate: newEndDate,
            }
        ]);
    };

    useEffect(() => {
        // Save journeyDates to sessionStorage whenever it changes
        sessionStorage.setItem('journeyDates', JSON.stringify(journeyDates));
    }, [journeyDates]);

    useEffect(() => {
        // Save returnDates to sessionStorage whenever it changes
        sessionStorage.setItem('returnDates', JSON.stringify(returnDates));
    }, [returnDates]);




     // ---------passing date RounWay -------------------
     useEffect(() => {
        setFormattedStartDate(formattedJourneyStartDate);
        setFormattedEndDate(formattedReturnEndDate)
    }, [formattedJourneyStartDate, formattedReturnEndDate]);
    // ---------End passing date RounWay -------------------



    // -----------------------For hide on outside click --------------------
    const inputRef = useRef(null);
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (inputRef.current && !inputRef.current.contains(event.target)) {
                setJourneyDateVisible(false);
            }
            if (inputRef.current && !inputRef.current.contains(event.target)) {
                setReturnDateVisible(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);


    
    return (
        <div className="relative w-full">
            <div className="flex items-center gap-3">
                <div
                    className={`cursor-pointer flex flex-col gap-2 rounded-md border border-[#ced4da] p-2 w-full bg-transparent ${journeyDateVisible ? 'border-[#ff3131]' : 'border-[#ced4da]'}`}
                    onClick={() => {
                        setJourneyDateVisible(true);
                        setReturnDateVisible(false);
                    }}
                >
                    <span className="text-sm">JOURNEY DATE</span>
                    <input
                        className="outline-none w-full cursor-pointer bg-transparent"
                        type="text"
                        placeholder=""
                        name="Date"
                        value={formattedJourneyStartDate}
                        readOnly
                    />
                </div>
                <div
                   className={`cursor-pointer flex flex-col gap-2 rounded-md border border-[#ced4da] p-2 w-full bg-transparent ${returnDateVisible ? 'border-[#ff3131]' : 'border-[#ced4da]'}`}
                    onClick={() => {
                        setReturnDateVisible(true);
                        setJourneyDateVisible(false);
                    }}
                >
                    <span className="text-sm">RETURN DATE</span>
                    <input
                        className="outline-none w-full cursor-pointer bg-transparent"
                        type="text"
                        placeholder="Tap to book return ticket"
                        name="Date"
                        value={formattedReturnEndDate || new Date()}
                        readOnly
                    />
                </div>
            </div>

            {journeyDateVisible && (
                <div ref={inputRef} className="border border-[#8e2157] absolute bg-white md:w-[700px]">
                    <h4 className="text-center text-md pt-3 font-bold text-gray-600">Select journey date</h4>
                    <DateRange
                        editableDateInputs={false}
                        onChange={handleJourneyDateChange}
                        moveRangeOnFirstSelection={false}
                        ranges={journeyDates}
                        direction="horizontal"
                        months={2}
                        allowRange={false} 
                        minDate={new Date()} // Provide a default value if journeyDates[0].startDate is not available


                    />
                </div>
            )}

            {returnDateVisible && (
                <div ref={inputRef} className="border border-[#8e2157] absolute bg-white md:w-[700px]">
                    <h4 className="text-center text-md pt-3 font-bold text-gray-600">Select return date</h4>
                    <DateRange
                        editableDateInputs={false}
                        onChange={handleReturnDateChange}
                        moveRangeOnFirstSelection={false}
                        ranges={returnDates}
                        direction="horizontal"
                        months={2}
                        minDate={journeyDates[0] && journeyDates[0].startDate ? new Date(journeyDates[0].startDate) : new Date()} // Ensure minDate is always a valid Date object
                    />
                </div>
            )}
        </div>
    );
};

export default RoundWayDatepicker;
