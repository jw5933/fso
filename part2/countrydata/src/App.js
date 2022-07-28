import { useState, useEffect } from 'react';
import axios from 'axios'


const App = () => {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState('');
  const [single, setSingle] = useState({bool: false, country: {}});
  const api_key = process.env.REACT_APP_API_KEY;

  const hook = () => {
    axios
    .get("https://restcountries.com/v3.1/all")
    .then(response => {
      //console.log(response.data);
      setCountries(response.data);
    })
  }

  useEffect(hook, []);
  
  const handleFilter = (event) =>{
    setFilter(event.target.value);
  }

  const handleInputClick = (event) =>{
    event.preventDefault();
    const obj = {bool: false, country: {}}
    setSingle(obj);
  }

  if (countries.length === 0){
    return(
      <div>countries do not exist yet</div>
    )
    
  }
  else {
    return(
      <div>
        filter:
        <input
          value = {filter}
          onChange = {handleFilter}
          onClick = {handleInputClick}
        />
        <Filter
          countries={countries}
          filter={filter}
          single = {single}
          setSingle = {setSingle}
          api_key = {api_key}
        />
      </div>
    )
  }
}

const Filter = ({countries, filter, single, setSingle, api_key}) => {
  const re = new RegExp(filter, 'i')
  const filteredCountries = countries.filter(country => country.name.official.match(re));

  if(single.bool){
    return(
      <Country country={single.country} api_key = {api_key}/>
    )
  }
  else{
    // if (filteredCountries.length > 10){
    //   return(
    //     <div>
    //       <p>Please specify your search.</p>
    //     </div>
    //   )
    // }
    if (filteredCountries.length === 0){
      return(
        <div>
          <p>No matches.</p>
        </div>
      )
    }
    else if(filteredCountries.length === 1){
      return(
        <Country country={filteredCountries[0]} api_key = {api_key}/>
      )
    }
    else {
      return(
        <ul style ={{listStyle:'none'}}>
          {filteredCountries.map(country => (
              <li key = {country.name.official} >{country.name.official}
              <Button country = {country} setSingle = {setSingle}/>
              </li>)
          )}
        </ul>
      )
    }
  }
}

const Country = ({country, api_key}) => {
  const lat = country.capitalInfo.latlng[0];
  const lon = country.capitalInfo.latlng[1];

  const [weather, setWeather] = useState({});
  
  const hook = () => {
    axios
    .get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}`)
    .then(response => {
      //console.log(response.data);
      setWeather(response.data);
    })
  }
  useEffect(hook, [])

  return(
    <div>
      <h1>{country.name.official}</h1>
      <p>Capital: {country.capital}</p>
      <p>Area: {country.area}</p>
      <p>Lauguages:
        {Object.entries(country.languages).map(([k, v]) => <li key = {k}>{v}</li>)}
      </p>
      <img src = {country.flags.png}/>
      <div>
      <h2>Weather in {country.capital}</h2>
      {Object.keys(weather).length !== 0 ? <Weather weather = {weather}/> : <p>'weather not found'</p>}
      </div>
      
    </div>
  )
}


const Weather = ({weather}) => {
  const getCelcius = (K) => K - 273.15
  //console.log(weather)
  return(
    <ul style ={{listStyle:'none'}}>
      <p>temperature: {getCelcius(weather.main.temp).toFixed(2)}</p>
      <p>wind: {weather.wind.speed}</p>
      <p>feels like: {getCelcius(weather.main.feels_like).toFixed(2)}</p>
      <img src = {`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}/>
    </ul>
  )
}

const Button = ({country, setSingle}) => {
  const handleClick = (event) => {
    event.preventDefault();
    const obj = {bool: true, country: country}
    setSingle(obj);
  }
  return(
    <button onClick = {handleClick}>show</button>
  )
  
}
export default App;
