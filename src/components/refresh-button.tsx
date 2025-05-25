'use client';
import { Card } from "@/components/ui/card";
import { useEffect } from "react";

export default function RefreshButton() {
    
    const refresh = () => {
      window.location.reload();
    }

    // useEffect(() => {
    //     setTimeout(refresh, 60000)
    // },[])

    return (
        <Card className="bg-green-500 cursor-pointer h-full flex flex-col relative" onClick={refresh}>
            <div className="flex-grow flex items-center justify-center">
                <h1 className="font-bold text-2xl text-gray-100">REFRESH</h1>
            </div>
        </Card>
    )
}