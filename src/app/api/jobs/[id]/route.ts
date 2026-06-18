import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PATCH(request:Request,{params}: {params:Promise<{id:string}>}) {

const {id}=await params

const body=await request.json();
const newStatus=body.status;


const updatedJob= await prisma.job.update({
    where: {id:Number(id)},
    data: { status: newStatus },

})

return NextResponse.json(updatedJob)
    
}




export async function  DELETE(request:Request, {params}: {params:Promise<{id:string}>}) {

    const {id}=await params;

    let del=await prisma.job.delete({
        where:{id:Number(id)},
        
    
    
    })

    return NextResponse.json(del)



    
}




