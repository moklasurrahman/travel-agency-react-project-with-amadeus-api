import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import swap from "../../assets/icon/swap.svg"
import axios from 'axios';
import qs from 'qs';

import FromAirportInput from './formElements/FromAirportInput ';
import ToAirportInput from './formElements/ToAirportInput';
import DateRangePicker from './formElements/Datepicker';
import { PassengerClassPanel } from './formElements/PassengerClassPanel';


axios.defaults.baseURL = "https://test.api.amadeus.com";
axios.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";

const OneWay = ({ buttonText, onReturnDateClick }) => {
 const  ReturnDateHide = true
  const [fromAirportInputvalue, setFromAirportInputvalue] = useState(sessionStorage.getItem('fromAirportInputvalue') || 'BKK');
  const [toAirportInputvalue, setToAirportInputvalue] = useState(sessionStorage.getItem('toAirportInputvalue') || 'SYD');
  const [formattedStartDate, setFormattedStartDate] = useState('');

    const [adultsValue, setAdultsValue] = useState(Number(sessionStorage.getItem('adultsValue')) || 1);
    const [childrenValue, setChildrenValue] = useState(Number(sessionStorage.getItem('childrenValue')) || 0);
    const [infantValue, setInfantValue] = useState(Number(sessionStorage.getItem('infantValue')) || 0);
    const [selectedClassValue, setselectedClassValue] = useState(sessionStorage.getItem('selectedClassValue') || 'BUSINESS');
   
   // -------------------------------------Form Handling-------------------------------------
  // const [flights, setFlights] = useState([]);
  // console.log('hgfh', flights)
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const navigate = useNavigate();
  const tokenRequestBody = {
    grant_type: 'client_credentials',
    client_id: 'APzF0P3wwukaqBh0x3GmANqR1HVuoush',
    client_secret: 'd1cw5EN9mFbWvAbL'
  }
  const getFlightsData = async ({ originLocationCode, destinationLocationCode, departureDate, adults, children, infants, travelClass }) => {
    setLoading(true);
    try {
      const tokenResponse = await axios.post('/v1/security/oauth2/token', 
      qs.stringify(tokenRequestBody));
      const accessToken = tokenResponse.data.access_token;

      const flightResponse = await axios.get(`https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=${originLocationCode}&destinationLocationCode=${destinationLocationCode}&departureDate=${departureDate}&adults=${adults}&children=${children}&infants=${infants}&travelClass=${travelClass}&nonStop=false`, {
      // const flightResponse = await axios.get(`https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=SYD&destinationLocationCode=BKK&departureDate=2024-05-02&adults=1&children=1&infants=1&travelClass=ECONOMY&nonStop=false&max=250`, {

      headers: {
          "Authorization": `Bearer ${accessToken}`
        }
      });
      setError(null);
      // setFlights(flightResponse.data.data);
      navigate(`/flights?from=${originLocationCode}&to=${destinationLocationCode}&date=${departureDate}&adults=${adults}&children=${children}&infants=${infants}&travelClass=${travelClass}`, { state: { flights: flightResponse.data.data } }, { state: { error } });
    } catch (error) {
      // setError(error.response.data.message || 'No flights found for this itinerary');
      navigate(`/flights?from=${originLocationCode}&to=${destinationLocationCode}&date=${departureDate}&adults=${adults}&children=${children}&infants=${infants}&travelClass=${travelClass}`, { state: { error: error.response.data.message || 'No flights found for this itinerary' } });
    } finally {
      setLoading(false);
    }
  };

  const getFlights = async (event) => {
    event.preventDefault();
    if (fromAirportInputvalue === toAirportInputvalue) {
      alert("From & To airports can't be same");
      return;
    }
    const body = {
      originLocationCode: fromAirportInputvalue,
      destinationLocationCode: toAirportInputvalue,
      departureDate: formattedStartDate,
      adults: adultsValue,
      children: childrenValue,
      infants: infantValue,
      travelClass: selectedClassValue,
    };
    await getFlightsData(body);

  sessionStorage.setItem('fromAirportInputvalue', fromAirportInputvalue);
  sessionStorage.setItem('toAirportInputvalue', toAirportInputvalue);
  }



   
  // Function to handle swapping input values
    const handleSwap = () => {
      const temp = fromAirportInputvalue;
      setFromAirportInputvalue(toAirportInputvalue);
      setToAirportInputvalue(temp);
    };


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
    <article className="">
      
      {loading && <p className='w-full h-[100vh] absolute top-0 flex items-center justify-center bg-[#8e2157] animate-pulse z-[999]'>Loding---</p>}

      <form onSubmit={getFlights} className="flex mx-auto w-full rounded-xl">{/* onSubmit={getFlights} */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 w-full">

          <div className=' flex flex-col md:flex-row gap-3 items-center w-full'>
            <div className="relative flex flex-col md:flex-row gap-3 w-full">
              <FromAirportInput value={fromAirportInputvalue} setValue={setFromAirportInputvalue} />
              <div className="swap cursor-pointer bg-white w-[30px] h-[30px] rounded-full border-2 border-[#ced4da] flex absolute top-0 left-0 right-0 bottom-0 m-auto justify-center items-center">
                <img onClick={handleSwap} className='w-[30px] rotate-90 md:rotate-0' src={swap} alt="swap" />
              </div>
              <ToAirportInput value={toAirportInputvalue} setValue={setToAirportInputvalue} />
            </div>
          </div>

{/* ------------------------------DateRangePicker------------------------------------------------------- */}
          <div className="flex items-center w-full">
            <DateRangePicker ReturnDateHide={ReturnDateHide} onReturnDateClick={onReturnDateClick} setFormattedStartDate={setFormattedStartDate} />
          </div>

{/* ---------------------------------Passenger / Class-------------------------------------------- */}
          <div className="flex items-center">
           
            {/* <div className=" hidden">
                <input type="text" name='adults' value={adultsValue}/>
                <input type="text" name='children' value={childrenValue}/>
                <input type="text" name='infantValue' value={infantValue}/>
                <input type="text" name='selectedClassValue' value={selectedClassValue}/>
              </div> */}
             <PassengerClassPanel
                updateAdultsValue={updateAdultsValue}
                updateChildrenValue={updateChildrenValue}
                updateInfantValue={updateInfantValue}
                updatesetselectedClassValue={updatesetselectedClassValue}
              />
      

          </div>

          <button type='submit' className=' bg-[#8e2157] rounded-lg py-2 w-full my-3 text-white text-md'>
           {buttonText}
          </button>
        </div>
      </form>
    </article>

  )
}

export default OneWay