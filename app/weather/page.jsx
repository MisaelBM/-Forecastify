"use client"

import axios from "axios";
import { useEffect, useState } from "react";
import SearchBox from "../../components/searchBox";
import { CurrentWeatherDisplay } from "../../components/currentWeatherDisplay";
import { HourlyWeatherDisplay } from "../../components/hourlyWeatherDisplay";
import { DailyWeatherDisplay } from "../../components/dailyWeatherDisplay";

export default function Weather() {
  const [hourlyWeather, setHourlyWeather] = useState(null);
  const [dailyWeather, setDailyWeather] = useState(null);
  const [currentWeather, setCurrentWeather] = useState(null);
  const [weatherMeteo, setWeatherMeteo] = useState(null);

  const [currentLocation, setCurrentLocation] = useState(null);

  const [lat, setLat] = useState(null);
  const [long, setLong] = useState(null);
  const [log, setLog] = useState(null);

  useEffect(() => {
    // Função para obter a localização atual do usuário
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setLat(position.coords.latitude);
            setLong(position.coords.longitude);
            setLog(null);
          },
          (err) => {
            setLog("Não foi possível obter sua localização");
          }
        );
      } else {
        setLog("Geolocalização não é suportada pelo seu navegador");
      }
    };

    getLocation();
  }, []);

  /**
   * reference: https://open-meteo.com/en/docs
   */

  const getCurrentLocation = () => {
    if (lat && long) {
      axios.post(`https://api.distancematrix.ai/maps/api/geocode/json?latlng=${lat},${long}&language=pt&key=uG9qq1JK6Go7Su0zjDjNFwOorVzWJyR2vRCSIqxPtDQKGTZKPQU6r68Hv6RQAriF`, {
        headers: {
          "Access-Control-Allow-Headers": "*"
        }
      })
      .then(function (response) {
        setCurrentLocation(response.data);
        console.log(response.data)
      })
      .catch(function (error) {
        console.log(error)
      });
    }
  }

  const getWeatherMeteo = () => {
    if (lat && long) {
      axios.get(`https://www.meteosource.com/api/v1/free/point?lat=${lat}&lon=${long}&sections=all&timezone=UTC&language=en&units=metric&key=sv305jhndh1me48ticwgo0br9iwakjiinlqixule`)
        .then(function (response) {
          setWeatherMeteo(response.data);
          console.log(response.data)
        })
        .catch(function (error) {
          console.log(error)
        });
    }
  }

  const getHourlyWeather = () => {
    if (lat && long) {
      axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&hourly=temperature_2m,relative_humidity_2m,dew_point_2m,precipitation_probability,precipitation,rain,snow_depth,snowfall,weather_code,pressure_msl,surface_pressure,visibility,evapotranspiration,vapour_pressure_deficit,wind_speed_10m,wind_direction_10m,temperature_80m,soil_temperature_0cm&timezone=America%2FSao_Paulo`)
        .then(function (response) {
          setHourlyWeather(response.data);
          console.log(response.data)
        })
        .catch(function (error) {
          console.log(error)
        });
    }
  }

  const getDailyWeather = () => {
    if (lat && long) {
      axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&daily=relative_humidity_2m_mean,relative_humidity_2m_max,relative_humidity_2m_min,visibility_min,visibility_max,visibility_mean,winddirection_10m_dominant,wind_speed_10m_mean,wind_gusts_10m_mean,wind_gusts_10m_min,weather_code,temperature_2m_min,temperature_2m_max,apparent_temperature_min,apparent_temperature_max,wind_speed_10m_max,wind_gusts_10m_max,wind_direction_10m_dominant,et0_fao_evapotranspiration,sunrise,daylight_duration,sunset,sunshine_duration,uv_index_max,uv_index_clear_sky_max,rain_sum,snowfall_sum,precipitation_sum,precipitation_hours,precipitation_probability_max&timezone=America%2FSao_Paulo`)
        .then(function (response) {
          setDailyWeather(response.data);
          console.log(response.data)
        })
        .catch(function (error) {
          console.log(error)
        });
    }
  }

  const getCurrentWeather = () => {
    if (lat && long) {
      axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,wind_speed_10m,wind_gusts_10m,wind_direction_10m,precipitation,rain,snowfall,weather_code,showers,cloud_cover,pressure_msl,surface_pressure&timezone=America%2FSao_Paulo`)
        .then(function (response) {
          setCurrentWeather(response.data);
          console.log(response.data)
        })
        .catch(function (error) {
          console.log(error)
        });
    }
  }

  useEffect(() => {
    
    getCurrentLocation();
    getWeatherMeteo();
    getHourlyWeather();
    getDailyWeather();
    getCurrentWeather();

  }, [lat, long]);

  return (
    <div className="min-h-screen gap-16 sm:p-8 bg-[url('/img/dia-verao.gif')] bg-cover bg-center">
      <main className="flex flex-col items-center gap-[32px] row-start-2 items-center sm:items-start w-full min-h-screen max-w-screen">
        <div className="w-full px-8 pt-8">
          <SearchBox className="font-(family-name:--font-love)"/>
        </div>

        <CurrentWeatherDisplay data={{
          "currentWeather": currentWeather,
          "weatherMeteo": weatherMeteo,
          "currentLocation": currentLocation
        }} />
        <HourlyWeatherDisplay data={hourlyWeather} />
        <DailyWeatherDisplay data={dailyWeather} />
      </main>

      <footer className="w-full flex justify-center items-center row-start-3 text-xs text-gray-500">
        Powered by Open-Meteo • Forecastfy
      </footer>
    </div>
  );
}