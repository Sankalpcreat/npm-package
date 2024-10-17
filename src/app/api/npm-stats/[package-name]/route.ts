import { NextResponse } from "next/server";
import npmService from '@/services/npmService'

export async function GET(request:Request,{params}:{params:{packageName:string}}){
    const packageName=params.packageName;
    const packageData=await npmService.getPackageData(packageName);

    return NextResponse.json(packageData)
}