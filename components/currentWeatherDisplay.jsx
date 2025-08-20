import { WeatherCard } from "@/components/weatherCard"

export function CurrentWeatherDisplay ({ data }) {

    if (!data) return null;

    return (
      <div className="flex flex-row gap-8 w-full">
        <WeatherCard className={`w-full`}>
          <div className="flex flex-col items-center gap-4">
            <h2 className="w-full text-xl text-center">{data.weatherMeteo.current.summary}</h2>
            <div className="flex flex-row items-center gap-4">
              <img src={`/img/icons/big/${data.weatherMeteo.current.icon_num}.png`} alt="" className="w-32 h-32" />

              <div className="flex flex-col gap-1 items-center dap-4">
                <span className="text-3xl font-semibold">{data.currentWeather.current.temperature_2m}°C</span>
                <span className="text-3xl font-semibold">{data.currentWeather.current.temperature_2m * (9/5) + 32}°F</span>
              </div>

              <h3 className="w-full text-lg text-center">{data.currentLocation.result[0].address_components[1].long_name}</h3>
            </div>
          </div>
        </WeatherCard>

        <WeatherCard className={`w-full`}>
          <div className="flex items-center gap-4">
            <h2>{data.weatherMeteo.current.summary}</h2>
            <div>

            </div>
          </div>
        </WeatherCard>
      </div>
    )
}