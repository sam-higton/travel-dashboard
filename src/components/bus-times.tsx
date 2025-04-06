import { fetchBusStopTimes } from "@/lib/transperth";
import TransportTimes from "./transport-times";


export default async function BusTimes({title, stopNo}:{title: string, stopNo: number }) {
    const entries = await fetchBusStopTimes(stopNo);

    return <TransportTimes title={title} entries={entries} />
}