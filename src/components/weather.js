import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { IoSearchSharp } from "react-icons/io5";
import { Line } from 'react-chartjs-2';

const API_KEY = 'bd0fa5718ddca05faa2f31bbda199dfa';
const API_URL = 'https://api.openweathermap.org/data/2.5/weather';

const Weather = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [unit, setUnit] = useState('metric'); // Default to Celsius
  const [error, setError] = useState(null);
  const [recentSearches, setRecentSearches] = useState([]);
  const [showRecentSearches, setShowRecentSearches] = useState(false);
  const [chartData, setChartData] = useState(null);
  const searchRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}?q=${city}&units=${unit}&appid=${API_KEY}`);
        setWeatherData(response.data);
        setError(null);
        addToRecentSearches(city);
      } catch (error) {
        setError(error.response?.data?.message || 'An error occurred while fetching data');
        setWeatherData(null);
      }
    };

    if (city) {
      fetchData();
    }
  }, [city, unit]);

  const handleSearch = (e) => {
    e.preventDefault();
    setCity(e.target.value);
  };

  const handleUnitChange = (e) => {
    setUnit(e.target.value);
  };

  const addToRecentSearches = (search) => {
    setRecentSearches(prevSearches => {
      // Keep only unique searches and limit to last 5
      const updatedSearches = [search, ...prevSearches.filter(item => item !== search)].slice(0, 5);
      return updatedSearches;
    });
  };

  const handleRecentSearchClick = (search) => {
    setCity(search);
    setShowRecentSearches(false);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowRecentSearches(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className='mainPage'>
      <div className='appPage'>
      <h2>Welcome...!</h2>
      <div  ref={searchRef}>
        <div className="search-container"><input className='search'
          type="text" placeholder="Enter city name"
          onChange={handleSearch}
          onFocus={() => setShowRecentSearches(true)}
        /><IoSearchSharp size={20} style={{position:'relative', top:'5px'}}/></div>

        {showRecentSearches && recentSearches.length > 0 && (
          <ul className="recent-searches">
            {recentSearches.map((search, index) => (
              <li key={index} onClick={() => handleRecentSearchClick(search)} className='recentSearch'>{search}</li>
            ))}
          </ul>
        )}
      </div>
      <div className="switch-container">
        <label className="switch">
          <input
            type="radio"
            value="metric"
            checked={unit === 'metric'}
            onChange={handleUnitChange}
          />
          <span className="slider" style={{borderRadius:'8px 0px 0px 8px'}}>Celsius</span>
        
        </label>
        <label className="switch">
          <input
            type="radio"
            value="imperial"
            checked={unit === 'imperial'}
            onChange={handleUnitChange}
          />
          <span className="slider" style={{borderRadius:'0px 8px 8px 0px'}}>Fahrenheit</span>
          
        </label>
      </div>
      {error && <div className="error">{error}</div>}
      {weatherData && (
        <div>
          <h2>{weatherData.name}</h2>
          <p>Temperature: {weatherData.main.temp}&deg;{unit === 'metric' ? 'C' : 'F'}</p>
          <p>Weather: {weatherData.weather[0].description}</p>
          <p>Wind Speed: {weatherData.wind.speed} m/s</p>
        </div>
      )}



{weatherData && chartData && (
        <div>
          <h2>Past Weather Data for {weatherData.name}</h2>
          <Line
            data={{
              labels: Array.from({ length: 7 }, (_, i) => i + 1), // Assuming 7 days of past weather data
              datasets: [{
                label: 'Temperature (°' + unit.toUpperCase() + ')',
                data: chartData,
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
              }]
            }}
          />
        </div>
      )}


      </div>
    </div>
  );
};

export default Weather;