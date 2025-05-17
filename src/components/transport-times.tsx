import { Card, CardHeader, CardTitle,CardContent} from "@/components/ui/card";
import { BusTimetableEntry } from "@/lib/transperth";
import { IconPlayerRecordFilled} from "@tabler/icons-react"


export default async function TransportTimes ({title, entries}:{title: string, entries:BusTimetableEntry[]}) {

    const Entry = ({entry}:{entry?:BusTimetableEntry}) => {
      if(!entry) return (<></>)
      
      return (<>
        {entry.isLive ? <IconPlayerRecordFilled size='13' className="inline -translate-px text-green-500"/> : ''}
        {entry.timeToArrive} ({entry.scheduledTime})
        </>)
    }

    return(
      <Card className="gap-0">
        <CardHeader>
        <CardTitle className="text-3xl">{title}</CardTitle>
        </CardHeader>
        <CardContent className='font-semibold'>
        <div className="text-2xl ">
          <Entry entry={entries[0]} />
        </div>
        <div className="mt-4 grid grid-cols-3">
          <div>
            2nd: <Entry entry={entries[1]} />
          </div>
          <div>
            3rd: <Entry entry={entries[2]} />
          </div>
          <div>
            4th: <Entry entry={entries[3]} />
          </div>
        </div>
        </CardContent>
      </Card>
    )
}