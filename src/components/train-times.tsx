import { fetchTrainTimes } from "@/lib/transperth"
import TransportTimes from "./transport-times"
import { unstable_noStore } from 'next/cache';

export default async function TrainTimes({title, station, trainline, terminus}:{title: string, station:string, trainline:string, terminus:string}) {
    unstable_noStore();

    const entries = await fetchTrainTimes(station, trainline, terminus);
    // console.log('train times are', entries)

    return <TransportTimes title={title} entries={entries} />
}