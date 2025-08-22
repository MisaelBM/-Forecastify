import { WeatherCard } from "@/components/weatherCard"
import { useEffect, useState } from "react";

export function DailyWeatherDisplay ({ data }) {
  if (!data.dailyWeather) return null;
  if (!data.whetherMeteo) return null;

  const [weekDays] = useState({
    shortNames: [
      "Dom", "Seg", "Ter", "Qua","Qui", "Sex", "Sab"
    ]
  })

  const [time, setTime] = useState({
    weekDay: "",
  })

  useEffect(() => {
    const date = new Date();
    setTime({
      weekDay: date.getDay(),
    });
  }, [])

  // Cria um array de elementos JSX para cada dia
  const days = data.dailyWeather.daily.time.map((_, i) => {
    const weekDayIndex = (time.weekDay !== "" ? (time.weekDay + i) % 7 : i);
    return (
      <div className="w-full" key={i}>
        <div className={`day relative flex flex-col gap-2 pb-3 ${i == 0 && "before:bg-white/15 before:w-full before:h-[3px] before:absolute before:bottom-0"}`}>
          <h2 className="w-full text-lg text-center">{weekDays.shortNames[weekDayIndex]}</h2>
          <div className="flex justify-center items-center gap-1 w-full">
            <img src={`/img/icons/big/${data.whetherMeteo.daily.data[weekDayIndex].icon}.png`} alt="" className="w-16 h-16" />
            <div className="flex flex-col gap-0.5 items-center">
              <span className="text-xl">{data.dailyWeather.daily.temperature_2m_max[i]}°C</span>
              <span className="text-xl">{data.dailyWeather.daily.temperature_2m_min[i]}°C</span>
            </div>
          </div>
        </div>
      </div>
    );
  });

  return (
    <WeatherCard title="Previsão Diária" className={`w-full min-h-[100px]`}>
      <div className="grid grid-cols-7 grid-rows-1 gap-4">
        {days}
      </div>
    </WeatherCard>
  );
}