import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import swap from "../assets/icon/swap.svg"
import { format } from "date-fns";
import { FromAirportList } from './formElements/FromAirportList';
import { ToAirportList } from './formElements/ToAirportList';
import DateRangePicker from './formElements/OneWayDatepicker';
import { PassengerClassPanel } from './formElements/PassengerClassPanel';



import axios from 'axios';
import qs from 'qs';

axios.defaults.baseURL = "https://test.api.amadeus.com";
axios.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";

const OneWay = () => {

    const airportData = {
        itemsFrom: [
          {
            id: 1,
            name: 'DXB | Dubai - Dubai International Airport, United Arab Emirates'
          },
          {
            id: 2,
            name: 'PTO | Marrakesh - Menara Airport, Morocco'
          },
          {
            id: 3,
            name: 'CTO | Marrakesh - Menara Airport, Morocco'
          },
          {
            id: 4,
            name: 'GTO | Marrakesh - Menara Airport, Morocco'
          },
          {
            id: 5,
            name: 'MTO | Marrakesh - Menara Airport, Morocco'
          },
          {
            id: 6,
            name: 'SYD'
          },
          {
            id: 7,
            name: 'BKK'
          },
          // Add more items as needed
        ],
    
      };
        
      const [showListFrom, setShowListFrom] = useState(false);
      const [showListTo, setShowListTo] = useState(false);
      const [showDateRangePicker, setShowDateRangePicker] = useState(false)
      const [showPassengerClassPanel, setPassengerClassPanel] = useState(false)
      const [selectedFromItem, setSelectedFromItem] = useState('BKK');
      const [selectedToItem, setSelectedToItem] = useState('SYD');
      const [searchTerm, setSearchTerm] = useState('');
      const [itemsFrom, setItemsFrom] = useState(airportData.itemsFrom);
      const [itemsTo, setItemsTo] = useState(airportData.itemsFrom);
    
    
    
      // ----------------------Handel Date Range Picker----------------------------
      const [selectedDate, setSelectedDate] = useState({
        startDate: new Date(), // Initialize startDate
        // endDate: new Date() // Initialize endDate
      });
    
      const formattedStartDate = format(selectedDate.startDate, "yyyy-MM-dd");
      // const formattedStartDate = format(selectedDate.startDate, "yyyy-MM-dd'T'HH:mm:ss");

      const handleDateChange = (date) => {
        setSelectedDate(date); // Update selected date
      };
    
    

      const inputRef = useRef(null);
    
      const [origin, setOrigin] = useState(null); // State for origin location
      const [destination, setDestination] = useState(null); // State for destination location
      // Function to handle swapping selected values
      const handleSwap = () => {
        // Swap the values of origin and destination
        const temp = origin;
        setOrigin(destination);
        setDestination(temp);
        // Swap the selected items
        const tempItem = selectedFromItem;
        setSelectedFromItem(selectedToItem);
        setSelectedToItem(tempItem);
      };
    
      const toggleListFrom = () => {
        setShowListFrom(!showListFrom);
      };
    
      const toggleListTo = () => {
        setShowListTo(!showListTo);
      };
      const handleItemClickFrom = (item) => {
        setSelectedFromItem(item.name); // Set selectedFromItem to "item.name" api name
        setShowListFrom(false);
        setSearchTerm('');
      };
      const handleItemClickTo = (item) => {
        setSelectedToItem(item.name); // Set selectedToItem to "item.name" api name
        setShowListTo(false);
        setSearchTerm('');
      };
      const handleInputChange = (event) => {
        const value = event.target.value;
        setSearchTerm(value);
        setShowListFrom(true); // By default, show the list for the "From" input
        setShowListTo(false); // Hide the list for the "To" input
      };
      const handleClearInput = () => {
        setSearchTerm('');
      };
    
      const filteredItemsFrom = itemsFrom.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    
      const filteredItemsTo = itemsTo.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    
    
    
      useEffect(() => {
        if (showListFrom || showListTo) {
          inputRef.current.focus();
        }
      }, [showListFrom, showListTo]);
      const handleFirstInputClickFrom = () => {
        setShowListFrom(true);
        setShowListTo(false);
      };
      const handleFirstInputClickTo = () => {
        setShowListFrom(false);
        setShowListTo(true);
      };
    


      // ------------------PassengerClassPanel input Valu updated----------------------
      const [inputValue, setInputValue] = useState('1 Travelers, BUSINESS');
      const [adultsValue, setAdultsValue] = useState(1);
      const [childrenValue, setChildrenValue] = useState(0);
      const [infantValue, setInfantValue] = useState(0);
      const [selectedClassValue, setselectedClassValue] = useState('BUSINESS');
      
      const updateInputValue = (value) => {
        setInputValue(value);
      };
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

    
     
  // -------------------------------------Form Handling-------------------------------------
    const [flights, setFlights] = useState([]);
    console.log('hgfh', flights)
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    console.log(error)

    const navigate = useNavigate();
    

    useEffect(() => {
      // Retrieve flight data from localStorage on component mount
      const storedFlights = localStorage.getItem('flights');
      if (storedFlights) {
          setFlights(JSON.parse(storedFlights));
      }
    }, []);

    const tokenRequestBody = {
        grant_type: 'client_credentials',
        client_id: 'APzF0P3wwukaqBh0x3GmANqR1HVuoush',
        client_secret: 'd1cw5EN9mFbWvAbL'
    }

        const getFlightsData = async ({ originLocationCode, destinationLocationCode, departureDate, adults, children, infants, travelClass }) => {
          setLoading(true);
          try {
              const tokenResponse = await axios.post('/v1/security/oauth2/token', qs.stringify(tokenRequestBody));
              const accessToken = tokenResponse.data.access_token;
      
              const flightResponse = await axios.get(`https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=${originLocationCode}&destinationLocationCode=${destinationLocationCode}&departureDate=${departureDate}&adults=${adults}&children=${children}&infants=${infants}&travelClass=${travelClass}&nonStop=false`, {
                  headers: {
                      "Authorization": `Bearer ${accessToken}`
                  }
              });
              setFlights(flightResponse.data.data);
              setLoading(false);
              setError(null);
              localStorage.setItem('flights', JSON.stringify(flightResponse.data.data));
              navigate(`/flights-list?from=${selectedFromItem}&to=${selectedToItem}&date=${formattedStartDate}&adults=${adultsValue}&children=${childrenValue}&infants=${infantValue}&travelClass=${selectedClassValue}`,{ state: { flights:flightResponse.data.data} }, { state: { error } } );
          } catch (error) {
              setError(error.response.data.message || 'An error occurred while fetching flight data');
              setLoading(false);
              console.error('Error fetching flight data:', error);
          }
      };
      

    const getFlights = async (event) => {
       event.preventDefault();
      
       if (selectedFromItem === selectedToItem) {
        alert("From & To airports can't be same");
        return; 
    }
        const body = {
            originLocationCode: selectedFromItem,
            destinationLocationCode: selectedToItem,
            departureDate: formattedStartDate,
            adults: adultsValue,
            children: childrenValue,
            infants: infantValue,
            travelClass: selectedClassValue,
        };
        await getFlightsData(body);
    }


  return (
  
        <article className="">
        <form className="flex mx-auto w-full rounded-xl"  onSubmit={getFlights}>{/* onSubmit={getFlights} */}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 w-full">

            <div className='relative flex flex-col md:flex-row gap-3 items-center w-full'>
              
              <div className="rounded-md border border-[#ced4da] p-2 w-full bg-transparent">
                <span className='text-sm'>FROM</span>
                <input
                  type="text"
                  placeholder=""
                  name="originLocation"
                  value={selectedFromItem}
                  onClick={handleFirstInputClickFrom}
                  onChange={(value) => setOrigin(value)}
                  required
                  className="w-full bg-transparent outline-none"
                />
              </div>

              <div className="cursor-pointer bg-white w-[30px] h-[30px] rounded-full border-2 border-[#ced4da] flex absolute top-0 left-0 right-0 bottom-0 m-auto justify-center items-center">
                <img className='w-[30px] rotate-90 md:rotate-0' onClick={handleSwap} src={swap} alt="swap" />
              </div>


              <div className="rounded-md border border-[#ced4da] pl-3 pr-2 py-2 w-full bg-transparent">
              <span className='text-sm'>TO</span>
                <input
                  type="text"
                  placeholder=""
                  name="destinationLocation"
                  value={selectedToItem}
                  onClick={handleFirstInputClickTo}
                  onChange={(value) => setDestination(value)}
                  required
                  className="w-full bg-transparent outline-none"
                  
                />
              </div>

            </div>

            <div className='flex'>
              <div className="rounded-l-md border border-r-0 border-[#ced4da] pl-3 pr-2 py-2 w-full bg-transparent">
                <span className='text-sm'>JOURNEY DATE</span>
                  <input
                    required
                    className="w-full bg-transparent"
                    type="text"
                    name="departureDate"
                    placeholder="Date Range"
                    value={`${formattedStartDate}`} // Show selected date range
                    onClick={() => setShowDateRangePicker(!showDateRangePicker)}
                    readOnly
                  />
              </div>
              <div className="rounded-r-md border border-[#ced4da] pl-3 pr-2 py-2 w-full bg-transparent">
              <span className='text-sm'>RETURN DATE</span>
                <input
                  className="w-full bg-transparent outline-none"
                  type="text"
                  placeholder="Save more on return flight"
                /> 
              </div>
            </div>

            <div className="rounded-md border border-[#ced4da] p-2 w-full bg-transparent">
              <span className='text-sm'>Passenger / Class</span>
              <input
                onClick={() => setPassengerClassPanel(!showPassengerClassPanel)}
                className="w-full bg-transparent outline-none"
                type="text"
                value={inputValue}
                placeholder=''
                required
                readOnly
               
              />
              <div className=" hidden">
                <input type="text" name='adults' value={adultsValue}/>
                <input type="text" name='children' value={childrenValue}/>
                <input type="text" name='infantValue' value={infantValue}/>
                <input type="text" name='selectedClassValue' value={selectedClassValue}/>
              </div>
              {
                showPassengerClassPanel && <PassengerClassPanel 
                updateInputValue = {updateInputValue} 
                updateAdultsValue = {updateAdultsValue}
                updateChildrenValue = {updateChildrenValue}
                updateInfantValue = {updateInfantValue}
                updatesetselectedClassValue={updatesetselectedClassValue}
                />
              }

            </div>


            <button type='submit' className=' bg-[#8e2157] rounded-lg py-2 w-full my-3 text-white text-md'>
            Search flights
            </button>
          </div>
        </form>


        <FromAirportList
          showListFrom={showListFrom}
          items={itemsFrom}
          filteredItemsFrom={filteredItemsFrom}
          searchTerm={searchTerm}
          inputRef={inputRef}
          handleInputChange={handleInputChange}
          handleClearInput={handleClearInput}
          handleItemClickFrom={handleItemClickFrom}
          toggleListFrom={toggleListFrom}
        />

        <ToAirportList
          showListTo={showListTo}
          items={itemsTo}
          filteredItemsTo={filteredItemsTo}
          searchTerm={searchTerm}
          inputRef={inputRef}
          handleInputChange={handleInputChange}
          handleClearInput={handleClearInput}
          handleItemClickTo={handleItemClickTo}
          toggleListTo={toggleListTo}
        />

        {showDateRangePicker && (
          <DateRangePicker
            setShowDateRangePicker={setShowDateRangePicker}
            showDateRangePicker={showDateRangePicker}
            selectedDate={selectedDate}
            onSelect={handleDateChange} // Pass down the function to update the selected date
          />
        )}

{/* <br />
      <hr />
      
      {flights?.map((flight) => (
        <article key={flight.id}>
          <h2>{flight.numberOfBookableSeats}</h2>
          <h1 className='text-red-500'>{flight.lastTicketingDateTime}</h1>
        </article>
      ))} */}
     
       

      </article>
    
  )
}

export default OneWay