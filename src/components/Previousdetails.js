import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Chart from 'chart.js/auto';

const API_KEY = 'bd0fa5718ddca05faa2f31bbda199dfa';
const API_URL = 'https://api.openweathermap.org/data/2.5/weather';

const PreviousDetails = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [unit, setUnit] = useState('metric');
  const [error, setError] = useState(null);
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}?q=${city}&units=${unit}&appid=${API_KEY}`);
        setWeatherData(response.data);
        setError(null);
        generateChartData(response.data);
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

  const generateChartData = (data) => {
    // Example: Generate chart data using past temperature data
    const pastTemperatureData = [20, 25, 18, 22, 26, 23, 24];
    const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];

    const dataset = {
      label: 'Past Temperature',
      data: pastTemperatureData,
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1
    };

    setChartData({
      labels: labels,
      datasets: [dataset]
    });
  };

useEffect(() => {
  if (chartData) {
    const ctx = document.getElementById('weatherChart');

    // Check if a chart instance already exists
    const existingChart = Chart.getChart(ctx);

    // Destroy the existing chart instance if it exists
    if (existingChart) {
      existingChart.destroy();
    }

    // Create a new chart instance
    new Chart(ctx, {
      type: 'line',
      data: chartData,
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
}, [chartData]);


  return (
    <div>
      <h1>Weather App</h1>
      <form onSubmit={handleSearch}>
        <input type="text" placeholder="Enter city name" onChange={handleSearch} />
        <button type="submit">Search</button>
      </form>
      <div>
        <canvas id="weatherChart" width="400" height="200"></canvas>
      </div>
      {weatherData && (
        <div>
<div style={{visibility:'hidden'}}><h2>{weatherData.name}</h2>
          <p>{weatherData.main.temp}&deg;{unit === 'metric' ? 'C' : 'F'}</p>
          <p>{weatherData.weather[0].description}</p>
          <p>{weatherData.wind.speed} m/s</p></div>
        </div>
      )}
    </div>
  );
};

export default PreviousDetails;