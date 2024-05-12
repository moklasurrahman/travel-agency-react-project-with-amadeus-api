import React, { useEffect, useRef, useState } from 'react';
import { GrAddCircle, GrSubtractCircle } from "react-icons/gr";

export const PassengerClassPanel = ({
  updateAdultsValue,
  updateChildrenValue,
  updateInfantValue,
  updatesetselectedClassValue

}) => {
  const inputRef = useRef(null);
  const [showPassengerClassPanel, setPassengerClassPanel] = useState(false)
  const [inputValue, setInputValue] = useState(() => sessionStorage.getItem('inputValue') || '1 Travelers, BUSINESS');

  // Load adults count from sessionStorage or default to 1 if not present
  const [adults, setAdults] = useState(() => {
    const storedAdults = sessionStorage.getItem('adults');
    return storedAdults ? parseInt(storedAdults) : 1;
  });
  // Load children count from sessionStorage or default to 0 if not present
  const [children, setChildren] = useState(() => {
    const storedChildren = sessionStorage.getItem('children');
    return storedChildren ? parseInt(storedChildren) : 0;
  });
  // Load infant count from sessionStorage or default to 0 if not present
  const [infant, setInfant] = useState(() => {
    const storedInfant = sessionStorage.getItem('infant');
    return storedInfant ? parseInt(storedInfant) : 0;
  });
  // Load selectedClass from sessionStorage or default to 'BUSINESS' if not present
  const [selectedClass, setSelectedClass] = useState(() => {
    const storedClass = sessionStorage.getItem('selectedClass');
    return storedClass ? storedClass : 'BUSINESS';
  });

  // useEffect(() => {
  //   sessionStorage.setItem('inputValue', inputValue);
  // }, [inputValue]);

  useEffect(() => {
    setInputValue(`${adults + children + infant} Travelers, ${selectedClass}`);
    updateAdultsValue(`${adults}`);
    updateChildrenValue(`${children}`);
    updateInfantValue(`${infant}`);
    updatesetselectedClassValue(`${selectedClass}`);


    // Save adults count to sessionStorage
    sessionStorage.setItem('adults', adults);
    sessionStorage.setItem('children', children);
    sessionStorage.setItem('infant', infant);
    sessionStorage.setItem('selectedClass', selectedClass);

  }, [adults, children, infant, selectedClass]);

  const handleAdultsChange = (value) => {
    const newAdults = adults + value >= 1 ? adults + value : 1;
    setAdults(newAdults);
  };

  const handleChildrenChange = (value) => {
    const newChildren = children + value >= 0 ? children + value : 0;
    setChildren(newChildren);
  };

  const handleInfantChange = (value) => {
    const newInfant = infant + value >= 0 ? infant + value : 0;
    setInfant(newInfant);
  };

  const handleClassChange = (e) => {
    setSelectedClass(e.target.value);
  };



  
  // -----------------------For hide on outside click --------------------
  useEffect(() => {
      const handleClickOutside = (event) => {
          if (inputRef.current && !inputRef.current.contains(event.target)) {
            setPassengerClassPanel(false);
          }
      };
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
          document.removeEventListener('mousedown', handleClickOutside);
      };
  }, []);

  

  return (
    <div className="w-full">

      <div onClick={() => setPassengerClassPanel(!showPassengerClassPanel)} 
      className=" cursor-pointer flex flex-col gap-2 rounded-md border border-[#ced4da] p-2 w-full bg-transparent">
      <span className='text-sm'>Passenger / Class</span>
        <input
          className="w-full outline-none bg-transparent"
          type="text"
          placeholder=''
          value={inputValue}
          readOnly
        />
      </div>


{
   showPassengerClassPanel &&   
   <div ref={inputRef} className=' absolute bg-white flex flex-col gap-3 p-3 shadow-sm shadow-black'>
   <p className='text-sm font-bold text-[#8e2157]'>Passengers</p>
   <div className="flex justify-between">

     {/* Adults */}
     <div className="flex flex-col text-gray-500">
       <span className='text-sm font-bold'>Adults</span>
       <span className='text-[12px]'>12 years and above</span>
     </div>
     <div className="flex items-center gap-4 justify-between">
       <span>
         <GrSubtractCircle
           className={`text-[#8e2157] text-[20px] text-${adults > 1 ? '#8e2157' : 'gray-400'} cursor-pointer`}
           onClick={() => handleAdultsChange(-1)}
         />
       </span>
       <span>{adults}</span>
       <span>
         <GrAddCircle
           className='text-[20px] text-[#8e2157] cursor-pointer'
           onClick={() => handleAdultsChange(1)}
         />
       </span>
     </div>
   </div>

   {/* Children */}
   <div className="flex justify-between">
     <div className="flex flex-col text-gray-500">
       <span className='text-sm font-bold'>Children</span>
       <span className='text-[12px]'>2-11 years</span>
     </div>
     <div className="flex items-center gap-4 justify-between">
       <span>
         <GrSubtractCircle
           className={`text-[#8e2157] text-[20px] text-${children > 0 ? '#8e2157' : 'gray-400'} cursor-pointer`}
           onClick={() => handleChildrenChange(-1)}
         />
       </span>
       <span>{children}</span>
       <span>
         <GrAddCircle
           className='text-[20px] text-[#8e2157] cursor-pointer'
           onClick={() => handleChildrenChange(1)}
         />
       </span>
     </div>
   </div>

   {/* Infant */}
   <div className="flex justify-between">
     <div className="flex flex-col text-gray-500">
       <span className='text-sm font-bold'>Infant</span>
       <span className='text-[12px]'>Below 2 years</span>
     </div>
     <div className="flex items-center gap-4 justify-between">
       <span>
         <GrSubtractCircle
           className={`text-[#8e2157] text-[20px] text-${infant > 0 ? '#8e2157' : 'gray-400'} cursor-pointer`}
           onClick={() => handleInfantChange(-1)}
         />
       </span>
       <span>{infant}</span>
       <span>
         <GrAddCircle
           className='text-[20px] text-[#8e2157] cursor-pointer'
           onClick={() => handleInfantChange(1)}
         />
       </span>
     </div>
   </div>

   <div className="">
     <p className='mb-2'>Class</p>
     <div className="flex flex-wrap items-center gap-3">
       {/* Economy */}
       <div className="flex items-center mb-4">
         <input
           id="default-radio"
           type="radio"
           value="ECONOMY"
           name="default-radio"
           checked={selectedClass === 'ECONOMY'}
           onChange={handleClassChange}
           className="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
         />
         <label htmlFor="default-radio" className="ms-2 text-sm font-medium text-gray-900">Economy</label>
       </div>
       {/* Premium Economy */}
       {/* <div className="flex items-center mb-4">
       <input
         id="default-radio-2"
         type="radio"
         value="PREMIUM_ECONOMY"
         name="default-radio"
         checked={selectedClass === 'Premium Economy'}
         onChange={handleClassChange}
         className="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
       />
       <label htmlFor="default-radio-2" className="ms-2 text-sm font-medium text-gray-900">Premium Economy</label>
     </div> */}

       {/* BUSINESS */}
       <div className="flex items-center mb-4">
         <input
           id="default-radio-3"
           type="radio"
           value="BUSINESS"
           name="default-radio"
           checked={selectedClass === 'BUSINESS'}
           onChange={handleClassChange}
           className="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
         />
         <label htmlFor="default-radio-3" className="ms-2 text-sm font-medium text-gray-900">Business</label>
       </div>

       {/* FIRST */}
       <div className="flex items-center mb-4">
         <input
           id="default-radio-4"
           type="radio"
           value="FIRST"
           name="default-radio"
           checked={selectedClass === 'FIRST'}
           onChange={handleClassChange}
           className="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
         />
         <label htmlFor="default-radio-4" className="ms-2 text-sm font-medium text-gray-900">First</label>
       </div>

     </div>
   </div>
 </div>
}


    
    </div>
  );
};
