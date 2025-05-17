import { Card, CardHeader, CardTitle,CardContent} from "@/components/ui/card";
import { IconSun } from "@tabler/icons-react"
import { currentTime } from "@/lib/time";
import { currentWeather } from "@/lib/weather";
import WeatherIcon from "./weather-icon";

export default async function Timezone({city}:{city: string} ){

    const weather = await currentWeather(city);

    console.log('what is weather?', weather)

    return (
      <Card>
        <CardHeader>
          <CardTitle>{city}</CardTitle>
        </CardHeader>
        <CardContent className=''>
          <div className="float-left text-3xl font-semibold">
            {currentTime(city)}
          </div>
          <div className="float-right" style={{'margin-top': '-20px'}}>
          
            {weather.temperature}°C <br />
            <WeatherIcon status={weather.status} />
          </div>
        </CardContent>
      </Card>
    )
}