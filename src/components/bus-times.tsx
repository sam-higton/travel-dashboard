import { fetchBusStopTimes } from "@/lib/transperth";
import TransportTimes from "./transport-times";
import { unstable_noStore } from 'next/cache';


export default async function BusTimes({title, stopNo}:{title: string, stopNo: number }) {
    unstable_noStore();

    const entries = await fetchBusStopTimes(stopNo);

    return <TransportTimes title={title} entries={entries} />
}