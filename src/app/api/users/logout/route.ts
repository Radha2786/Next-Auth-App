import {connect} from '@/dbConfig/dbConfig';
import { NextRequest, NextResponse } from 'next/server';

connect()

export async function GET(){
    try{
        const response = NextResponse.json({
            message: 'Logout successful',
            success: true
        })
        response.cookies.set('token','',{
            httpOnly:true,
            expires: new Date(0)
        })
    } catch(err:any){
        return NextResponse.json({error: err.message},{status:500})
    }
}
