import { NextResponse } from "next/server";
import npmService from '@/services/npmService'

export async function GET(request:Request,{params}:{params:{package:string}}){
    const {searchParams}=new URL(request.url);
    const type=searchParams.get('type')||'monthly';
    const downloadData=await npmService.getDownloadStats(params.packageName,type);

    return NextResponse.json(downloadData);
}