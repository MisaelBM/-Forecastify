"use client"

import axios from "axios";
import { useEffect, useState } from "react";

import SearchBox from "../../components/searchBox";
import { CurrentWeatherDisplay } from "../../components/currentWeatherDisplay";
import { HourlyWeatherDisplay } from "../../components/hourlyWeatherDisplay";
import { DailyWeatherDisplay } from "../../components/dailyWeatherDisplay";
import { AirQualityDisplay } from "../../components/airQualityDisplay";
import { OthersDisplay } from "../../components/othersDisplay";
import { Error } from "../../components/error";
import Loading from "@/components/loading";

export function Content({ data }) {
  const [airQuality, setAirQuality] = useState(null);
  const [hourlyWeather, setHourlyWeather] = useState(null);
  const [dailyWeather, setDailyWeather] = useState(null);
  const [currentWeather, setCurrentWeather] = useState(null);
  const [weatherMeteo, setWeatherMeteo] = useState(null);
  const [mapWeather, setMapWeather] = useState(null);
  const [showError, setShowError] = useState(false);

  const [currentLocation, setCurrentLocation] = useState(null);

  const [lat, setLat] = useState(null);
  const [long, setLong] = useState(null);
  const [log, setLog] = useState(null);
  const [timezone, setTimezone] = useState(null);

  
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('lat') && urlParams.get('lon') && urlParams.get('timezone')) {
      setLat(urlParams.get('lat'));
      setLong(urlParams.get('lon'));
      setTimezone(urlParams.get('timezone'));
    }
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
      })
      .catch(function (error) {
      });
    }
  }

  const getWeatherMeteo = () => {
    if (lat && long) {
      axios.get(`https://www.meteosource.com/api/v1/free/point?lat=${lat}&lon=${long}&sections=all&timezone=${timezone}&language=en&units=metric&key=sv305jhndh1me48ticwgo0br9iwakjiinlqixule`)
        .then(function (response) {
          setWeatherMeteo(response.data);
        })
        .catch(function (error) {
        });
    }
  }

  const getHourlyWeather = () => {
    if (lat && long) {
      axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&hourly=temperature_2m,relative_humidity_2m,dew_point_2m,apparent_temperature,precipitation_probability,precipitation,rain,snow_depth,snowfall,weather_code,pressure_msl,surface_pressure,visibility,evapotranspiration,vapour_pressure_deficit,wind_speed_10m,wind_direction_10m,temperature_80m,soil_temperature_0cm&timezone=${timezone}`)
        .then(function (response) {
          setHourlyWeather(response.data);
        })
        .catch(function (error) {
        });
    }
  }

  const getDailyWeather = async() => {
    if (lat && long) {
      await axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&daily=uv_index_max,uv_index_clear_sky_max,precipitation_hours,rain_sum,sunrise,sunset,relative_humidity_2m_mean,relative_humidity_2m_max,relative_humidity_2m_min,visibility_min,visibility_max,visibility_mean,winddirection_10m_dominant,wind_speed_10m_mean,wind_gusts_10m_mean,wind_gusts_10m_min,weather_code,temperature_2m_min,temperature_2m_max,apparent_temperature_min,apparent_temperature_max,wind_speed_10m_max,wind_gusts_10m_max,wind_direction_10m_dominant,et0_fao_evapotranspiration,sunrise,daylight_duration,sunset,sunshine_duration,uv_index_max,uv_index_clear_sky_max,rain_sum,snowfall_sum,precipitation_sum,precipitation_hours,precipitation_probability_max&timezone=${timezone}`)
        .then(function (response) {
          setDailyWeather(response.data);
        })
        .catch(function (error) {
        });
    }
  }

  const getCurrentWeather = () => {
    if (lat && long) {
      axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&current=is_day,temperature_2m,relative_humidity_2m,apparent_temperature,is_day,wind_speed_10m,wind_gusts_10m,wind_direction_10m,precipitation,rain,snowfall,weather_code,showers,cloud_cover,pressure_msl,surface_pressure&timezone=${timezone}`)
        .then(function (response) {
          setCurrentWeather(response.data);
        })
        .catch(function (error) {
        });
    }
  }

  const getAirQualityWeather = () => {
    if (lat && long) {
      axios.get(`https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${lat}&longitude=${long}&current=pm2_5,carbon_monoxide,sulphur_dioxide,us_aqi`)
        .then(function (response) {
          setAirQuality(response.data);
        })
        .catch(function (error) {
        });
    }
  }

  const bg_wather = () => {
    if (dailyWeather && weatherMeteo) {
      let dateNow = new Date();
      let bg = "min-h-screen gap-16 sm:p-8 bg-cover bg-center"
      let img_bg = ""
      let weather = weatherMeteo.current.icon_num;

      // Códigos para cada tipo de clima
      const limpo = [2, 3, 4, 26, 27, 28]
      const chuva = [10, 11, 12, 13, 14, 15, 32, 33];
      const neve = [16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 34, 35, 36];
      const nublado = [5, 6, 7, 8, 9, 28, 29, 30, 31];

      const isDia = currentWeather && currentWeather.current.is_day;

      isDia == 1 ? img_bg = "dia-" : img_bg = "noite-";

      if (isDia == 1) {
        if (neve.includes(weather)) {
          bg = `min-h-screen gap-16 sm:p-8 bg-[url(/img/dia-neve.gif)] bg-cover bg-center`
        } else if (chuva.includes(weather)) {
          bg = `min-h-screen gap-16 sm:p-8 bg-[url(/img/dia-chuva.gif)] bg-cover bg-center`
        } else if (nublado.includes(weather)) {
          bg = `min-h-screen gap-16 sm:p-8 bg-[url(/img/dia-pouco-nublado.gif)] bg-cover bg-center`
        } else if (limpo.includes(weather)) {
          bg = `min-h-screen gap-16 sm:p-8 bg-[url(/img/dia-limpo.gif)] bg-cover bg-center`
        }
      } else if (isDia == 0) {
        if (neve.includes(weather)) {
          bg = `min-h-screen gap-16 sm:p-8 bg-[url(/img/noite-neve.gif)] bg-cover bg-center`
        } else if (chuva.includes(weather)) {
          bg = `min-h-screen gap-16 sm:p-8 bg-[url(/img/noite-chuva.gif)] bg-cover bg-center`
        } else if (nublado.includes(weather)) {
          bg = `min-h-screen gap-16 sm:p-8 bg-[url(/img/noite-pouco-nublado.gif)] bg-cover bg-center`
        } else if (limpo.includes(weather)) {
          bg = `min-h-screen gap-16 sm:p-8 bg-[url(/img/noite-limpo.gif)] bg-cover bg-center`
        }
      }

      // bg = `min-h-screen gap-16 sm:p-8 bg-[url(/img/${img_bg}.gif)] bg-cover bg-center`
      return bg
    }
  };

  useEffect(() => {
    getDailyWeather();
    getCurrentLocation();
    getWeatherMeteo();
    getHourlyWeather();
    getCurrentWeather();
    getAirQualityWeather();

  }, [lat, long]);

  // Timer para mostrar erro após 10 segundos se os dados não carregarem
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!currentLocation || !weatherMeteo || !hourlyWeather || !dailyWeather || !currentWeather || !airQuality) {
        setShowError(true);
      }
    }, 7500)

    return () => clearTimeout(timer);
  }, [currentLocation, weatherMeteo, hourlyWeather, dailyWeather, currentWeather, airQuality]);

  const feedback = async() => {
    // console.log(currentLocation, weatherMeteo, hourlyWeather, dailyWeather, currentWeather, airQuality)
    if (!currentLocation || !weatherMeteo || !hourlyWeather || !dailyWeather || !currentWeather || !airQuality) {
      return <Loading />
    }
  }

  useEffect(() => {
    feedback()
  }, [currentLocation, weatherMeteo, hourlyWeather, dailyWeather, currentWeather, airQuality])

  // Se mostrar erro, retorna o componente de erro
  if (showError) {
    return <Error />;
  }

  return (
    <div className={bg_wather()}>
      {(!currentLocation || !weatherMeteo || !hourlyWeather || !dailyWeather || !currentWeather || !airQuality) && <Loading />}
      <main className="flex flex-col items-center gap-[32px] row-start-2 items-center sm:items-start w-full min-h-screen max-w-screen">
        <div className="w-full px-8 pt-8">
          <SearchBox className="font-(family-name:--font-love)"/>
        </div>

        <CurrentWeatherDisplay data={{
          "weatherMeteo": weatherMeteo,
          "currentLocation": currentLocation,
          "currentWeather": currentWeather,
          "dailyWeather": dailyWeather,
        }} />

        <DailyWeatherDisplay data={{
          "whetherMeteo": weatherMeteo,
          "dailyWeather": dailyWeather,
        }} />
        <HourlyWeatherDisplay data={{
          "hourly": hourlyWeather,
          "currentWeather": currentWeather,
          "weatherMeteo": weatherMeteo,
          "dailyWeather": dailyWeather,
        }} />

        <div className="flex flex-row gap-8 w-full font-serif">
          <AirQualityDisplay data={{
            "airQuality": airQuality,
          }} />
          
          <OthersDisplay data={{
            "dailyWeather": dailyWeather
          }} />
        </div>

      </main>

      <footer className="w-full flex justify-center items-center row-start-3 text-xs text-gray-500">
        Powered by Open-Meteo • Forecastfy
      </footer>
    </div>
  );
}