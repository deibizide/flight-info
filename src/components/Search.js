// react
import React, { Fragment, useState } from 'react';
// style
// import './index.scss';

const Search = () => {
    const [inputValue, setInputValue] = useState('');
    const [flightData, setFlightData] = useState('');

    const fetchFlightData = () => {
        const endpoint = 'https://cors-anywhere.herokuapp.com/http://api.aviationstack.com/v1/flights';
        const accessKey = `access_key=${process.env.REACT_APP_ACCESS_KEY}`;
        const flightIata = `flight_iata=${inputValue.toUpperCase()}`;

        const url = `${endpoint}?${accessKey}&${flightIata}`;

        fetch(url)
            .then(resp => resp.json())
            .then(resp => setFlightData(resp.data[0]))
            .catch(e => console.log({ e }));
    };
    //arrivals info
    const arrivalAirport = flightData.arrival ? flightData.arrival.iata : null;
    const arrivalTerminal = flightData.arrival ? flightData.arrival.terminal : null;
    const arrivalGate = flightData.arrival ? flightData.arrival.gate : null;
    const arrival = flightData.arrival ? flightData.arrival.scheduled : null;

    //departure info
    const departureAirport = flightData.departure ? flightData.departure.iata : null;
    const departureTerminal = flightData.departure ? flightData.departure.terminal : null;
    const departureGate = flightData.departure ? flightData.departure.gate : null;
    const departure = flightData.departure ? flightData.departure.scheduled : null;

    const formatDate = date => {
        const dates = new Date(date);
        const year = dates.getFullYear();
        const month = dates.getMonth() + 1;
        const day = dates.getDate();

        return day + '-' + month + '-' + year + '/';
    };

    const formatHour = date => {
        const dates = new Date(date);
        const hours = dates.getHours();
        const minutes = dates.getMinutes();
        return hours + ':' + minutes;
    };

    // Calculates the flight duration.
    function diff(start, end) {
        start = start.split(':');
        end = end.split(':');
        var startDate = new Date(0, 0, 0, start[0], start[1], 0);
        var endDate = new Date(0, 0, 0, end[0], end[1], 0);
        var diff = endDate.getTime() - startDate.getTime();
        var hours = Math.floor(diff / 1000 / 60 / 60);
        diff -= hours * 1000 * 60 * 60;
        var minutes = Math.floor(diff / 1000 / 60);

        return (hours < 9 ? '0' : '') + hours + ':' + (minutes < 9 ? '0' : '') + minutes;
    }

    console.log(flightData);

    return (
        <Fragment>
            <div className="search__container">
                <h1>Check Flight Status</h1>
                <div className="search__input-fields">
                    <input type="text" placeholder="ex: F122" onChange={e => setInputValue(e.target.value)} />
                </div>
                {/* {flightData && ( */}
                <div className="search__flight-info">
                    <div className="search__status">
                        <h2>Flight Status: </h2>
                        <p>{flightData.flight_status}</p>
                        <h2>Flight duration:</h2>
                        <p>{diff(formatHour(departure), formatHour(arrival))}</p>
                    </div>
                    <div className="search__departure">
                        <h3>Departure</h3>
                        <p>Airport: {departureAirport} </p>
                        <p>
                            Arrival Time: {formatDate(departure)} / {formatHour(departure)}
                        </p>
                        <p>
                            Terminal: {departureTerminal} / Gate:
                            {departureGate === null ? 'Info is not available' : departureGate}
                        </p>
                    </div>
                    <div className="search__arrival">
                        <h3>Arrival</h3>
                        <p>Airport: {arrivalAirport}</p>
                        <p>
                            Arrival Time:{formatDate(arrival)} / {formatHour(arrival)}{' '}
                        </p>
                        <p>
                            Terminal: {arrivalTerminal} / Gate:
                            {arrivalGate === null ? 'Info is not available' : arrivalGate}
                        </p>
                    </div>
                </div>
                {/* )} */}
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
