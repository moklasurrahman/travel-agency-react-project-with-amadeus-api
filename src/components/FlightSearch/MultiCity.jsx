import React, { useState } from 'react';
import axios from 'axios';
import qs from 'qs';
import FromAirportInput from './formElements/FromAirportInput ';
import ToAirportInput from './formElements/ToAirportInput';
import DateRangePicker from './formElements/Datepicker';
import { PassengerClassPanel } from './formElements/PassengerClassPanel';

const MultiCity = () => {

  const ReturnDateHide = false

  const [fromAirportInputvalue, setFromAirportInputvalue] = useState(sessionStorage.getItem('fromAirportInputvalue') || 'BKK');
  const [toAirportInputvalue, setToAirportInputvalue] = useState(sessionStorage.getItem('toAirportInputvalue') || 'SYD');
  const [formattedStartDate, setFormattedStartDate] = useState('');

  const [adultsValue, setAdultsValue] = useState(Number(sessionStorage.getItem('adultsValue')) || 1);
  const [childrenValue, setChildrenValue] = useState(Number(sessionStorage.getItem('childrenValue')) || 0);
  const [infantValue, setInfantValue] = useState(Number(sessionStorage.getItem('infantValue')) || 0);
  const [selectedClassValue, setselectedClassValue] = useState(sessionStorage.getItem('selectedClassValue') || 'BUSINESS');



  // ------------------PassengerClassPanel input Valu updated----------------------
  const updateAdultsValue = (value) => {
    setAdultsValue(value);
  };
  const updateChildrenValue = (value) => {
    setChildrenValue(value);
  };
  const updateInfantValue = (value) => {
    setInfantValue(value);
  };
  const updatesetselectedClassValue = (value) => {
    setselectedClassValue(value);
  };



  return (
    <div className="">
<h1 className=' text-red-600 p-3'>This section not completed I am working for this
</h1>      
      <form className="flex flex-col gap-3">
        <div className="flex">
          <div className="">
            <FromAirportInput value={fromAirportInputvalue} setValue={setFromAirportInputvalue} />
          </div>
          <div className="">
            <ToAirportInput value={toAirportInputvalue} setValue={setToAirportInputvalue} />
          </div>
          <div className="">
            <DateRangePicker ReturnDateHide={ReturnDateHide} setFormattedStartDate={setFormattedStartDate} />
          </div>

          <div className="">
            <PassengerClassPanel
              updateAdultsValue={updateAdultsValue}
              updateChildrenValue={updateChildrenValue}
              updateInfantValue={updateInfantValue}
              updatesetselectedClassValue={updatesetselectedClassValue}
            />
          </div>

        </div>

        <div className="flex">
          <div className="">
            <FromAirportInput value={fromAirportInputvalue} setValue={setFromAirportInputvalue} />
          </div>
          <div className="">
            <ToAirportInput value={toAirportInputvalue} setValue={setToAirportInputvalue} />
          </div>
          <div className="">
            <DateRangePicker ReturnDateHide={ReturnDateHide} setFormattedStartDate={setFormattedStartDate} />
          </div>

          <div  className=" cursor-pointer flex flex-col gap-2 rounded-md border border-[#ced4da] p-2 bg-transparent">
            <span>Add</span>
          </div>

        </div>



      </form>



    </div>
  )
}

export default MultiCity