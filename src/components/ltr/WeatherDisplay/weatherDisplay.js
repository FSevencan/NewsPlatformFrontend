"use client"

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { formatDate } from "@/Utilities/dateFormatHelpers"


const getIconClassName = (iconCode) => {
    const iconMapping = {
        '01d': 'flaticon-sun',     // açık hava, gün
        '01n': 'flaticon-sun',     // açık hava, gece (gece için 'flaticon-sun' kullanılıyor)
        '02d': 'flaticon-cloudy',  // az bulutlu, gün
        '02n': 'flaticon-cloudy',  // az bulutlu, gece (gece için 'flaticon-cloudy' kullanılıyor)
        '03d': 'flaticon-cloud',   // bulutlu
        '03n': 'flaticon-cloud',   // bulutlu, gece
        '04d': 'flaticon-cloud',   // çok bulutlu, gün
        '04n': 'flaticon-cloud',   // çok bulutlu, gece
        '09d': 'flaticon-rain',    // hafif yağmur
        '09n': 'flaticon-rain',    // hafif yağmur, gece
        '10d': 'flaticon-rain',    // yağmurlu, gün
        '10n': 'flaticon-rain',    // yağmurlu, gece
        '11d': 'flaticon-rain',    // sağanak yağışlı, gün
        '11n': 'flaticon-rain',    // sağanak yağışlı, gece
        '13d': 'flaticon-cloud',   // karlı, gün
        '13n': 'flaticon-cloud',   // karlı, gece
        '50d': 'flaticon-cloud',   // sisli, gün
        '50n': 'flaticon-cloud',   // sisli, gece
        
    };
    return iconMapping[iconCode] || 'flaticon-cloud'; // Eşleşme yoksa varsayılan olarak 'flaticon-cloud' kullan
};


const getDayName = (dateStr, locale) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString(locale, { weekday: 'short' });
};


const WeatherDisplay = ({ city }) => {
    const [forecastData, setForecastData] = useState([]);
    const [currentTab, setCurrentTab] = useState(0);
    const apiKey = 'b73521b309f871a47131476534034035'; 

    useEffect(() => {
        const fetchForecast = async () => {
            try {
                const response = await axios.get(
                    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric&lang=tr`
                );
                const dailyData = response.data.list.filter((_, index) => index % 8 === 0);
                setForecastData(dailyData);
                setCurrentTab(0);
            } catch (error) {
                console.error('Hava durumu verisi alınırken hata oluştu:', error);
            }
        };

        fetchForecast();
    }, [city]);

    if (forecastData.length === 0) {
        return <div>Yükleniyor...</div>;
    }

    
    const handleTabClick = (index) => {
        setCurrentTab(index);
    };

   
    return (
        <div className="weather-wrapper">
            <div className="row thm-margin">
                <div className="col-3 col-lg-3 col-md-4 col-sm-4 thm-padding weather-week">
                    <div className="list-group">
                        {forecastData.slice(0,4).map((weather, index) => {
                            const dayName = getDayName(weather.dt_txt, 'tr-TR');
                           
                            const temp = Math.round(weather.main.temp); 
                            return (
                                <div
                                    className={`list-group-item ${currentTab === index ? "active" : ""}`}
                                    onClick={() => handleTabClick(index)}
                                    key={index}
                                >
                                    <i className={getIconClassName(weather.weather[0].icon)} />
                                    <div>{`${dayName}, ${temp}°C`}</div> 
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className="bhoechie-tab col-9 col-lg-9 col-md-8 col-sm-8 thm-padding">
                    {forecastData.map((weather, index) => (
                        <div className={`weather-temp-wrap ${currentTab === index ? "active" : ""}`} key={index}>
                            <div className="city-day">
                                <div className="city">{city}</div>
                                <div className="day">{formatDate(weather.dt_txt)}</div>
                            </div>
                            <div className="weather-icon">
                                <i className={getIconClassName(weather.weather[0].icon)} />
                                <div className="main-temp">{Math.round(weather.main.temp)}°C</div>
                            </div>
                            <div className="break">
                                <div className="wind-condition">Rüzgar: {weather.wind.speed.toFixed(2)} km/s</div>
                                <div className="humidity">Nem: {weather.main.humidity}%</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default WeatherDisplay;






