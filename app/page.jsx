"use client"

import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {
  const [weather, setWeather] = useState(null);
  const [lat, setLat] = useState(null);
  const [long, setLong] = useState(null);
  const [log, setLog] = useState(null);
  const key = "sv305jhndh1me48ticwgo0br9iwakjiinlqixule"

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

  useEffect(() => {
    // Só busca se lat e long estiverem definidos
    if (lat && long) {
      axios.get(`https://www.meteosource.com/api/v1/free/point?lat=${lat}&lon=${long}&sections=all&timezone=UTC&language=en&units=metric&key=${key}`)
        .then(function (response) {
          setWeather(response.data);
        })
        .catch(function (error) {
          setLog("Erro ao buscar previsão do tempo");
        });
    }
  }, [lat, long]);

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        {log && <p>{log}</p>}

        {/* {weather && (
          <pre>{JSON.stringify(weather, null, 2)}</pre>
        )} */}
        
        {
        weather && (
          <section className="bg-white rounded-xl shadow-lg p-8 w-full max-w-2xl space-y-6">
            <h2 className="text-3xl font-bold text-blue-700 mb-4 flex items-center gap-2">
              <span>🌤️</span> Previsão do Tempo
            </h2>
            {/* Localização */}
            {weather.location && (
              <div className="mb-4">
                <h3 className="text-xl font-semibold text-gray-800 mb-1">Localização</h3>
                <p className="text-gray-600">
                  <strong>Cidade:</strong> {weather.location.name}<br />
                  <strong>País:</strong> {weather.location.country}<br />
                  <strong>Latitude:</strong> {weather.location.latitude}<br />
                  <strong>Longitude:</strong> {weather.location.longitude}
                </p>
              </div>
            )}
            {/* Condições atuais */}
            {weather.current && (
              <div className="mb-4">
                <h3 className="text-xl font-semibold text-gray-800 mb-1">Condições Atuais</h3>
                <div className="flex items-center gap-4">
                  <span className="text-5xl">
                    {weather.current.icon === "clear" ? "☀️" : weather.current.icon === "cloudy" ? "☁️" : "🌦️"}
                  </span>
                  <div>
                    <p className="text-2xl font-bold text-blue-600">{weather.current.temperature}°C</p>
                    <p className="text-gray-700 capitalize">{weather.current.summary}</p>
                    <p className="text-gray-600">
                      <strong>Umidade:</strong> {weather.current.humidity}%<br />
                      <strong>Vento:</strong> {weather.current.wind_speed} km/h
                    </p>
                  </div>
                </div>
              </div>
            )}
            {/* Previsão por hora */}
            {weather.hourly && Array.isArray(weather.hourly.data) && (
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Próximas Horas</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {weather.hourly.data.slice(0, 8).map((hour, idx) => (
                    <div key={idx} className="bg-blue-50 rounded p-2 text-center">
                      <div className="text-lg font-bold">{hour.temperature}°C</div>
                      <div className="text-sm">{hour.date.split("T")[1].slice(0,5)}</div>
                      <div>{hour.icon === "clear" ? "☀️" : hour.icon === "cloudy" ? "☁️" : "🌦️"}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {/* Previsão diária */}
            {weather.daily && Array.isArray(weather.daily.data) && (
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Próximos Dias</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {weather.daily.data.slice(0, 5).map((day, idx) => (
                    <div key={idx} className="bg-yellow-50 rounded p-3 text-center">
                      <div className="font-bold">{new Date(day.day).toLocaleDateString()}</div>
                      <div className="text-lg">{day.temperature_min}°C - {day.temperature_max}°C</div>
                      <div>{day.icon === "clear" ? "☀️" : day.icon === "cloudy" ? "☁️" : "🌦️"}</div>
                      <div className="text-sm text-gray-600">{day.summary}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {/* Outros dados */}
            <details className="mt-6">
              <summary className="cursor-pointer text-blue-600 font-semibold">Ver todos os dados brutos</summary>
              <pre className="bg-gray-100 rounded p-2 text-xs mt-2 overflow-x-auto">{JSON.stringify(weather, null, 2)}</pre>
            </details>
          </section>
        )
        }
      </main>
    </div>
  );
}