import { NextRequest, NextResponse } from 'next/server';
import { currentWeather } from '@/lib/weather';

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const city = searchParams.get('city') || 'Australia/Perth';
    
    const weather = await currentWeather(city);
    return NextResponse.json(weather);
   }