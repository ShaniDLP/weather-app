import { CHANGE_CITY, FETCH_DAILY_WEATHER, FETCH_DAILY_WEATHER_SUCCESS, FETCH_DAILY_WEATHER_ERROR, FETCH_WEEKLY_WEATHER, FETCH_WEEKLY_WEATHER_SUCCESS, FETCH_WEEKLY_WEATHER_ERROR } from '../types';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux'
import store from "../../store/store";


const api_key = "UztjRJe8lAtysOtyyGMxl0ClPeX7Q7uC";
const city_key = "328328";
const city_name = "London";
const metric = true;


 
export const getWeather = () => async dispatch => {
    const { weatherList } = store.getState();
    const { selectedKey } = weatherList;
    
    console.log("getWeather - selectedKey", selectedKey);
    dispatch(fetchDailyWeather(selectedKey));
    dispatch(fetchWeeklyWeather(selectedKey));
}

export const fetchDailyWeather = (key) => async dispatch => {
    console.log("dailyWeather", key);
    const ApiService = await axios.get("https://dataservice.accuweather.com/currentconditions/v1/" + key + "?apikey=" + api_key);
    dispatch({
        type: FETCH_DAILY_WEATHER
    });
    try{
        dispatch({
            type: FETCH_DAILY_WEATHER_SUCCESS,
            payload: ApiService.data[0]['Temperature']['Metric'].Value
        });
    }
    catch (error) {
        dispatch({
            type: FETCH_DAILY_WEATHER_ERROR,
            payload: error,
        })
    }
}

export const fetchWeeklyWeather = (key) => async dispatch => {
    console.log("weeklyWeather", key);
    const ApiServiceWeekly = await axios.get("https://dataservice.accuweather.com/forecasts/v1/daily/5day/" + key + "?apikey=" + api_key  +"&metric=" + metric );
    console.log(ApiServiceWeekly + ' ApiService weekly');
    dispatch({
        type: FETCH_WEEKLY_WEATHER
    });
    try {
        dispatch({
            type: FETCH_WEEKLY_WEATHER_SUCCESS,
            payload: ApiServiceWeekly.data
        });
    }
    catch (error) {
        dispatch({
            type: FETCH_WEEKLY_WEATHER_ERROR,
            payload: error,
        })
    }

}



// http://dataservice.accuweather.com/locations/v1/cities/autocomplete


// http://www.domain.com/page.php?var1=value1&var2=val2&var3=value3&...


// const res = await axios.get(`http://jsonplaceholder.typicode.com/users`)

// export const fetchDailyWeather = () => async  dispatch => {
//     try {
//        //If API sends the response without an error the data will be passed to the payload
//        const ApiService = await axios.get("https://dataservice.accuweather.com/forecasts/v1/daily/1day/"+city_key+"?apikey="+api_key);
//        dispatch({
//             type: FETCH_DAILY_WEATHER_SUCCESS,
//             payload: ApiService.data
//         });

//     }
//     catch(error) {
//         dispatch( {
//             type: FETCH_DAILY_WEATHER_ERROR,
//             payload: error,
//         })
//     }
// console.log('yayyy');

// }