import React, { useState } from "react";
import axios from "axios";
import store from "../../store/store";
import { useDispatch } from 'react-redux';
import { getWeather } from '../../store/actions/weatherActions'
import { FETCH_AUTOCOMPLETE, FETCH_AUTOCOMPLETE_SUCCESS } from '../../store/types';
import "./search.css";

const api_key = "NmTutitlyJjHxUpR37kM6MbLEc6JEgmb";

function SearchBar() {
  const dispatch = useDispatch();
  const { weatherList } = store.getState();
  const { searchOptions } = weatherList;

  const handleSubmit = (key, name) => {
    console.log(key, name);
    // update state with cityName and cityKey
    dispatch({
      type: FETCH_AUTOCOMPLETE_SUCCESS,
      payload: {Key: key, Name: name}
    });
    dispatch(getWeather());
  };

  const handleQueryChange = (event) => {
    handleSearch(event.target.value);
  };


  const handleSearch = (event) => {
    let query = event.target.value;
    // console.log(`searching for query:`, query);
    if (query.length < 3) {
      dispatch({
        type: FETCH_AUTOCOMPLETE,
        payload: [] // empty autocomplete list
      });
      return;
    }
    axios
      .get(
        "https://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=" + api_key + "&q=" + query
      )
      .then((response) => updateOptions(response.data));
  };

  const updateOptions = (cities) => {
    if (cities.length <= 0) {
      return;
    }

    const optionalCities = cities.map((city) => (
      <div
        key={city.Key}
        onClick={() => handleSubmit(city.Key, city.LocalizedName)}>
        {city.LocalizedName}
      </div>
    ));

    dispatch({
      type: FETCH_AUTOCOMPLETE,
      payload: optionalCities
    });
  };

  return (
    <div id="searchBar">
      <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Search City" onChange={handleSearch} id="searchinput" />
      </form>
      <div id="searchWrapper">
        <div id="searchResult">{searchOptions}</div>
      </div>
      </div>
      );
    }
export default SearchBar;