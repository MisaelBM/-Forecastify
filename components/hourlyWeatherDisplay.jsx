import { WeatherCard } from "@/components/weatherCard"

export function HourlyWeatherDisplay ({ data }) {
    if (!data || !data.hourly) return null;
    const h = data.hourly;
    
    return (
      <WeatherCard title="Previsão por Hora">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr>
                <th>Hora</th>
                <th>Temp (°C)</th>
                <th>Umidade (%)</th>
                <th>Chuva (%)</th>
                <th>Vento (km/h)</th>
                <th>Clima</th>
              </tr>
            </thead>
            <tbody>
              {h.time.slice(0, 12).map((t, i) => (
                <tr key={t}>
                  <td>{new Date(t).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}</td>
                  <td>{h.temperature_2m[i]}</td>
                  <td>{h.relative_humidity_2m[i]}</td>
                  <td>{h.precipitation_probability[i]}</td>
                  <td>{h.wind_speed_10m[i]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <details className="mt-4">
          <summary className="cursor-pointer text-blue-600">Ver todos os dados horários</summary>
          <pre className="bg-gray-100 p-2 rounded text-xs overflow-x-auto">{JSON.stringify(h, null, 2)}</pre>
        </details>
      </WeatherCard>
    );
}