import { Card, CardHeader, CardTitle,CardContent, CardDescription, CardAction, CardFooter} from "@/components/ui/card";
import { IconTrendingDown, IconTrendingUp, IconCloudRain, IconSun } from "@tabler/icons-react"
import Timezone from "@/components/timezone";
import WeatherForecast from "@/components/weather-forecast";
import BusTimes from "@/components/bus-times";
import TrainTimes from "@/components/train-times";

export default function Home() {

  return (
    <div className="p-4 w-full">
      <div className="grid grid-cols-3 gap-x-4 gap-y-4">
        <Timezone city="Perth" />
        <Timezone city="London" />
        <div className="row-span-4 h-full"> 
          <WeatherForecast city="Perth" />
        </div>
        <div className="col-span-2 row-start-2">
          <BusTimes title="910 to Perth" stopNo={10328}/>
        </div>
        <div className="col-span-2 row-start-3">
          <BusTimes title="910 to Fremantle" stopNo={10240}/>
        </div>
        <div className="col-span-2 row-start-4">
          <BusTimes title="30 to Perth" stopNo={11922}/>
        </div>
        <div className="col-span-2 row-start-5">
          <TrainTimes title="Train" trainline="Mandurah" station="Canning Bridge" terminus="Perth" />
        </div>
      </div>
    </div>
    
  );
}
