import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import FlightSearchForm from '../components/FlightSearch/FlightSearchForm';

const Flights = () => {
  const location = useLocation();
  const flights = location.state?.flights;
  const error = location.state?.error;

  const buttonText ='Modify Search';

  console.log(flights)

  return (
    <section>


      <div className="">
        <FlightSearchForm buttonText={buttonText}/>
      </div>

      <div className='p-10'>
        <p>{error}</p>
        {flights?.length === 0 ? (
          <p>No flights available.</p>
        ) : (
          flights?.map((flight) => (
            <article key={flight.id} className='border-b pb-5 '>
              {/* Accessing departure and arrival IATA codes */}
              {flight.itineraries.map((itinerary, index) => (
                  itinerary.segments.map((segment, index) => (
                    <div key={index} className='flex flex-col gap-1'>
                      <p>{segment.carrierCode} {segment.aircraft.code}</p>
                      <p>Departure: {segment.departure.iataCode}</p>
                      <p>Arrival: {segment.arrival.iataCode}</p>
                      <p>Departure Time: {segment.departure.at}</p>
                      <p>Arrival Time: {segment.arrival.at}</p>
                      <p>{
                        index === 0 ? <h2>Number off avaiable sit: {flight.numberOfBookableSeats}</h2> : ""
                      }</p>
                       <p>{
                        index === 0 ? <h2>duration:: { itinerary.duration}</h2> : ""
                      }</p>
                     
                     {
                      index === 0 ?<p>total Price: {flight.price.total} {flight.price.currency}</p>
                      : ""
                     }
                     
                    </div>
                  ))
               
              ))}
            </article>
          ))
        
        )}
      </div>



    </section>
  );
};

export default Flights;
