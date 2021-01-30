import React from 'react';
import '../weather.css';
import './favorites.css';

const myFavorites = () => {
    let data = localStorage.getItem("state");
    if(!data) {
        return ( <div id="favoritesContainer">
            There are no favorites at the moment
        </div>);
    }

    data = JSON.parse(data);
    
    return (
    <div id="favoritesContainer">
        <ul>
            {data.map(
                (city, i) =>
                    <li className="weatherItems" key={i}>
                        <span className="forecastHeadline"> {city.name}</span>
                        <div className="iconAndTemp">
                            <span className="weeklyIcon">icon</span>
                        </div>
                    </li>
            )}
        </ul>
    </div>);
}

export default myFavorites;