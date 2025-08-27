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
      <div className="relative flex items-center w-full h-fit" key={i}>
        <div className={`w-full p-4 py-8 rounded-lg hover:bg-white/15 hover:py-12 hover:shadow-[6px_6px_12px_0_rgba(0,0,0,0.05)] hover:scale-110 duration-150 ease-in-out`}>
          <div className={`day relative flex flex-col gap-2 pb-3`}>
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
      </div>
    );
  });

  return (
    <WeatherCard title="Previsão Diária" className={`w-full max-h-[208px] p-4!`}>
      <div className="grid grid-cols-7 grid-rows-1 gap-4 items-center max-h-[176px]">
        {days}
      </div>
    </WeatherCard>
  );
}