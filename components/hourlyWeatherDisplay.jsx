"use client"
import { WeatherCard } from "@/components/weatherCard"
import { NumberTicker } from "@/components/magicui/number-ticker";

import { TrendingUp } from "lucide-react"
import { CartesianGrid, LabelList, Line, LineChart, XAxis } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { useEffect } from "react"

export function HourlyWeatherDisplay ({ data }) {
  if (!data || !data.hourly || !data.weatherMeteo || !data.currentWeather || !data.dailyWeather) return null;
  const h = data.hourly.hourly;
  const w = data.weatherMeteo;
  const c = data.currentWeather;
  const d = data.dailyWeather;

  const chartConfig = {
    temp: {
      label: "Temperatura",
      color: "var(--chart-1)",
    },
    aparentTemp: {
      label: "Sensação",
      color: "var(--chart-2)",
    },
  }
  const chartData = []

  const currentHour = Number(c.current.time.split("T")[1].split(":")[0]);

  // Ajusta o array para começar da hora atual
  for (let i = 0; i < 24; i++) {
    const hourIndex = (currentHour + i) % 24;
    chartData.push({
      hour: `${hourIndex.toString().padStart(2, '0')}:00`,
      temp: h.temperature_2m[hourIndex],
      aparentTemp: h.apparent_temperature[hourIndex],
    });
  }

  return (
    <WeatherCard className="w-full">
      <Card className="bg-white/15 border-none">
        <CardHeader className="relative flex gap-4 justify-between">
          <div className="">
            <CardTitle>Temperatura e Sensação Térmica</CardTitle>
            <CardDescription>Próximas 24 horas</CardDescription>
          </div>

          <div>
            <div className="flex flex-row items-center gap-8">
              <img src={`/img/icons/big/${w.current.icon_num}.png`} alt="" className="w-32 h-32" />
              
              <div className="flex flex-col items-center dap-4">
                <span className="text-xl">
                  <NumberTicker
                    value={(data.currentWeather.current.temperature_2m).toFixed(1)}
                    decimalPlaces={1}
                  />
                  °C
                </span>
                <span className="text-xl">
                  <NumberTicker
                    value={(data.currentWeather.current.temperature_2m * (9/5) + 32).toFixed(1)}
                    decimalPlaces={1}
                  />
                  °F
                </span>
              </div>

              <div className="flex flex-col items-start dap-4">
                <span className="text-md">Chuva:&nbsp;
                  <NumberTicker
                    value={d.daily.precipitation_probability_max[0]}
                    decimalPlaces={1}
                  />
                  %
                </span>
                <span className="text-md">Umidade:&nbsp;
                  <NumberTicker
                    value={c.current.relative_humidity_2m}
                    decimalPlaces={1}
                  />
                  %
                </span>
                <span className="text-md">Vento: &nbsp;
                  <NumberTicker
                    value={c.current.wind_speed_10m}
                    decimalPlaces={1}
                  /> km/h | 
                  <NumberTicker
                    value={c.current.wind_direction_10m}
                    decimalPlaces={1}
                  />
                  °</span>
              </div>
            </div>
          </div>

          <div className="opacity-0">
            <CardTitle>Temperatura e Sensação Térmica</CardTitle>
            <CardDescription>Próximas 24 horas</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="max-h-[250px] w-full">
            <LineChart
              accessibilityLayer
              data={chartData}
              margin={{
                top: 20,
                left: 12,
                right: 12,
              }}
              
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="hour"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value.slice(0, 5)}
                interval={0}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="line" />}
              />
              <Line
                dataKey="temp"
                type="natural"
                stroke="#F54900"
                strokeWidth={2}
                dot={false}
                activeDot={{
                  r: 6,
                }}
              >
              </Line>
              
              <Line
                dataKey="aparentTemp"
                type="natural"
                stroke="#009689"
                strokeWidth={2}
                dot={false}
                activeDot={{
                  r: 6,
                }}
              >
              </Line>
            </LineChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="flex-col items-start gap-2 text-sm">
        </CardFooter>
      </Card>
    </WeatherCard>
  );
}