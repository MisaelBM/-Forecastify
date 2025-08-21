import { WeatherCard } from "@/components/weatherCard"
import { useEffect, useState } from "react";

export function DailyWeatherDisplay ({ data }) {
  if (!data.dailyWeather) return null;
  if (!data.whetherMeteo) return null;

  const [weekDays, setWeekDays] = useState({
    fullNames: [
    "Domingo",
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado"
    ],
    abrNames: [
      "Dom",
      "Seg",
      "Ter",
      "Qua",
      "Qui",
      "Sex",
      "Sab"
    ]
  })
  const [time, setTime] = useState({
    weekDay: "",
    hour: "",
    minute: ""
  })

  const getTime = () => {
    var date = new Date;
    setTime({
      weekDay: date.getDay(),
      hour: date.getHours(),
      minute: date.getMinutes()
    });
  }

  useEffect(() => {
    getTime();
  }, [])
  
  return (
    <WeatherCard title="Previsão Diária" className={`w-full min-h-[100px]`}>
      <div className="grid grid-cols-7 grid-rows-1 gap-4">
        <div className="w-full">
          <div className="day">
            <h2 className="w-full text-lg text-center">{weekDays.abrNames[time.weekDay]}</h2>
            <div className="flex justify-center items-center w-full">
              <img src={`/img/icons/big/${data.whetherMeteo.daily.data[time.weekDay != "" ? time.weekDay : 0].icon}.png`} alt="" className="w-16 h-16" />
            </div>
          </div>
        </div>
      </div>
    </WeatherCard>
  );
}