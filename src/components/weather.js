import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getWeather, fetchDailyWeather, fetchWeeklyWeather } from '../store/actions/weatherActions'
import { CHANGE_CITY, FETCH_AUTOCOMPLETE, FETCH_DAILY_WEATHER, FETCH_WEEKLY_WEATHER, FETCH_WEEKLY_WEATHER_SUCCESS } from '../store/types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudSun, faHeart, faSearch } from '@fortawesome/free-solid-svg-icons';
import WeeklyForecast from './weeklyForecast';
import weeklyData from '../weeklyData.json';
import ExternalLinks from '../UI/externalLinks';
// import { Button, InputGroup, FormControl } from 'react-bootstrap';
import './weather.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
import MyFavorites from './favotires/favorites';
import Search from './search/search';

const Weather = () => {
    const dispatch = useDispatch();
    const weatherList = useSelector(state => state.weatherList);
    const { loading, error, dataResponse, selectedKey, selectedCity, currentDailyTemp, currentWeeklyTemp, query, displayFavorites, options } = weatherList;
    const currentWeeklyForecast = weeklyData['DailyForecasts'];

    useEffect(() => {
        dispatch(getWeather())
    }, [dispatch]);

    // if (dataResponse == undefined || Object.keys(dataResponse).length == 0) {
    //     return '';
    // }


    const addToFavorites = () => {
        console.log(selectedCity, selectedKey);
        try {
            const storedState = localStorage.getItem("state");
            let isFirst = false;

            if (!storedState) { // couldn't find "state" in localStorage
                const state = [{key: selectedKey, name: selectedCity }];
                const storedState = JSON.stringify(state);
                localStorage.setItem("state", storedState);

                isFirst = true;
            }
            
            if(isFirst) {
                return;
            }

            let newState = [];
            let addSelectedCity = true;
            const tempState = JSON.parse(storedState);

            console.log( "going over array" );
            tempState.forEach((data) => {
                data.key != selectedKey ?
                    newState.push(data) :
                    addSelectedCity = false; console.log("removing", data.name)
                });

            if(addSelectedCity) {
                console.log("adding city", selectedCity);
                newState.push({key: selectedKey, name: selectedCity });
            }
            
            localStorage.setItem("state", JSON.stringify(newState));    // update storage

        } catch(err) {
            console.log("couldn't open storage");
            return;
        }
    }

    return (
        <div>
            <div className="mainPage"></div>

            <header>1
                <h2> my favorites
                <span> <FontAwesomeIcon icon={faHeart} /></span>
                </h2>
            </header>
            
            

            <div>
            <Search/>
            
              
                <div className="dailyWeather">
                    <span id="cityName">
                        {selectedCity}
                    </span>
                    <div className="addFavorite">
                        <FontAwesomeIcon icon={faHeart} onClick={() => addToFavorites()} />
                    </div>
                    <div id="currentDailyTemp">
                        <span>
                            {currentDailyTemp}°
                    </span>

                    </div>
                    <div className="icon">
                        <FontAwesomeIcon icon={faCloudSun} />
                    </div>

                </div>

                <div className="weeklyWeather">
                    <WeeklyForecast data={currentWeeklyForecast} />
                </div>

            </div>
            <ExternalLinks />
        </div>

    )
}


export default Weather;

// <MyFavorites  data={currentWeeklyForecast}/>




// <MyFavorites  data={currentWeeklyForecast}/>
// <div id="searchButton">
// <InputGroup className="mb-3" onChange={(e) => { dispatch({ type: CHANGE_CITY, payload: e.target.value }); }}>
//     <FormControl
//         placeholder="Search City"/>
//     <InputGroup.Append>
//         <Button variant="outline-secondary" onClick={(e) => { e.preventDefault(); dispatch((fetchWeeklyWeather())); dispatch((fetchDailyWeather())) }}>
//             <FontAwesomeIcon icon={faSearch} />
//         </Button>
//     </InputGroup.Append>
// </InputGroup>
// </div>









// <input id="search" type="text" name="city" placeholder="Search City" onChange={(e) => { dispatch({ type: CHANGE_CITY, payload: e.target.value }); }} />
//               <button onClick={(e) => { e.preventDefault(); dispatch((fetchWeeklyWeather())); dispatch((fetchDailyWeather())) }}>Click me</button>







            // {loading ? "Loading..." : error ? error.message : currentWeather }
            // onChange={(cityName)=>getWeather(cityName.target.value)}
            // {loading ? "Loading..." : error ? error.message : city_key_number}

        //     <div className="weeklyWeather">
        //     <h3>SUNDAY</h3>
        //     {currentWeeklyTemp}
        //     °
        //     <p>
        //         <FontAwesomeIcon icon={faCloudSun} />
        //     </p>
        // </div>
        // <WeeklyForecast data={temp_currentWeeklyTemp}/>






        // </div>
    //     <AsyncTypeahead
    //     filterBy={filterBy}
    //     id="async-example"
    //     isLoading={isLoading}
    //     labelKey="cityKey"
    //     minLength={3}
    //     onSearch={(e) => { dispatch({ type: FETCH_AUTOCOMPLETE, payload: e.target.value }); }}

    //     options={options}
    //     placeholder="Search City"
    //     renderMenuItemChildren={(option, props) => (
    //         <Fragment>
    //             <span>{option.cityName}</span>
    //         </Fragment>
    //     )}
    // />

      // const handleSearch = (query) => {
    //         setIsLoading(true);

    //         getWeather(query);

    //         setOptions(options);
    //         setIsLoading(false);

    //   };



    ////// לא ממש הצליח

//     <div className="autocomplete-wrapper">
//     <h3>React Autocomplete Demo</h3>
//     <Autocomplete
//       value={selectedCity}
//      items={renderCityName()}

//       getItemValue={item => item.LocalizedName}
//       renderMenu={item => (
//         <div className="dropdown">
//           {item}
//         </div>
//       )}
//       renderItem={(item, isHighlighted) =>
//         <div className={`item ${isHighlighted ? 'selected-item' : ''}`}>
//           {item.LocalizedName}
//         </div>
//       }
//       onChange = {onChangeSearchKey} 
//       onSelect = {(e) => { dispatch({ type:CHANGE_CITY , payload: query }); }} 
//     />
//     <InputGroup.Append>
//     <Button variant="outline-secondary" onClick={(e) => { e.preventDefault(); dispatch((fetchWeeklyWeather(selectedCity))); dispatch((fetchDailyWeather(selectedCity))) }}>
//      <FontAwesomeIcon icon={faSearch} />
//      </Button>
//     </InputGroup.Append>
//   </div>

