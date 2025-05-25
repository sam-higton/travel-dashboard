'use client';

import { Card, CardHeader, CardTitle,CardContent} from "@/components/ui/card";
import { currentTime } from "@/lib/time";
import { WeatherResult} from "@/lib/weather";
import WeatherIcon from "./weather-icon";
import { useEffect, useState } from "react";



export default function Timezone({city}:{city: string} ){

    
    const [time, setTime] = useState(currentTime(city));
    const [weather, setWeather] = useState<null | WeatherResult>(null);

    const updateTime = () => {
      setTime(currentTime(city));
    }

    const updateWeather = async () => {
      const result = await fetch(`/api/weather/current_weather?city=${city}`);
      setWeather(await result.json() as WeatherResult);
    }

    useEffect(() => {
      const timeInterval = setInterval(updateTime, 5000);
      const weatherInterval = setInterval(updateWeather, 60000);

      updateWeather();

      return () => {
        clearInterval(timeInterval);
        clearInterval(weatherInterval);
      };
    },[]);

    const ShowWeather = () => {
      if(weather === null) return <></>;

      return (
        <div className="float-right" style={{marginTop: '-20px'}}>
          {weather.temperature}°C <br />
          <WeatherIcon status={weather.status} />
        </div>
      )

    }


    return (
      <Card>
        <CardHeader>
          <CardTitle>{city}</CardTitle>
        </CardHeader>
        <CardContent className=''>
          <div className="float-left text-3xl font-semibold">
            {time}
          </div>
          <ShowWeather />
        </CardContent>
      </Card>
    )
}