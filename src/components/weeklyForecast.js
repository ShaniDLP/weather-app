import React from 'react';
import './weather.css';
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const iconPadding = '00';
const WeeklyForecast = ({ data }) =>

  <ul>
    {data.map(
      (day, i) =>
        <div className="weatherItems" key={i}>
          <li>
            <span className="forecastHeadline"> {days[new Date(day['Date']).getDay()]}</span>
            <div className="iconAndTemp">
              {day['Temperature']['Maximum']['Value']}°
              <span className="weeklyIcon">
                <img src={`https://developer.accuweather.com/sites/default/files/${(iconPadding+day['Day'].Icon).slice(-iconPadding.length)}-s.png`} alt="" />
              </span>
            </div>
          </li>
        </div>)}
  </ul>


export default WeeklyForecast;
