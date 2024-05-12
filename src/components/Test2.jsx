import React, { useState } from 'react';
import axios from 'axios';
import qs from 'qs';

const MultiCity = () => {
  const [cities, setCities] = useState([
    { origin: '', destination: '', departureDate: '' },
    { origin: '', destination: '', departureDate: '' }
  ]);

  const handleCityChange = (index, field, value) => {
    const updatedCities = [...cities];
    updatedCities[index][field] = value;
    setCities(updatedCities);
  };

  const addCity = () => {
    setCities([...cities, { origin: '', destination: '', departureDate: '' }]);
  };

  const removeCity = (index) => {
    const updatedCities = [...cities];
    updatedCities.splice(index, 1);
    setCities(updatedCities);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Iterate over cities and make API calls for each city
    for (const city of cities) {
      try {
        // Make API call for each city
        const response = await axios.get(`API_URL_HERE`, {
          params: {
            originLocationCode: city.origin,
            destinationLocationCode: city.destination,
            departureDate: city.departureDate,
            // Add other parameters as needed
          },
          headers: {
            // Add headers as needed
          }
        });
        console.log(response.data); // Handle API response
      } catch (error) {
        console.error('Error fetching flights:', error);
      }
    }
  };
  return (
    <form onSubmit={handleSubmit}>
    {cities.map((city, index) => (
      <div key={index}>
        <input
          type="text"
          value={city.origin}
          onChange={(e) => handleCityChange(index, 'origin', e.target.value)}
          placeholder="Origin"
        />
        <input
          type="text"
          value={city.destination}
          onChange={(e) => handleCityChange(index, 'destination', e.target.value)}
          placeholder="Destination"
        />
        <input
          type="date"
          value={city.departureDate}
          onChange={(e) => handleCityChange(index, 'departureDate', e.target.value)}
          placeholder="Departure Date"
        />
        <button type="button" onClick={() => removeCity(index)}>Remove</button>
      </div>
    ))}
    <button className='bg-gray-600' type="button" onClick={addCity}>Add City</button>
    <button type="submit">Search Flights</button>
  </form>
  )
}

export default MultiCity