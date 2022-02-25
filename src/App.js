import axios from "axios";
import { useEffect, useState } from "react"

export default function App() {
  const [noData, setNoData] = useState();
  const [input, setInput] = useState();
  const [weather, setWeather] = useState();
  const isDay = weather?.weather[0].icon?.includes('d')
  const getTime = (timeStamp) => {
    return `${new Date(timeStamp * 1000).getHours()} : ${new Date(timeStamp * 1000).getMinutes()}`
  }
  const [disable, setDisable] = useState(true);
  const WeatherIcons = {
    "01d": "./icons/sunny.svg",
    "01n": "./icons/night.svg",
    "02d": "./icons/day.svg",
    "02n": "./icons/cloudy-night.svg",
    "03d": "./icons/cloudy.svg",
    "03n": "./icons/cloudy.svg",
    "04d": "./icons/perfect-day.svg",
    "04n": "./icons/cloudy-night.svg",
    "09d": "./icons/rain.svg",
    "09n": "./icons/rain-night.svg",
    "10d": "./icons/rain.svg",
    "10n": "./icons/rain-night.svg",
    "11d": "./icons/storm.svg",
    "11n": "./icons/storm.svg",
  };
  const WeatherInfoIcons = {
    sunset: "./icons/temp.svg",
    sunrise: "./icons/temp.svg",
    humidity: "./icons/humidity.svg",
    wind: "./icons/wind.svg",
    pressure: "./icons/pressure.svg",
  };
  const handleChange = (e) => {
    if(e.target.value.length !== null){
      setInput(e.target.value);
      setDisable(false);
    }
  }

  const callApi = async (city) => {
    try {
        await axios
        .get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=fe4feefa8543e06d4f3c66d92c61b69c`)
        .then((response) => {
          setWeather(response.data);
        });
    } catch(e){
        setNoData('City not found');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    callApi(input)
  }

  const handleBack = () => {
    setWeather(null);
    setDisable(true);
    setNoData(null)
  }
  
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      {
        weather ?
        <div className="justify-center flex items-center border w-[420px] h-[420px] mx-10 rounded-2xl shadow-2xl transform transition-all hover:-translate-y-2 duration-300">
          <div className="w-full my-5 mx-auto">
            <p className="text-center font-bold text-lg mb-5">React Weather App</p>
            <div className="flex justify-center items-center gap-5">
              <p><span className="text-2xl font-semibold">{`${Math.floor(weather?.main?.temp - 273)}°C`}</span>{`  |  ${weather?.weather[0].description}`}</p>
              <img className="w-[70px] h-[70px]" src={WeatherIcons[weather?.weather[0].icon]}/>
            </div>
            <p className="text-center font-bold text-xl mb-5">{`${weather?.name}, ${weather?.sys?.country}`}</p>
            <p className="text-left font-semibold text-md ml-5 mb-5">Weather Info</p>
            <div className="grid grid-cols-2 gap-5 mb-5">
              <div className="flex gap-2 justify-center">
                <img className="w-[40px] h-[40px]" src={WeatherInfoIcons.sunset}/>
                <div className="text-sm font-thin">
                  <p>{`${getTime(weather?.sys[isDay ? "sunset" : "sunrise"])}`}</p>
                  <p>{isDay ? "sunset" : "sunrise"}</p>
                </div>
              </div>
              <div className="flex gap-2 justify-center">
                <img className="w-[40px] h-[40px]" src={WeatherInfoIcons.humidity}/>
                <div className="text-sm font-thin">
                  <p>{weather?.main?.humidity}</p>
                  <p>Humidity</p>
                </div>
              </div>
              <div className="flex gap-2 justify-center">
                <img className="w-[40px] h-[40px]" src={WeatherInfoIcons.wind}/>
                <div className="text-sm font-thin">
                  <p>{weather?.wind?.speed}</p>
                  <p>Wind</p>
                </div>
              </div>
              <div className="flex gap-2 justify-center">
                <img className="w-[40px] h-[40px]" src={WeatherInfoIcons.pressure}/>
                <div className="text-sm font-thin">
                  <p>{weather?.main?.pressure}</p>
                  <p>Pressure</p>
                </div>
              </div>
            </div>
            <form onSubmit={handleBack} className="flex justify-center">
              <button className="bg-sky-300 hover:bg-sky-500 p-2 rounded-lg font-semibold">Back</button>
            </form>
          </div>
        </div> 
        :
        <div className="justify-center flex items-center border w-[420px] h-[420px] mx-10 rounded-2xl shadow-2xl transform transition-all hover:-translate-y-2 duration-300">
          <div className="w-full my-5 mx-auto">
            <p className="text-center font-bold text-lg mb-5">React Weather App</p>
            <img className="w-[140px] h-[140px] mb-5 mx-auto" src="./icons/perfect-day.svg"/>
            <p className="text-center font-bold text-lg mb-5">Find Weather of your city</p>
            <form onSubmit={handleSubmit} className="flex justify-center">
              <input className="border rounded-l-lg p-1" placeholder="Search City..." onChange={handleChange}/>
              <button disabled={disable} className="bg-sky-300 hover:bg-sky-500 p-2 rounded-r-lg font-semibold">Search</button>
            </form>
            {
              noData !== null ?
              <p className="text-red-500 text-sm font-semibold text-center">{noData}</p>
              :
              <p></p>
            }
          </div>
        </div>
      }
    </div>
  )
}