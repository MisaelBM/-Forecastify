"use client"

import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {
  const [hourlyWeather, setHourlyWeather] = useState(null);
  const [dailyWeather, setDailyWeather] = useState(null);
  const [currentWeather, setCurrentWeather] = useState(null);
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

  useEffect(() => {
    // As variáveis usadas podem ser conferidas nos endpoints usados
    if (lat && long) {
      axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&hourly=temperature_2m,relative_humidity_2m,dew_point_2m,precipitation_probability,precipitation,rain,snow_depth,snowfall,weather_code,pressure_msl,surface_pressure,visibility,evapotranspiration,vapour_pressure_deficit,wind_speed_10m,wind_direction_10m,temperature_80m,soil_temperature_0cm&timezone=America%2FSao_Paulo`)
        .then(function (response) {
          setHourlyWeather(response.data);
          setLog(null);
        })
        .catch(function (error) {
          setLog("Erro ao buscar previsão do tempo");
        });
    }
  }, [lat, long]);

  useEffect(() => {
    // As variáveis usadas podem ser conferidas nos endpoints usados
    if (lat && long) {
      axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&daily=relative_humidity_2m_mean,relative_humidity_2m_max,relative_humidity_2m_min,visibility_min,visibility_max,visibility_mean,winddirection_10m_dominant,wind_speed_10m_mean,wind_gusts_10m_mean,wind_gusts_10m_min,weather_code,temperature_2m_min,temperature_2m_max,apparent_temperature_min,apparent_temperature_max,wind_speed_10m_max,wind_gusts_10m_max,wind_direction_10m_dominant,et0_fao_evapotranspiration,sunrise,daylight_duration,sunset,sunshine_duration,uv_index_max,uv_index_clear_sky_max,rain_sum,snowfall_sum,precipitation_sum,precipitation_hours,precipitation_probability_max&timezone=America%2FSao_Paulo`)
        .then(function (response) {
          setDailyWeather(response.data);
          setLog(null);
        })
        .catch(function (error) {
          setLog("Erro ao buscar previsão do tempo");
        });
    }
  }, [lat, long]);

  useEffect(() => {
    // As variáveis usadas podem ser conferidas nos endpoints usados
    if (lat && long) {
      axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,wind_speed_10m,wind_gusts_10m,wind_direction_10m,precipitation,rain,snowfall,weather_code,showers,cloud_cover,pressure_msl,surface_pressure&timezone=America%2FSao_Paulo`)
        .then(function (response) {
          setCurrentWeather(response.data);
          setLog(null);
        })
        .catch(function (error) {
          setLog("Erro ao buscar previsão do tempo");
        });
    }
  }, [lat, long]);

  // Ícones simples para clima
  const weatherIcons = {
    0: "☀️", 1: "🌤️", 2: "⛅", 3: "☁️", 45: "🌫️", 48: "🌫️", 51: "🌦️", 61: "🌧️", 71: "🌨️", 80: "🌦️", 95: "⛈️"
  };

  function WeatherCard({ title, children }) {
    return (
      <div className="bg-white/80 rounded-xl shadow-lg p-6 mb-6 w-full max-w-2xl">
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        {children}
      </div>
    );
  }

  function CurrentWeatherDisplay({ data }) {
    if (!data || !data.current) return null;
    const c = data.current;
    return (
      <WeatherCard title="Tempo Atual">
        <div className="flex items-center gap-4">
          <span className="text-5xl">{weatherIcons[c.weather_code] || "🌡️"}</span>
          <div>
            <div className="text-3xl font-semibold">{c.temperature_2m}°C</div>
            <div>Sensação: {c.apparent_temperature}°C</div>
            <div>Umidade: {c.relative_humidity_2m}%</div>
            <div>Vento: {c.wind_speed_10m} km/h</div>
            <div>Direção do vento: {c.wind_direction_10m}°</div>
            <div>Pressão: {c.pressure_msl} hPa</div>
            <div>Chuva: {c.rain} mm</div>
            <div>Nuvens: {c.cloud_cover}%</div>
            <div>Dia: {c.is_day ? "Sim" : "Não"}</div>
          </div>
        </div>
        <details className="mt-4">
          <summary className="cursor-pointer text-blue-600">Ver todos os dados atuais</summary>
          <pre className="bg-gray-100 p-2 rounded text-xs overflow-x-auto">{JSON.stringify(c, null, 2)}</pre>
        </details>
      </WeatherCard>
    );
  }

  function HourlyWeatherDisplay({ data }) {
    if (!data || !data.hourly) return null;
    const h = data.hourly;
    return (
      <WeatherCard title="Previsão por Hora">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr>
                <th>Hora</th>
                <th>Temp (°C)</th>
                <th>Umidade (%)</th>
                <th>Chuva (%)</th>
                <th>Vento (km/h)</th>
                <th>Clima</th>
              </tr>
            </thead>
            <tbody>
              {h.time.slice(0, 12).map((t, i) => (
                <tr key={t}>
                  <td>{new Date(t).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}</td>
                  <td>{h.temperature_2m[i]}</td>
                  <td>{h.relative_humidity_2m[i]}</td>
                  <td>{h.precipitation_probability[i]}</td>
                  <td>{h.wind_speed_10m[i]}</td>
                  <td>{weatherIcons[h.weather_code[i]] || "🌡️"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <details className="mt-4">
          <summary className="cursor-pointer text-blue-600">Ver todos os dados horários</summary>
          <pre className="bg-gray-100 p-2 rounded text-xs overflow-x-auto">{JSON.stringify(h, null, 2)}</pre>
        </details>
      </WeatherCard>
    );
  }

  function DailyWeatherDisplay({ data }) {
    if (!data || !data.daily) return null;
    const d = data.daily;
    return (
      <WeatherCard title="Previsão Diária">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr>
                <th>Dia</th>
                <th>Temp Mín (°C)</th>
                <th>Temp Máx (°C)</th>
                <th>Umidade (%)</th>
                <th>Chuva (mm)</th>
                <th>Clima</th>
              </tr>
            </thead>
            <tbody>
              {d.time.map((t, i) => (
                <tr key={t}>
                  <td>{new Date(t).toLocaleDateString("pt-BR")}</td>
                  <td>{d.temperature_2m_min[i]}</td>
                  <td>{d.temperature_2m_max[i]}</td>
                  <td>{d.relative_humidity_2m_mean[i]}</td>
                  <td>{d.precipitation_sum[i]}</td>
                  <td>{weatherIcons[d.weather_code[i]] || "🌡️"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <details className="mt-4">
          <summary className="cursor-pointer text-blue-600">Ver todos os dados diários</summary>
          <pre className="bg-gray-100 p-2 rounded text-xs overflow-x-auto">{JSON.stringify(d, null, 2)}</pre>
        </details>
      </WeatherCard>
    );
  }

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 bg-gradient-to-br from-blue-200 via-blue-100 to-yellow-100">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start w-full max-w-3xl">
        {log && <p className="text-red-600 font-semibold">{log}</p>}
        <CurrentWeatherDisplay data={currentWeather} />
        <HourlyWeatherDisplay data={hourlyWeather} />
        <DailyWeatherDisplay data={dailyWeather} />
      </main>
      <footer className="row-start-3 text-xs text-gray-500">
        Powered by Open-Meteo • Forecastfy
      </footer>
    </div>
  );
}