import { Card, CardHeader, CardTitle,CardContent, CardDescription, CardAction, CardFooter} from "@/components/ui/card";
import { IconTrendingDown, IconTrendingUp, IconCloudRain, IconSun } from "@tabler/icons-react"
import { weeklyForecast } from "@/lib/weather";
import WeatherIcon from "./weather-icon";

export default async function WeatherForecast({city, daysAhead = 7}:{city:string, daysAhead?: number}) {

    const {forecast}  = await weeklyForecast('Australia/Perth');


    return (
      <Card className="h-full">
        <CardHeader>
          <CardTitle className="text-3xl">Weather</CardTitle>
        </CardHeader>
        <CardContent className=''>
            {forecast.map(day => (
              <>
              <div className="border-b-2 border-grey-500 py-3">
                <div>{day.date}</div>
                <div className="grid grid-cols-2">
                  <div className="">
                    {day.minTemperature}°C / {day.maxTemperature}°C 
                  </div>
                  <div className="text-center">
                    <WeatherIcon status={day.status} />
                  </div>
                </div>
              </div>
              </>
            ))}
          
        </CardContent>
      </Card>
    )
}