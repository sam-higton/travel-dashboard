import { Card, CardHeader, CardTitle,CardContent} from "@/components/ui/card";
import { weeklyForecast } from "@/lib/weather";
import WeatherIcon from "./weather-icon";
import React from 'react';

export default async function WeatherForecast({city}:{city:string}) {

    const {forecast}  = await weeklyForecast(city);


    return (
      <Card className="h-full">
        <CardHeader>
          <CardTitle className="text-3xl">Weather</CardTitle>
        </CardHeader>
        <CardContent className=''>
            {forecast.map(day => (
              <React.Fragment key={day.date}>
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
              </React.Fragment>
            ))}
          
        </CardContent>
      </Card>
    )
}