import { WeatherCard } from "@/components/weatherCard"
import { useEffect, useState } from "react";
import { NumberTicker } from "@/components/magicui/number-ticker";

export function AirQualityDisplay ({ data }) {

    if (!data) return null;
    if (!data.airQuality) return null;
    const a = data.airQuality;

    const [time, setTime] = useState()

    useEffect(() => {
      var date = new Date;
      setTime(`${date.getHours()}:${date.getMinutes()}`);
    }, [time])

    return (
      <WeatherCard className="w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 h-full">
          <div className="flex flex-col items-center gap-2 sm:gap-4">
            <h2 className="w-full text-lg text-center">CO2</h2>
            <div className="w-full flex flex-col sm:flex-row gap-2 sm:gap-4 justify-center items-center">
              <img src="/img/co2.png" alt="" className="w-12 h-12 sm:w-16 sm:h-16" />

              <div className="flex flex-col gap-0.5 items-center">
                <span className="text-lg sm:text-2xl">
                  <NumberTicker
                    value={a.current.carbon_monoxide}
                    decimalPlaces={1}
                  />
                  μg/m³
                  </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center gap-2 sm:gap-4">
            <h2 className="w-full text-lg text-center">SO2</h2>
            <div className="w-full flex flex-col sm:flex-row gap-2 sm:gap-4 justify-center items-center">
              <img src="/img/so2.png" alt="" className="w-12 h-12 sm:w-16 sm:h-16" />

              <div className="flex flex-col gap-0.5 items-center">
                <span className="text-lg sm:text-2xl">
                  <NumberTicker
                    value={a.current.sulphur_dioxide}
                    decimalPlaces={1}
                  />
                  μg/m³
                  </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center gap-2 sm:gap-4">
            <h2 className="w-full text-lg text-center">pm 2.5</h2>
            <div className="w-full flex flex-col sm:flex-row gap-2 sm:gap-4 justify-center items-center">
              <img src="/img/particles.png" alt="" className="w-12 h-12 sm:w-16 sm:h-16" />

              <div className="flex flex-col gap-0.5 items-center">
                <span className="text-lg sm:text-2xl">
                  <NumberTicker
                    value={a.current.pm2_5}
                    decimalPlaces={1}
                  />
                  μg/m³
                  </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center gap-2 sm:gap-4">
            <h2 className="w-full text-lg text-center">AQI United States</h2>
            <div className="w-full flex flex-col sm:flex-row gap-2 sm:gap-4 justify-center items-center">
              <img src="/img/airQuality.png" alt="" className="w-12 h-12 sm:w-16 sm:h-16" />

              <div className="flex flex-col gap-0.5 items-center">
                <span className="text-lg sm:text-2xl">
                  <NumberTicker
                    value={a.current.us_aqi}
                    decimalPlaces={1}
                  />
                  AQI - US
                  </span>
              </div>
            </div>
          </div>
        </div>
      </WeatherCard>
    )
}