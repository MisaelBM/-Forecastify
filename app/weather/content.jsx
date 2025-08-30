"use client"

import axios from "axios";
import { useEffect, useState, useRef } from "react";

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
      axios.post(`https://api.distancematrix.ai/maps/api/geocode/json?latlng=${lat},${long}&language=pt&key=3XYevK6WsUpTffefIybIxjJXyG3GpDFjgh40FiXxqhBO6UvdgKVD4mjSDAjjtH3p`, {
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
          bg = `min-h-screen gap-16 sm:p-8 sm:pb-24 bg-[url(/img/dia-neve.gif)] bg-cover bg-center`
        } else if (chuva.includes(weather)) {
          bg = `min-h-screen gap-16 sm:p-8 sm:pb-24 bg-[url(/img/dia-chuva.gif)] bg-cover bg-center`
        } else if (nublado.includes(weather)) {
          bg = `min-h-screen gap-16 sm:p-8 sm:pb-24 bg-[url(/img/dia-pouco-nublado.gif)] bg-cover bg-center`
        } else if (limpo.includes(weather)) {
          bg = `min-h-screen gap-16 sm:p-8 sm:pb-24 bg-[url(/img/dia-limpo.gif)] bg-cover bg-center`
        }
      } else if (isDia == 0) {
        if (neve.includes(weather)) {
          bg = `min-h-screen gap-16 sm:p-8 sm:pb-24 bg-[url(/img/noite-neve.gif)] bg-cover bg-center text-gray-300!`
        } else if (chuva.includes(weather)) {
          bg = `min-h-screen gap-16 sm:p-8 sm:pb-24 bg-[url(/img/noite-chuva.gif)] bg-cover bg-center text-gray-300!`
        } else if (nublado.includes(weather)) {
          bg = `min-h-screen gap-16 sm:p-8 sm:pb-24 bg-[url(/img/noite-pouco-nublado.gif)] bg-cover bg-center text-gray-300!`
        } else if (limpo.includes(weather)) {
          bg = `min-h-screen gap-16 sm:p-8 sm:pb-24 bg-[url(/img/noite-limpo.gif)] bg-cover bg-center text-gray-300!`
        }
      }

      if (currentLocation.result[0].formatted_address.search("Ucrânia") != -1) {
        bg = `min-h-screen gap-16 sm:p-8 bg-[url(/img/battlefield2042-2042.gif)] bg-cover bg-center text-gray-300!`
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
    <div>
      {(!currentLocation || !weatherMeteo || !hourlyWeather || !dailyWeather || !currentWeather || !airQuality) && <Loading />}
      <div className={bg_wather() + " relative"}>
        <main className="">
          <div className="flex flex-col items-center gap-[32px] row-start-2 items-center sm:items-start w-full min-h-screen max-w-screen">
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
          </div>
        </main>
        <footer className="w-full flex justify-center items-center row-start-3 text-xs text-gray-500">
          Powered by Open-Meteo • Forecastfy
        </footer>
        <div className="absolute bottom-0 left-0 flex justify-center w-screen h-[70px] bottom-0 bg-[url(/img/cloud5.png)]"></div>
      </div>
      <div className="w-full bg-gradient-to-b from-gray-900 to-gray-800">
        <div className="flex justify-center w-screen h-[70px] bottom-0 bg-[url(/img/cloud5.png)] rotate-180"></div>
        
        {/* Seção de Equipe */}
        <div className="max-w-7xl mx-auto px-8 py-24">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4 font-['Love_Ya_Like_A_Sister']">
              Nossa Equipe
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Conheça os desenvolvedores e designers por trás do Forecastfy
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Hugo */}
            <div className="group">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center transition-all duration-300 hover:bg-white/20 hover:scale-105 hover:shadow-2xl border border-white/20">
                <div className="relative mb-6">
                  <img 
                    src="/img/hugo.jpeg" 
                    alt="Hugo Otávio" 
                    className="w-24 h-24 rounded-full mx-auto object-cover border-4 border-white/30 shadow-lg transition-transform duration-300 group-hover:scale-110" 
                  />
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <h3 className="text-xl font-bold text-white mb-2 font-['Love_Ya_Like_A_Sister']">
                  Hugo Otávio
                </h3>
                <p className="text-blue-300 font-medium">Desenvolvedor</p>
                <div className="mt-4 pt-4 border-t border-white/20">
                  <p className="text-sm text-gray-300">
                    Full-stack developer apaixonado por criar experiências únicas
                  </p>
                </div>
              </div>
            </div>

            {/* Julio */}
            <div className="group">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center transition-all duration-300 hover:bg-white/20 hover:scale-105 hover:shadow-2xl border border-white/20">
                <div className="relative mb-6">
                  <img 
                    src="/img/julio.jpeg" 
                    alt="Julio César" 
                    className="w-24 h-24 rounded-full mx-auto object-cover border-4 border-white/30 shadow-lg transition-transform duration-300 group-hover:scale-110" 
                  />
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-green-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <h3 className="text-xl font-bold text-white mb-2 font-['Love_Ya_Like_A_Sister']">
                  Julio César
                </h3>
                <p className="text-green-300 font-medium">Desenvolvedor</p>
                <div className="mt-4 pt-4 border-t border-white/20">
                  <p className="text-sm text-gray-300">
                    Especialista em APIs e integrações de dados meteorológicos
                  </p>
                </div>
              </div>
            </div>

            {/* Samuel */}
            <div className="group">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center transition-all duration-300 hover:bg-white/20 hover:scale-105 hover:shadow-2xl border border-white/20">
                <div className="relative mb-6">
                  <img 
                    src="/img/samuel.jpeg" 
                    alt="Samuel Zanini" 
                    className="w-24 h-24 rounded-full mx-auto object-cover border-4 border-white/30 shadow-lg transition-transform duration-300 group-hover:scale-110" 
                  />
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <h3 className="text-xl font-bold text-white mb-2 font-['Love_Ya_Like_A_Sister']">
                  Samuel Zanini
                </h3>
                <p className="text-purple-300 font-medium">Design</p>
                <div className="mt-4 pt-4 border-t border-white/20">
                  <p className="text-sm text-gray-300">
                    Criativo visual focado em UX/UI e experiências imersivas
                  </p>
                </div>
              </div>
            </div>

            {/* Misael */}
            <div className="group">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center transition-all duration-300 hover:bg-white/20 hover:scale-105 hover:shadow-2xl border border-white/20">
                <div className="relative mb-6">
                  <img 
                    src="/img/misael.jpeg" 
                    alt="Misael Bonifácel" 
                    className="w-24 h-24 rounded-full mx-auto object-cover border-4 border-white/30 shadow-lg transition-transform duration-300 group-hover:scale-110" 
                  />
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-500/20 to-red-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <h3 className="text-xl font-bold text-white mb-2 font-['Love_Ya_Like_A_Sister']">
                  Misael Bonifácel
                </h3>
                <p className="text-orange-300 font-medium">Desenvolvedor</p>
                <div className="mt-4 pt-4 border-t border-white/20">
                  <p className="text-sm text-gray-300">
                    Desenvolvedor front-end com foco em performance e acessibilidade
                  </p>
                </div>
              </div>
          </div>
          </div>

          {/* Footer da seção */}
          <div className="text-center mt-16 pt-8 border-t border-white/20">
            <p className="text-gray-400 text-sm">
              Juntos criamos uma experiência meteorológica única e intuitiva
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}