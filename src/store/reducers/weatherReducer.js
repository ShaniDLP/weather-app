import { act } from 'react-dom/test-utils';
import { CHANGE_CITY, FETCH_AUTOCOMPLETE, FETCH_AUTOCOMPLETE_ERROR,
     FETCH_AUTOCOMPLETE_SUCCESS, FETCH_DAILY_WEATHER, FETCH_DAILY_WEATHER_SUCCESS,
      FETCH_DAILY_WEATHER_ERROR, FETCH_WEEKLY_WEATHER, FETCH_WEEKLY_WEATHER_SUCCESS,
      FETCH_WEEKLY_WEATHER_ERROR} from '../types';

const initialState = {
    dataResponse:[],
    loading:true,
    query:'London',
    cities: [],

    city_key: "328328",
    city_name: "London",

    selectedKey: "215854",
    selectedCity:'Tel Aviv',
    currentDailyTemp: '24',
    currentWeeklyTemp: ['30'],
    displayFavorites: false
}

export default function(state = initialState, action) {

    switch(action.type) {

        case FETCH_AUTOCOMPLETE:
            return {
                ...state,
                dataResponse: action.payload,
                loading: false,
                searchOptions: action.payload
                // selectedCity: action.payload
               
            }
        //is no response from the API or there is an error in calling the API the
        case FETCH_AUTOCOMPLETE_SUCCESS:
            console.log('FETCH_AUTOCOMPLETE_SUCCESS', action.payload);
            return{
                ...state,
                loading:false,
                // cities: action.payload, ///////
                selectedCity: action.payload.Name,
                selectedKey: action.payload.Key,
                searchOptions: []
                // cities:action.payload

        }   
               
        case FETCH_AUTOCOMPLETE_ERROR:
            return{
                loading: false, 
                error: action.error 
            }
            // כשהמשתמש מקליד
        case CHANGE_CITY:
            return{
                ...state,
                query: action.payload,
                loading:false,         
            }
            
        case FETCH_DAILY_WEATHER:
            return{
                ...state,
                loading:true,
                currentDailyTemp: action.payload
                
            }
        
        case FETCH_DAILY_WEATHER_SUCCESS:
            return{
              ...state,
              currentDailyTemp: action.payload,
              loading:false
            }
        case  FETCH_DAILY_WEATHER_ERROR:  
            return{
                ...state,
               currentDailyTemp : action.error,
               loading:false
            }

        case FETCH_WEEKLY_WEATHER:
            return{  
                ...state,
                loading:true  
            }   
        case FETCH_WEEKLY_WEATHER_SUCCESS:
            return{
             ...state,
             currentWeeklyTemp: action.payload,
             loading: false
            } 
          case FETCH_WEEKLY_WEATHER_ERROR:
              return{
             ...state,
             currentWeeklyTemp: action.error,
             loading: false
            }
                






        default: return state
    }
}