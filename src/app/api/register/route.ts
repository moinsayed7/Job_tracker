import { NextResponse } from "next/server";
import { createdRegistrationSchema } from "@/lib/registerValidation";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";


export async function POST(request:Request) {

    let body:unknown;
    try{
        body=await request.json();
    }
    catch{
        return NextResponse.json({error:"Unable to parse"}, {status:400})
    }

    const parsed=createdRegistrationSchema.safeParse(body);

    if(!parsed.success){
        return NextResponse.json({error:"Invalid data"}, {status:400})
    }

    const cryptedPass=await bcrypt.hash(parsed.data.password,12);

    try{
        const createUser=await prisma.user.create({
            data:{
                email:parsed.data.email,
                password:cryptedPass
            }
        })

        return NextResponse.json({email:createUser.email,id:createUser.id,createdAt:createUser.createdAt}, {status:201})
    }

    catch(err){
        if(err instanceof Prisma.PrismaClientKnownRequestError && err.code==="P2002"){
            return NextResponse.json({error:"Data already exist"} , {status:409})
        }
        console.error("POST api/register FAILED", err)
        return NextResponse.json({error:"Unable to create the data"}, {status:500})
    
    }




}









