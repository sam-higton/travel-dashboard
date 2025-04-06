import { Card, CardHeader, CardTitle,CardContent, CardDescription, CardAction, CardFooter} from "@/components/ui/card";
import { IconTrendingDown, IconTrendingUp, IconCloudRain, IconSun } from "@tabler/icons-react"

export default function WeatherForecast({city, daysAhead = 7}:{city:string, daysAhead?: number}) {

    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

    return (
        <Card className="h-full">
            <CardHeader>
              <CardTitle className="text-3xl">Weather</CardTitle>
            </CardHeader>
            <CardContent className=''>
                {days.map(day => (
                  <>
                  <div className="border-b-2 border-grey-500 py-3">
                    <div>{day}</div>
                    <div className="grid grid-cols-2">
                      <div className="">
                        32°C 43% 24uv
                      </div>
                      <div className="text-center">
                        <IconSun />
                      </div>
                    </div>
                  </div>
                  </>
                ))}
              
            </CardContent>
          </Card>
    )
}