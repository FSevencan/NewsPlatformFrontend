import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SimpleWeatherDisplay = ({ city }) => {
    const [weatherData, setWeatherData] = useState(null);
    const apiKey = 'b73521b309f871a47131476534034035';

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                const response = await axios.get(
                    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
                );
               
                setWeatherData(response.data);
            } catch (error) {
                console.error('Hava durumu verisi alınırken hata oluştu:', error);
            }
        };

        if (city) {
            fetchWeather();
        }
    }, [city]);

    

    if (!weatherData) {
        return <div>Yükleniyor...</div>;
    }
    

    const iconCode = weatherData.weather[0].icon;
    const temperature = Math.round(weatherData.main.temp);
    const cityName = weatherData.name; 

    
    return (
        <div>
            <img src={`http://openweathermap.org/img/w/${iconCode}.png`} alt="Hava Durumu" />
            <span> {`${temperature}°C`}</span>
        </div>
    );
};

export default SimpleWeatherDisplay;