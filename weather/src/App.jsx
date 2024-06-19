import { useEffect, useState } from 'react'
import './App.css'
import searchIcon from "./assets/search.png"
import clearIcon from "./assets/clear.png"
import cloudIcon from "./assets/cloud.png"
import drizzleIcon from "./assets/drizzle.png"
import rainIcon from "./assets/rain.png"
import windIcon from "./assets/wind.png"
import snowIcon from "./assets/snow.png"
import humidityIcon from "./assets/humidity.png"



const WeatherDetails= ({icon,temp,city,country,lat,log,humidity,wind}) =>{
return (
  <>
<div className='image'>
<img src={icon} alt="Image" className='realimg'/>
</div>

<div className='temp'>{temp}°C</div>
<div className='location'>{city}</div>
<div className='country'>{country}</div>

      <div className='cord'>

        <div>
          <span className="lat">latitude</span>
          <span>{lat}</span>
        </div>

        <div>
          <span className="log">longitude</span>
          <span>{log}</span>
        </div>

      </div>

<div className="data-container">
  <div className="element">
    <img src={humidityIcon} alt="HumidityIcon" className='humidimg' />
    <div className="data">
      <div className="percentage">{humidity}%</div>
      <div className="text">Humidity</div>
    </div>
  </div>

  <div className="element">
    <img src={windIcon} alt="WindIcon" className='humidimg' />
    <div className="data">
      <div className="percentage">{wind} km / hr</div>
      <div className="text">Wind Speed</div>
    </div>
  </div>

</div>

</>
)
};



function App() {
  
  let api_key="a8998fa7c4accf1198a7b3c375d184c4";

const [text,setText]=useState("Chennai");  
const [icon,setIcon]=useState(snowIcon);
const [temp,setTemp]=useState(0);
const [city,setCity]=useState("");
const [country,setCountry]=useState("");
const [lat,setLat]=useState(0);
const [log,setLog]=useState(0);
const [wind,setWind]=useState(0);
const [humidity,setHumidity]=useState(0);

const [cityNotFound,setCityNotFound]=useState(false);
const [loading,setLoading]=useState(false);
const [error,setError]=useState(null); 


const weatherIconMap={
"01d": clearIcon,
"01n": clearIcon,
"02d": clearIcon,
"02n": clearIcon,
"03d": drizzleIcon,
"03n": drizzleIcon,
"04d": drizzleIcon,
"04n": drizzleIcon,
"09d": rainIcon,
"09n": rainIcon,
"010d": rainIcon,
"010n": rainIcon,
"13d" :snowIcon,
"13n" :snowIcon,
};

const search=async ()=>{
  setLoading(true);
  let url=`https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${api_key}&units=Metric`;

  try{
    let res=await fetch(url);
    let data=await res.json();
    // console.log(data);
    if(data.cod==="404"){
      console.error("city not found");
      setCityNotFound(true);
      setLoading(false);
      return;
    }
    setHumidity(data.main.humidity);
    setWind(data.wind.speed);
    setTemp(Math.floor(data.main.temp));
    setCity(data.name);
    setCountry(data.sys.country);
    setLat(data.coord.lat);
    setLog(data.coord.lon); 
    const weatherIconCode=data.weather[0].icon;
    setIcon( weatherIconMap[weatherIconCode] || clearIcon);
    setCityNotFound(false);

  }
  catch(error ){
console.log("An Error Occured: ",error.message);
setError("An Error Occured While Fetching Data");
  }
  finally{
    setLoading(false);
  }
};

const handleCity = (e)=> {
  setText(e.target.value);
};

const handleKeyDown =(e)=>{
  if(e.key=== "Enter"){
    search();
  }
};


useEffect(function () {
  search();
},[]);

  return (
    <>
      <div className='container'>
        <div className='input-container'>

      <input type="text" className='cityInput' placeholder='Search City'  onChange={handleCity} value={text} onKeyDown={handleKeyDown}/>
      <div className='search-icon'><img src={searchIcon} alt="Search Icon" className='search' onClick={()=>search()} /></div>
        </div>
       

        { loading &&<div className="loading-message">Loading...</div>}
        {error &&<div className="error-message">{error}</div>}
        {cityNotFound && <div className="city-not-found">City Not Found</div>}

        {!loading && !cityNotFound &&<WeatherDetails icon={icon} temp={temp} city={city} country={country} lat={lat} log={log} humidity={humidity} wind={wind} />}

        <div className="forspace"></div>
      </div>
      

    </>
  );  
}

export default App
