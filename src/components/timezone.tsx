import { Card, CardHeader, CardTitle,CardContent} from "@/components/ui/card";
import { currentTime } from "@/lib/time";
import { currentWeather } from "@/lib/weather";
import WeatherIcon from "./weather-icon";
import { unstable_noStore } from 'next/cache';

export default async function Timezone({city}:{city: string} ){
    unstable_noStore();

    const weather = await currentWeather(city);

    return (
      <Card>
        <CardHeader>
          <CardTitle>{city}</CardTitle>
        </CardHeader>
        <CardContent className=''>
          <div className="float-left text-3xl font-semibold">
            {currentTime(city)}
          </div>
          <div className="float-right" style={{marginTop: '-20px'}}>
          
            {weather.temperature}°C <br />
            <WeatherIcon status={weather.status} />
          </div>
        </CardContent>
      </Card>
    )
}