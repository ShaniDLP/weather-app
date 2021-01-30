// import React, { useState, useEffect, Fragment } from 'react'
// import { AsyncTypeahead } from 'react-bootstrap-typeahead';

// const SEARCH_URI = 'https://dataservice.accuweather.com/locations/v1/cities/autocomplete';
// const api_key = 'JTVGoizGUiNTCA1KUJiKQAtINlVuBMrl';


// const AutoComplete = () => {
//   const [isLoading, setIsLoading] = useState(false);
//   const [cities, setOptions] = useState([]);

  
//     // const handleSearch = (query) => {
//     // setIsLoading(true);
//     //   fetch(`${SEARCH_URI}?apikey=${api_key}&q=${query}`)
//     //     .then(response => response.json())
//     //     .then(setOptions(response))
//     //     .catch(err => console.log(err))
//     // setIsLoading(false);




//   //   setIsLoading(true);
//   //   useEffect(() => {
//   //     fetch(`${SEARCH_URI}?apikey=${api_key}&q=${query}`)
//   //       .then((resp) => resp.json())
//   //       .then(({ items }) => {  })
//   //   }, []);
//   //   setIsLoading(false);
//   // };





//     // setIsLoading(true);
//     // fetch(`${SEARCH_URI}?apikey=${api_key}&q=${query}`)
//     //   .then((resp) => {
//     //     let data = resp.json();
//     //     const cities =  data.map((city) => ({
//     //       cityName: city.LocalizedName,
//     //       cityKey: city.Key
//     //     }));
//     //     console.log(data);
//     //     console.log(cities);
//     //     setIsLoading(false);
//     //   });


//       // => resp.json()
//       // .then(({ items }) => {
//         // const cities = items.map((i) => ({
//         //   cityName: i.cityName,
//         //   avatar_url: i.avatar_url,
//         //   id: i.id,
//         //   login: i.login,
//         // }));

    
//       // });
//   };
  

//   // Bypass client-side filtering by returning `true`. Results are already
//   // filtered by the search endpoint, so no need to do it again.
//   const filterBy = () => true;

//   return (
//     <AsyncTypeahead
//       filterBy={filterBy}
//       id="async-example"
//       isLoading={isLoading}
//       labelKey="login"
//       minLength={3}
//       onSearch={HandleSearch}
//       cities={cities}
//       placeholder="Search City"
//       renderMenuItemChildren={(option, props) => (
//         <Fragment>
     
//           <span>{option.cityName}</span>
//         </Fragment>
//       )}
//     />
//   );
// };


// export default AutoComplete;