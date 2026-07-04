import { NextResponse } from "next/server";
import {prisma} from "@/lib/prisma";
import { createdJobSchema } from "@/lib/validation";
import { Prisma } from "@prisma/client";
import { auth } from "@/lib/auth";

async function getUser() {
  const session= await auth();
  if(!session || !session.user){
    return null
  }
  return Number(session.user.id);
  
} 

export async function GET() {

    try{

      const userId=await getUser();
      if(!userId)return NextResponse.json({error:"Unauthorized"}, {status:401});



      const jobs= await prisma.job.findMany({
        where:{userId:userId},
        orderBy: {id:"asc"}
    });
    return NextResponse.json(jobs);
    }
    catch(err){
      console.error("Inter server error", err)
      return NextResponse.json({error:"Internal server error"}, {status:500})
    }
    
}


export async function POST(request: Request) {

  const userId=await getUser();
      if(!userId)return NextResponse.json({error:"Unauthorized"}, {status:401});

  let body:unknown;

  try{
      body = await request.json();

  }
  catch{
    return NextResponse.json({error:"Unable to parse the data"}, {status:400})
  }

  const parsed= createdJobSchema.safeParse(body);

  if(!parsed.success){
    return NextResponse.json({error:"Invalid data",detail:parsed.error.flatten()}, {status:400})
  }


  try{
    const job = await prisma.job.create({
    data: {
      company: parsed.data.company,
      role: parsed.data.role,
      status: parsed.data.status,
      userId:userId
    },
  });

    return NextResponse.json(job,{status:201});

  }
  catch(err:unknown){
    if(err instanceof Prisma.PrismaClientKnownRequestError && err.code==="P2002"){
      return NextResponse.json({error:"Data already exist"}, {status:409})
    }
    console.error("POST api/jobs FAILED", err);
    return NextResponse.json({error:"Internal Server error"}, {status:500})
  }


}





