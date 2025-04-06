import { NextRequest, NextResponse } from 'next/server';
import { fetchBusStopTimes } from '@/lib/transperth';

export async function GET(request:NextRequest, {params}: {params: { id: number }}) {

  const { id } = await params;
  
  const entries = await fetchBusStopTimes(id);
  
  return NextResponse.json({
    entries
  }, {status: 200})
}