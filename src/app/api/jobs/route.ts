import { NextResponse } from "next/server";
import {prisma} from "@/lib/prisma"


export async function GET() {

    const jobs= await prisma.job.findMany({
      orderBy: {id:"asc"}
    });
    return NextResponse.json(jobs);
    
}


export async function POST(request: Request) {
  const body = await request.json();
  const job = await prisma.job.create({
    data: {
      company: body.company,
      role: body.role,
      status: body.status,
    },
  });
  return NextResponse.json(job);
}






