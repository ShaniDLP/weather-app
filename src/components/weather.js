import React, {  useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getWeather, fetchDailyWeather, fetchWeeklyWeather } from '../store/actions/weatherActions'
import { CHANGE_CITY, FETCH_AUTOCOMPLETE, UPDATE_FAVORITES, TOGGLE_PAGES, FETCH_DAILY_WEATHER, FETCH_WEEKLY_WEATHER, FETCH_WEEKLY_WEATHER_SUCCESS } from '../store/types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudSun, faHeart, faHome, faSearch } from '@fortawesome/free-solid-svg-icons';
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
    const { loading, selectedKey, selectedCity, currentDailyTemp, showError, errorMessage, iconNumber, togglePages, isSelectedInFavorites, currentWeeklyForecast } = weatherList;
    // const currentWeeklyForecast = weeklyData['DailyForecasts'];

    useEffect(() => {
        dispatch(getWeather())
    }, [dispatch]);

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

            dispatch({
                type: UPDATE_FAVORITES,
                payload: addSelectedCity
            })

        } catch(err) {
            console.log("couldn't open storage");
            return;
        }
    }

    const showHome = () => {
        dispatch({
            type: TOGGLE_PAGES,
            payload: false
        });
    }

    const showFavorites = () => {
        dispatch({
            type: TOGGLE_PAGES,
            payload: true
        });
    }

    let iconUrl = `https://developer.accuweather.com/sites/default/files/${iconNumber}-s.png`;

    return (
        <div>
            <div className="mainPage"></div>

            <header>
                <span onClick={() => showHome()}>
                    <span> <FontAwesomeIcon icon={faHome} /></span>
                    <span className="navbar">Home</span>
                </span>
                <span onClick={() => showFavorites()}>
                    <span> <FontAwesomeIcon icon={faHeart} /></span>
                    <span className="navbar">My Favorites </span>
                </span>
               
            </header>
            
            
            <div className={togglePages ? "hide" : "show"}> 
                <Search/>

                <div className="dailyWeather">
                    <span id="cityName">
                        {selectedCity}
                    </span>
                    <div className="addFavorite">
                        <FontAwesomeIcon icon={faHeart} className={isSelectedInFavorites ? "inFavorites" : ""} onClick={() => addToFavorites()} />
                    </div>
                    <div id="currentDailyTemp">
                        <span>
                            {currentDailyTemp}°
                        </span>
                    </div>
                    <div className="icon">
                        <img src={iconUrl} alt="" />
                    </div>
                    <div class="clear"></div>
                </div>

                <div className="weeklyWeather">
                    <WeeklyForecast data={currentWeeklyForecast} />
                </div>
            </div>

            <div className={togglePages ? "show" : "hide"}>
                <MyFavorites/>
            </div>

            <ExternalLinks />

            <div id="errorWrapper">
                <div id="errorToast" className={showError ? "show" : ""}>
                    {errorMessage}
                </div>
            </div>
        </div>
    )
}


export default Weather;
