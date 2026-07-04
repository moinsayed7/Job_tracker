import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { updatedJobSchema } from "@/lib/validation";
import { Prisma } from "@prisma/client";
import { auth } from "@/lib/auth";


async function getId(){

    const session=await auth();
    if(!session || !session?.user?.id)return null;

    return Number(session.user.id);

}


export async function PATCH(request:Request,{params}: {params:Promise<{id:string}>}) {

    const userId=await getId();
    if(!userId){
        return NextResponse.json({error:"Unauthorized"}, {status:401})
    }


    const {id}=await params;
    const jobId=Number(id)
    if(!Number.isInteger(jobId)){
        return NextResponse.json({error:"Invalid id "}, {status:400})
    }






let body:unknown
try{
    body=await request.json();

}
catch{
    return NextResponse.json({error:"Unable to parse the data"}, {status:400})

}

const parsed= updatedJobSchema.safeParse(body);

if(!parsed.success){
    return NextResponse.json({error:"Wrong data format", detail:parsed.error.flatten()}, {status:400})
}


const newStatus=parsed.data.status;


try{
    const updatedJob= await prisma.job.update({
    where: {id:Number(jobId),userId:userId},
    
    data: { status: newStatus },

})
    return NextResponse.json(updatedJob, {status:200})


}
catch(err:unknown){
    if(err instanceof Prisma.PrismaClientKnownRequestError && err.code==="P2025"){
        return NextResponse.json({error:"No record found"}, {status:404})
    }
    console.error("Fail api/jobs/[id] PATCH", err)
    return NextResponse.json({error:"Internal server error"}, {status:500})
}
    
}




export async function  DELETE(request:Request, {params}: {params:Promise<{id:string}>}) {

    const userId=await getId();
    if(!userId){
        return NextResponse.json({error:"Unauthorized"}, {status:401})
    }

    const {id}=await params;
    const jobId=Number(id)
    if(!Number.isInteger(jobId)){
        return NextResponse.json({error:"Invalid id "}, {status:400})
    }

    try{
        const del=await prisma.job.delete({
        where:{id:Number(jobId), userId:userId},
        
    
    
    })
            return NextResponse.json(del, {status:200})

    }
    catch(err:unknown){
    if(err instanceof Prisma.PrismaClientKnownRequestError && err.code==="P2025"){
        return NextResponse.json({error:"No record found"}, {status:404})
    }
    console.error("Fail api/jobs/[id] DELETE",err)
    return NextResponse.json({error:"Internal server error"}, {status:500})
}





    
}



