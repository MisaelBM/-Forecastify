import { WeatherCard } from "@/components/weatherCard"

export function DailyWeatherDisplay ({ data }) {
    if (!data || !data.daily) return null;
    const d = data.daily;
    
    return (
      <WeatherCard title="Previsão Diária">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr>
                <th>Dia</th>
                <th>Temp Mín (°C)</th>
                <th>Temp Máx (°C)</th>
                <th>Umidade (%)</th>
                <th>Chuva (mm)</th>
                <th>Clima</th>
              </tr>
            </thead>
            <tbody>
              {d.time.map((t, i) => (
                <tr key={t}>
                  <td>{new Date(t).toLocaleDateString("pt-BR")}</td>
                  <td>{d.temperature_2m_min[i]}</td>
                  <td>{d.temperature_2m_max[i]}</td>
                  <td>{d.relative_humidity_2m_mean[i]}</td>
                  <td>{d.precipitation_sum[i]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <details className="mt-4">
          <summary className="cursor-pointer text-blue-600">Ver todos os dados diários</summary>
          <pre className="bg-gray-100 p-2 rounded text-xs overflow-x-auto">{JSON.stringify(d, null, 2)}</pre>
        </details>
      </WeatherCard>
    );
}