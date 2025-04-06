import { NextRequest, NextResponse } from 'next/server';
import { fetchTrainTimes } from '@/lib/transperth';

export async function GET(request:NextRequest, {params}: {params: { trainline: string, station: string  }}) {
    const { trainline, station } = await params;
    const response = await fetchTrainTimes(station, trainline)
    return NextResponse.json({
        trainline, station
      }, {status: 200})
}