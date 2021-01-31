import { FETCH_DAILY_WEATHER, FETCH_DAILY_WEATHER_SUCCESS, FETCH_DAILY_WEATHER_ERROR, FETCH_WEEKLY_WEATHER, FETCH_WEEKLY_WEATHER_SUCCESS, FETCH_WEEKLY_WEATHER_ERROR, HIDE_ERROR } from '../types';
import axios from 'axios';
import store from "../../store/store";


const api_key = "GBG3H8qg9QLKcvDiygTuR2CgJt6bJSYG";
const metric = true;


const ERROR_TIMEOUT = 5000;
 
export const getWeather = () => async dispatch => {
    const { weatherList } = store.getState();
    const { selectedKey } = weatherList;
    
    dispatch(fetchDailyWeather(selectedKey));
    dispatch(fetchWeeklyWeather(selectedKey));
}

export const fetchDailyWeather = (key) => async dispatch => {
    const ApiService = await axios.get("https://dataservice.accuweather.com/currentconditions/v1/" + key + "?apikey=" + api_key);
    dispatch({
        type: FETCH_DAILY_WEATHER
    });
    try{
        dispatch({
            type: FETCH_DAILY_WEATHER_SUCCESS,
            payload: {
                temp: ApiService.data[0]['Temperature']['Metric'].Value,
                icon: ApiService.data[0]['WeatherIcon'] }
        });
    }
    catch (error) {
        dispatch({
            type: FETCH_DAILY_WEATHER_ERROR,
            payload: error,
        });
        setTimeout(() => {dispatch({ type: HIDE_ERROR })}, ERROR_TIMEOUT);
    }
}

export const fetchWeeklyWeather = (key) => async dispatch => {
    const ApiServiceWeekly = await axios.get("https://dataservice.accuweather.com/forecasts/v1/daily/5day/" + key + "?apikey=" + api_key  +"&metric=" + metric );
    dispatch({
        type: FETCH_WEEKLY_WEATHER
    });
    try {
        dispatch({
            type: FETCH_WEEKLY_WEATHER_SUCCESS,
            payload: ApiServiceWeekly.data['DailyForecasts']
        });
    }
    catch (error) {
        dispatch({
            type: FETCH_WEEKLY_WEATHER_ERROR,
            payload: error,
        });
        setTimeout(() => {dispatch({ type: HIDE_ERROR })}, ERROR_TIMEOUT);
    }

}