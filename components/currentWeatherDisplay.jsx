import { WeatherCard } from "@/components/weatherCard"
import { useEffect, useState } from "react";

export function CurrentWeatherDisplay ({ data }) {

    if (!data) return null;
    if (!data.weatherMeteo) return null;
    if (!data.currentLocation) return null;
    if (!data.currentWeather) return null;
    if (!data.dailyWeather) return null;

    const [time, setTime] = useState()

    useEffect(() => {
      var date = new Date;
      setTime(`${date.getHours()}:${`${date.getMinutes()}`.padStart(2, "0")}`);
    }, [time])

    return (
      <div className="flex flex-row gap-8 w-full font-serif">
        {/* {console.log("data", data.weatherMeteo)} */}
        <WeatherCard className={`w-full`}>
          <div className="flex flex-col items-center gap-8">
            <h2 className="w-full text-xl text-center">{data.weatherMeteo.current.summary}</h2>
            
            <div className="flex flex-row items-center gap-8">
              <img src={`/img/icons/big/${data.weatherMeteo.current.icon_num}.png`} alt="" className="w-48 h-48" />
              
              <div className="flex flex-col gap-1 items-center dap-4">
                <span className="text-4xl font-semibold">{(data.currentWeather.current.temperature_2m).toFixed(1)}°C</span>
                <span className="text-4xl font-semibold">{(data.currentWeather.current.temperature_2m * (9/5) + 32).toFixed(1)}°F</span>
              </div>
            </div>

            <h3 className="w-full text-lg text-center capitalize">{data.currentLocation.result[0].address_components[1].long_name} - {time}</h3>
          </div>
        </WeatherCard>

        <WeatherCard className={`w-full`}>
          <div className="grid grid-cols-2 items-center justify-center gap-4 h-full">
            <div className="flex flex-col items-center gap-4">
              <h2 className="w-full text-lg text-center">Sensassão térmica</h2>
              <div className="w-full flex gap-4 justify-center items-center">
                <img src="/img/termometro.png" alt="" className="w-16 h-16" />

                <div className="flex flex-col gap-0.5 items-center">
                  <span className="text-2xl">{data.currentWeather.current.apparent_temperature} C°</span>
                  <span className="text-2xl">{(data.currentWeather.current.apparent_temperature * (9/5) + 32).toFixed(1)} F°</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center gap-4">
              <h2 className="w-full text-lg text-center">Probabilidade de chuva</h2>
              <div className="w-full flex gap-4 justify-center items-center">
                <img src="/img/icons/small/12.png" alt="" className="w-16 h-16" />

                <div className="flex flex-col gap-0.5 items-center">
                  <span className="text-2xl">{data.dailyWeather.daily.precipitation_probability_max[0]} %</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center gap-4">
              <h2 className="w-full text-lg text-center">Velocidade do vento</h2>
              <div className="w-full flex gap-4 justify-center items-center">
                <img src="/img/vento.png" alt="" className="w-16 h-16" />

                <div className="flex flex-col gap-0.5 items-center">
                  <span className="text-2xl">{data.currentWeather.current.wind_speed_10m} km/h</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center gap-4">
              <h2 className="w-full text-lg text-center">Pressão atmosférica</h2>
              <div className="w-full flex gap-4 justify-center items-center">
                <img src="/img/pressao.png" alt="" className="w-16 h-16" />

                <div className="flex flex-col gap-0.5 items-center">
                  <span className="text-2xl">{data.currentWeather.current.surface_pressure} hPa</span>
                </div>
              </div>
            </div>
          </div>
        </WeatherCard>
      </div>
    )
}