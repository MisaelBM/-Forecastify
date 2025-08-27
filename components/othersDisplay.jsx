import { WeatherCard } from "@/components/weatherCard"
import { useEffect, useState } from "react";

export function OthersDisplay ({ data }) {

  if (!data) return null;
  if (!data.dailyWeather) return null;
  const d = data.dailyWeather.daily;

  const [time, setTime] = useState()

  useEffect(() => {
    var date = new Date;
    setTime(`${date.getHours()}:${date.getMinutes()}`);
  }, [time])

  return (
    <div className="flex flex-row gap-8 w-full font-serif">
      <WeatherCard className={`w-full`}>
          <div className="grid grid-cols-2 items-center justify-center gap-4 h-full">
            <div className="flex flex-col items-center gap-4">
              <h2 className="w-full text-lg text-center">Taxa UV máxima em céu limpo</h2>
              <div className="w-full flex gap-4 justify-center items-center">
                <img src="/img/termometro.png" alt="" className="w-16 h-16" />

                <div className="flex flex-col gap-0.5 items-center">
                  <span className="text-2xl">{d.uv_index_clear_sky_max[0]} mW/cm²</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center gap-4">
              <h2 className="w-full text-lg text-center">Taxa UV máxima</h2>
              <div className="w-full flex gap-4 justify-center items-center">
                <img src="/img/icons/small/12.png" alt="" className="w-16 h-16" />

                <div className="flex flex-col gap-0.5 items-center">
                  <span className="text-2xl">{d.uv_index_max[0]} mW/cm²</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center gap-4">
              <h2 className="w-full text-lg text-center">Horas de chuva</h2>
              <div className="w-full flex gap-4 justify-center items-center">
                <img src="/img/vento.png" alt="" className="w-16 h-16" />

                <div className="flex flex-col gap-0.5 items-center">
                  <span className="text-2xl">{d.precipitation_hours[0]} h</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center gap-4">
              <h2 className="w-full text-lg text-center">Quantidade de chuva</h2>
              <div className="w-full flex gap-4 justify-center items-center">
                <img src="/img/pressao.png" alt="" className="w-16 h-16" />

                <div className="flex flex-col gap-0.5 items-center">
                  <span className="text-2xl">{d.precipitation_sum[0]} mm</span>
                </div>
              </div>
            </div>
          </div>
      </WeatherCard>
    </div>
  )
}