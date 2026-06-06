import { getUserDetails } from "@/lib/handleCookies";
import { NextResponse } from "next/server";

export async function GET(request:Request){
    const details = await getUserDetails();
    const res = NextResponse.json({sucess : true, id: details?.id}, {status: 200});
    return res;
}