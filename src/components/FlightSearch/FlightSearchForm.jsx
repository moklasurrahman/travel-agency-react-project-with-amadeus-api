import React, { useState, useEffect } from 'react';
import OneWay from './OneWay';
import MultiCity from './MultiCity';
import RoundWay from './RoundWay';

// Radio button component
const RadioButton = ({ id, value, checked, onChange, label }) => (
  <div className="flex items-center cursor-pointer">
    <input
      id={id}
      type="radio"
      value={value}
      checked={checked}
      onChange={onChange}
      className="w-4 h-4"
    />
    <label htmlFor={id} className={`cursor-pointer ms-2 text-sm font-medium ${checked ? 'text-gray-600' : 'text-gray-400'}`}>
      {label}
    </label>
  </div>
);

const FlightSearchForm = ({buttonText}) => {
  const [selectedOption, setSelectedOption] = useState(() => {
    // Retrieve the selected option from sessionStorage if available, default to 'oneWay' otherwise
    return sessionStorage.getItem('selectedOption') || 'oneWay';
  });

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  useEffect(() => {
    // Save the selected option to sessionStorage whenever it changes
    sessionStorage.setItem('selectedOption', selectedOption);
  }, [selectedOption]);

  // Function to handle the change to Round Way option
  const handleRoundWaySelection = () => {
    setSelectedOption('roundWay');
  };

  return (
    <section className='w-full relative flex justify-center m-auto items-center pt-10 pb-5 bg-blue-50'>
      <div className="md:w-[800px] xl:w-[60%] flex flex-col p-3">
        <div className="flex items-center gap-3 pb-2">
          <RadioButton
            id="one-way-radio"
            value="oneWay"
            checked={selectedOption === 'oneWay'}
            onChange={() => handleOptionChange('oneWay')}
            label="One Way"
          />
          <RadioButton
            id="round-way-radio"
            value="roundWay"
            checked={selectedOption === 'roundWay'}
            onChange={() => handleOptionChange('roundWay')}
            label="Round Way"
          />
          <RadioButton
            id="multi-city-radio"
            value="multiCity"
            checked={selectedOption === 'multiCity'}
            onChange={() => handleOptionChange('multiCity')}
            label="Multi City"
          />
        </div>

        <div className=''>
          {selectedOption === 'oneWay' && <OneWay buttonText={buttonText} onReturnDateClick={handleRoundWaySelection}/>}
          {selectedOption === 'roundWay' && <RoundWay/>}
          {selectedOption === 'multiCity' && <MultiCity />}
        </div>
      </div>
    </section>
  );
};

export default FlightSearchForm;
