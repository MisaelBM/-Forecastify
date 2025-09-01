import { WeatherCard } from "@/components/weatherCard"
import { useEffect, useState } from "react";
import { NumberTicker } from "@/components/magicui/number-ticker";

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
  <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 w-full font-serif">
  <WeatherCard className="w-full">
          <div className="flex flex-col items-center gap-4 sm:gap-8">
            <h2 className="w-full text-xl text-center">{data.weatherMeteo.current.summary}</h2>
            
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8">
              <img src={`/img/icons/big/${data.weatherMeteo.current.icon_num}.png`} alt="" className="w-32 h-32 sm:w-48 sm:h-48" />
              
              <div className="flex flex-col gap-1 items-center dap-4">
                <span className="text-2xl sm:text-4xl font-semibold">
                  <NumberTicker
                    value={(data.currentWeather.current.temperature_2m).toFixed(1)}
                    decimalPlaces={1}
                  />
                  °C
                  </span>
                <span className="text-2xl sm:text-4xl font-semibold">
                  <NumberTicker
                    value={(data.currentWeather.current.temperature_2m * (9/5) + 32).toFixed(1)}
                    decimalPlaces={1}
                  />
                  °F
                </span>
              </div>
            </div>

            <h3 className="w-full text-base sm:text-lg text-center capitalize">
              {data.currentLocation.result[0].formatted_address.split(' ')[1]}
              &nbsp;{data.currentLocation.result[0].formatted_address.split(' ')[2] != undefined && data.currentLocation.result[0].formatted_address.split(' ')[2]}
              &nbsp;{data.currentLocation.result[0].formatted_address.split(' ')[3] != undefined && data.currentLocation.result[0].formatted_address.split(' ')[3]}
              &nbsp;{data.currentLocation.result[0].formatted_address.split(' ')[4] != undefined && data.currentLocation.result[0].formatted_address.split(' ')[4]}
              &nbsp;{data.currentLocation.result[0].formatted_address.split(' ')[5] != undefined && data.currentLocation.result[0].formatted_address.split(' ')[5]}
              &nbsp;{data.currentLocation.result[0].formatted_address.split(' ')[6] != undefined && data.currentLocation.result[0].formatted_address.split(' ')[6]}
              &nbsp;- {data.currentWeather.timezone == Intl.DateTimeFormat().resolvedOptions().timeZone ? time : `${data.currentWeather.current.time.split('T')[1].split(':')[0]}:${data.currentWeather.current.time.split('T')[1].split(':')[1]}`}
            </h3>
          </div>
        </WeatherCard>

  <WeatherCard className="w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 h-full">
            <div className="flex flex-col items-center gap-2 sm:gap-4">
              <h2 className="w-full text-lg text-center">Sensassão térmica</h2>
              <div className="w-full flex flex-col sm:flex-row gap-2 sm:gap-4 justify-center items-center">
                <img src="/img/termometro.png" alt="" className="w-12 h-12 sm:w-16 sm:h-16" />

                <div className="flex flex-col gap-0.5 items-center">
                  <span className="text-lg sm:text-2xl">
                    <NumberTicker
                      value={(data.currentWeather.current.apparent_temperature).toFixed(1)}
                      decimalPlaces={1}
                    />
                    C°
                    </span>
                  <span className="text-lg sm:text-2xl">
                    <NumberTicker
                      value={(data.currentWeather.current.apparent_temperature * (9/5) + 32).toFixed(1)}
                      decimalPlaces={1}
                    />
                    F°
                    </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center gap-2 sm:gap-4">
              <h2 className="w-full text-lg text-center">Probabilidade de chuva</h2>
              <div className="w-full flex flex-col sm:flex-row gap-2 sm:gap-4 justify-center items-center">
                <img src="/img/icons/small/12.png" alt="" className="w-12 h-12 sm:w-16 sm:h-16" />

                <div className="flex flex-col gap-0.5 items-center">
                  <span className="text-lg sm:text-2xl">
                    <NumberTicker
                      value={data.dailyWeather.daily.precipitation_probability_max[0]}
                      decimalPlaces={1}
                    />
                    %
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center gap-2 sm:gap-4">
              <h2 className="w-full text-lg text-center">Velocidade do vento</h2>
              <div className="w-full flex flex-col sm:flex-row gap-2 sm:gap-4 justify-center items-center">
                <img src="/img/vento.png" alt="" className="w-12 h-12 sm:w-16 sm:h-16" />

                <div className="flex flex-col gap-0.5 items-center">
                  <span className="text-lg sm:text-2xl">
                    <NumberTicker
                      value={data.currentWeather.current.wind_speed_10m}
                      decimalPlaces={1}
                    />
                    km/h
                    </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center gap-2 sm:gap-4">
              <h2 className="w-full text-lg text-center">Pressão atmosférica</h2>
              <div className="w-full flex flex-col sm:flex-row gap-2 sm:gap-4 justify-center items-center">
                <img src="/img/pressao.png" alt="" className="w-12 h-12 sm:w-16 sm:h-16" />

                <div className="flex flex-col gap-0.5 items-center">
                  <span className="text-lg sm:text-2xl">
                    <NumberTicker
                      value={data.currentWeather.current.surface_pressure}
                      decimalPlaces={1}
                    />
                    hPa
                    </span>
                </div>
              </div>
            </div>
          </div>
        </WeatherCard>
      </div>
    )
}