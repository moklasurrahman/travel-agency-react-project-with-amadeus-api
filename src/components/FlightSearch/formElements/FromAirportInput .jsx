import React, { useState, useEffect, useRef } from 'react';
import { AirportList } from './AirportList';

const FromAirportInput = ({ value, setValue }) => {
  
  const [showAirportList, setShowAirportList] = useState(false);
 
  const inputRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setShowAirportList(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleAirportList = () => {
    setShowAirportList(!showAirportList);
  };


  // ------------------------getting to AirportList passing oneway component -----------------------
  const handleAirportSelect = (airportName) => {
    setValue(airportName);
    setShowAirportList(false);
  };

//   // -----passing data oneway component--------
//   const handleChange = (event) => {
//     setValue(event.target.value);
// };




  return (
    <div className="">
      <div
        className=" flex flex-col gap-2 rounded-md border border-[#ced4da] p-2 w-full bg-transparent"
        onClick={toggleAirportList}
      >
        <span className='text-sm'>FROM</span>
        <input
        className=' outline-none w-full bg-transparent'
          type="text"
          placeholder=""
          name="from"
          value={value}
          // onChange={handleChange}
          readOnly
        />
      </div>

      <div ref={inputRef} className="">
        {showAirportList && <AirportList handleAirportSelect={handleAirportSelect} />}
      </div>

    </div>
  );
};

export default FromAirportInput;
