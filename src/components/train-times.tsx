import { fetchTrainTimes } from "@/lib/transperth"
import TransportTimes from "./transport-times"


export default async function TrainTimes({title, station, trainline, terminus}:{title: string, station:string, trainline:string, terminus:string}) {

    const entries = await fetchTrainTimes(station, trainline, terminus);
    // console.log('train times are', entries)

    return <TransportTimes title={title} entries={entries} />
}