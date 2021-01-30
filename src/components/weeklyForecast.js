import React from 'react';
import './weather.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudSun, faHeart } from '@fortawesome/free-solid-svg-icons';
// import { CardDeck } from "react-bootstrap";
// import Card from "react-bootstrap/Card";
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
              // <FontAwesomeIcon icon={faCloudSun} />
















// <ul>
// {imgs.map(
//   (img, i) =>
//     <li key={i} data-id={img.id} onClick={onClick}>
//       <figure>
//         <CardDeck >
//           <Card id="siteCard">
//             <Card.Img variant="top" src={img.src} alt={img.name} />
//             <Card.Body dir="rtl">
//             <Card.Title>{img.name}</Card.Title>
//             </Card.Body>
//           </Card>
//         </CardDeck>
//       </figure>
//     </li>)}
// </ul>





  //     <h3>SUNDAY</h3>
