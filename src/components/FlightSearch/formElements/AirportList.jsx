import { IoClose } from 'react-icons/io5';
import arrow from "../../../assets/icon/arrow.png"
import { IoSearchOutline } from "react-icons/io5";
import { useState } from 'react';

export const AirportList = ({ handleAirportSelect, setShowAirportList }) => {
  const airportDatas = [ 
    { id: 1, name: 'DAC' },
    { id: 2, name: 'DXB' },
    { id: 3, name: 'CTO | Marrakesh - Menara Airport, Morocco' },
    { id: 4, name: 'GTO | Marrakesh - Menara Airport, Morocco' },
    { id: 5, name: 'MTO | Marrakesh - Menara Airport, Morocco' },
    { id: 6, name: 'SYD' },
    { id: 7, name: 'BKK' },
  ];

  const [airportLists, setAirportLists] = useState(airportDatas);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleClearSearch = () => {
    setSearchTerm("");
  };

  const filteredAirports = airportLists.filter((airport) =>
    airport.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="md:relative flex flex-wrap justify-between mx-auto w-full rounded-xl shadow-2xl">
      <ul className="absolute top-0 left-0 right-0 bottom-0 h-[100vh] md:h-[300px] overflow-auto w-full md:w-[350px] bg-white md:left-[65px]">
        <li>
          <h5 className="p-2 bg-[#8e2157] text-white font-medium w-full">
            Airports
          </h5>
        </li>
        <li className="w-full justify-between border-b-2 px-5 gap-5 flex items-center">
          <img
            src={arrow}
            alt=""
            className="rotate-180 w-3 cursor-pointer"
            onClick={() => setShowAirportList(false)}
          />
          <div className="flex w-full items-center gap-1">
            <IoSearchOutline className='text-[16px] text-gray-600'/>
            <input
              type="text"
              placeholder="Type to search"
              value={searchTerm}
              onChange={handleSearchChange}
              className="py-5 outline-0 w-full text-sm text-gray-600"
            />
            {searchTerm && (
              <IoClose
                onClick={handleClearSearch}
                className="w-4 h-4 p-0.5 text-[#8e2157] bg-gray-300 rounded-full cursor-pointer"
              />
            )}
          </div>
        </li>
        {/* ----------------------------------------- Airports List------------------------------------- */}
        {filteredAirports.length === 0 ? (
          <li className="px-5 text-sm shadow-sm py-4">No airports found.</li>
        ) : (
          filteredAirports.map((airportList) => (
            <li
              key={airportList.id}
              className="px-5 text-sm shadow-sm py-4 cursor-pointer hover:bg-gray-300"
              onClick={() => handleAirportSelect(airportList.name)}
            >
              {airportList.name}
            </li>
          ))
        )}
      </ul>
    </div>
  );
};
