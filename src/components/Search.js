// react
import React, { Fragment, useState } from 'react';

const Search = () => {
    const [inputValue, setInputValue] = useState('');
    const [flightData, setFlightData] = useState(null);
    // flag to handle delay on API response
    const [isLoading, setIsLoading] = useState(false);
    // flag to handle error
    const [isError, setIsError] = useState(false);

    const fetchFlightData = () => {
        setIsLoading(true);
        const endpoint = 'https://cors-anywhere.herokuapp.com/http://api.aviationstack.com/v1/flights';
        // avoiding keeping the API key in the application's code
        const accessKey = `access_key=${process.env.REACT_APP_ACCESS_KEY}`;
        const flightIata = `flight_iata=${inputValue.toUpperCase()}`;

        const url = `${endpoint}?${accessKey}&${flightIata}`;

        fetch(url)
            .then(res => res.json())
            .then(res => {
                //handle error if array is empty
                if (res.data.length === 0) {
                    setIsLoading(false);
                    setIsError(true);
                    setFlightData(null);
                    setTimeout(() => {
                        setIsError(false);
                    }, 3000);
                    return;
                }
                setFlightData(res.data[0]);
                setIsLoading(false);
            })
            .catch(() => {
                setIsLoading(false);
                setIsError(true);
            });
    };

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

    // calculates the flight duration.
    const diff = (start, end) => {
        start = start.split(':');
        end = end.split(':');
        const startDate = new Date(0, 0, 0, start[0], start[1], 0);
        const endDate = new Date(0, 0, 0, end[0], end[1], 0);
        let difference = endDate.getTime() - startDate.getTime();
        const hours = Math.floor(difference / 1000 / 60 / 60);
        difference -= hours * 1000 * 60 * 60;
        const minutes = Math.floor(difference / 1000 / 60);

        return (hours < 9 ? '0' : '') + hours + ':' + (minutes < 9 ? '0' : '') + minutes;
    };

    return (
        <Fragment>
            <div className="search__container">
                <h1>Check Flight Status</h1>
                <div className="search__input-fields m-2">
                    <input
                        className="mr-3"
                        type="text"
                        placeholder="ex: F122"
                        onChange={e => setInputValue(e.target.value)}
                    />
                    <button className="btn btn-info" onClick={fetchFlightData}>
                        Search
                    </button>
                    {/* during API response */}
                    {isLoading && (
                        <div className="text-center">
                            <div className="spinner-border" role="status">
                                <span className="sr-only">Loading...</span>
                            </div>
                        </div>
                    )}
                </div>
                {/* if there's any error, this should appear */}
                {isError && (
                    <div className="alert alert-danger" role="alert">
                        Wrong flight number, please try again.
                    </div>
                )}
                {flightData && flightData.arrival && flightData.departure && (
                    <div className="search__flight-info animated fadeIn">
                        <div className="search__status">
                            <h2>
                                Flight Status: <span>{flightData.flight_status}</span>
                            </h2>
                            <h2>
                                Flight duration:{' '}
                                <span>
                                    {diff(
                                        formatHour(flightData.departure.scheduled),
                                        formatHour(flightData.arrival.scheduled)
                                    )}{' '}
                                    hours
                                </span>
                            </h2>
                        </div>
                        <div className="search__departure-arrival">
                            <div className="search__departure">
                                <h3>Departure</h3>
                                <h5>
                                    Airport: <span>{flightData.departure.iata}</span>
                                </h5>
                                <h5>
                                    Arrival Time:
                                    <span>
                                        {formatDate(flightData.departure.scheduled)}{' '}
                                        {formatHour(flightData.departure.scheduled)}
                                    </span>
                                </h5>
                                <h5>
                                    Terminal: <span>{flightData.departure.terminal}</span> Gate:
                                    <span>
                                        {flightData.departure.gate == null
                                            ? 'Info is not available'
                                            : flightData.departure.gate}
                                    </span>
                                </h5>
                            </div>
                            <div className="search__arrival">
                                <h3>Arrival</h3>
                                <h5>
                                    Airport: <span>{flightData.arrival.iata}</span>
                                </h5>
                                <h5>
                                    Arrival Time:
                                    <span>
                                        {formatDate(flightData.arrival.scheduled)}{' '}
                                        {formatHour(flightData.arrival.scheduled)}
                                    </span>
                                </h5>
                                <h5>
                                    Terminal: <span>{flightData.arrival.terminal}</span> Gate:
                                    <span>
                                        {flightData.arrival.gate === null
                                            ? 'Info is not available'
                                            : flightData.arrival.gate}
                                    </span>
                                </h5>
                                <h5>
                                    Baggage belt Nr:{' '}
                                    <span>
                                        {flightData.arrival.baggage === null
                                            ? 'Info is not available'
                                            : flightData.arrival.baggage}
                                    </span>
                                </h5>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </Fragment>
    );
};

export default Search;
