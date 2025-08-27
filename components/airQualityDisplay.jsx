import { WeatherCard } from "@/components/weatherCard"
import { useEffect, useState } from "react";

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
      <WeatherCard className={`w-full`}>
        <div className="grid grid-cols-2 items-center justify-center gap-4 h-full">
          <div className="flex flex-col items-center gap-4">
            <h2 className="w-full text-lg text-center">CO2</h2>
            <div className="w-full flex gap-4 justify-center items-center">
              <img src="/img/co2.png" alt="" className="w-16 h-16" />

              <div className="flex flex-col gap-0.5 items-center">
                <span className="text-2xl">{a.current.carbon_monoxide} μg/m³</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center gap-4">
            <h2 className="w-full text-lg text-center">SO2</h2>
            <div className="w-full flex gap-4 justify-center items-center">
              <img src="/img/so2.png" alt="" className="w-16 h-16" />

              <div className="flex flex-col gap-0.5 items-center">
                <span className="text-2xl">{a.current.sulphur_dioxide} μg/m³</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center gap-4">
            <h2 className="w-full text-lg text-center">pm 2.5</h2>
            <div className="w-full flex gap-4 justify-center items-center">
              <img src="/img/particles.png" alt="" className="w-16 h-16" />

              <div className="flex flex-col gap-0.5 items-center">
                <span className="text-2xl">{a.current.pm2_5} μg/m³</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center gap-4">
            <h2 className="w-full text-lg text-center">AQI United States</h2>
            <div className="w-full flex gap-4 justify-center items-center">
              <img src="/img/airQuality.png" alt="" className="w-16 h-16" />

              <div className="flex flex-col gap-0.5 items-center">
                <span className="text-2xl">{a.current.us_aqi} AQI - US</span>
              </div>
            </div>
          </div>
        </div>
      </WeatherCard>
    )
}