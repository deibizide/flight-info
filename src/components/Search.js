// react
import React, { Fragment, useState } from 'react';
// style
// import './index.scss';

const Search = () => {
    const [inputValue, setInputValue] = useState('');
    const [flightData, setFlightData] = useState(null);

    const fetchFlightData = () => {
        const endpoint = 'https://cors-anywhere.herokuapp.com/http://api.aviationstack.com/v1/flights';
        const accessKey = `access_key=${process.env.REACT_APP_ACCESS_KEY}`;
        const flightIata = `flight_iata=${inputValue}`;

        const url = `${endpoint}?${accessKey}&${flightIata}`;

        fetch(url)
            .then(resp => resp.json())
            .then(resp => setFlightData(resp.data))
            .catch(e => console.log({ e }));
    };
    console.log();

    return (
        <Fragment>
            <div className="search__container">
                <h1>Check Flight Status</h1>
                <div className="search__input-fields">
                    <input type="text" placeholder="ex: F-356" onChange={e => setInputValue(e.target.value)} />
                </div>
                {flightData && (
                    <div className="search__flight-info">
                        <div className="search__status">
                            <h2>Fligh Status:</h2>
                            <p>On air</p>
                            <h2>Flight duration:</h2>
                            <p>4 hours 40min</p>
                        </div>
                        <div className="search__departure">
                            <h3>Departure</h3>
                            <p>Airport: Boston</p>
                            <p>Arrival Time: 14:55PM, Nov 23</p>
                        </div>
                        <div className="search__arrival">
                            <h3>Arrival</h3>
                            <p>Airport: Boston</p>
                            <p>Arrival Time: 18:55PM, Nov 23</p>
                        </div>
                    </div>
                )}
                <button onClick={fetchFlightData}>Search</button>
            </div>
        </Fragment>
    );
};

export default Search;

// 	- Airport code to airport code (SXF to BRU)
// 	- Flight date formatted well
// 	- Flight Duration
// 	- Flight arrival time
// 	- Flight status

// Bonus:
// 	- Delays if any
// 	- Terminal / Gate (Departure & Arrival)
// 	- Baggage belt on arrival.
