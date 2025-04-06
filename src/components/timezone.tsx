import { Card, CardHeader, CardTitle,CardContent, CardDescription, CardAction, CardFooter} from "@/components/ui/card";
import { IconTrendingDown, IconTrendingUp, IconCloudRain, IconSun } from "@tabler/icons-react"


export default function Timezone({city}:{city: string} ){
    return (
      <Card>
        <CardHeader>
          <CardTitle>{city}</CardTitle>
        </CardHeader>
        <CardContent className='text-3xl font-semibold'>
          <div className="float-left">
            12:50
          </div>
          <div className="float-right">
          
          <IconSun />
          </div>
        </CardContent>
      </Card>
    )
}