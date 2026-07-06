"use client"
import { useState } from "react";


async function update(x:{id:number,company:string,role:string,status:string,userId:number}):Promise<{success:boolean;error:string|null}> {

    try{
        const response= await fetch (`/api/jobs/${x.id}`, {
        method:"PATCH",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(x)
    })

        if(!response.ok){
            const body=await response.json()
            return {success:false, error:body.error ?? "Unable to update"}
        }
        return {success:true, error:null}
    }
    catch{
        return {success:false, error:"Internal server error"}
    }
    
}


async function deleteCard (x:{id:number,company:string,role:string,status:string,userId:number}):Promise<{success:boolean;error:string|null}> {


    try{
        const response= await fetch (`/api/jobs/${x.id}`, {
        method:"DELETE",
        headers: {"Content-Type": "application/json"}
        });
        if(!response.ok){
            const body=await response.json()

            return {success:false, error: body.error ?? "Unable to delete"}
        }
        return {success:true, error:null}
    }
    catch{
        return {success:false, error:"Internal error"}

    }
    

}





export function JobCard({x, onDelete}:{x:{id:number,company:string,role:string,status:string, userId:number},onDelete:(id:number)=>void}) {
    const [status, setStatus] = useState<string>(x.status);
    const [error, setError]=useState<null | string>(null);
    const [isUpdating, setIsUpdating]=useState<boolean>(false)
    

    return (
        <div key={x.id} className="bg-[#1E293B] w-[210px] h-auto px-4 py-5 m-3 rounded-lg text-white font-[sans-serif] flex flex-col items-center justify-center ">

            <button disabled={isUpdating}
            onClick={async ()=>{
                    setError(null)
                    setIsUpdating(true);
                    const parsed=await deleteCard({id:Number(x.id),company:x.company,role:x.role,status:x.status,userId:x.userId});

                    if(!parsed.success){
                        setError(parsed.error)
                    }
                    else{
                    onDelete(x.id);
                    }
                    
                    setIsUpdating(false);

                }}
            className="self-end font-bold mr-2 mb-2">X</button>



        <p className="mb-3 text-lg text-center">Company: {x.company}</p>

        <p className="mb-3 text-lg text-center" >Role: {x.role}</p>

        <label htmlFor="inpStatus" className="font-bold  text-white">Status</label>

                <select id="inpStatus" className="border px-1 rounded mt-1 bg-gray-300 font-[Inter] text-black" value={status} disabled={isUpdating}
                onChange={async(eve)=>{
                    setError(null)
                    const oldStatus=status
                    setIsUpdating(true)
                    const newStatus=eve.target.value
                    const parsed=await update({id:Number(x.id),company:x.company,role:x.role,status:eve.target.value,userId:x.userId});
                    setStatus(newStatus);

                    if(!parsed.success){
                        setStatus(oldStatus)
                        setError(parsed.error);
                    }
                    setIsUpdating(false)


                }}>
                <option className="text-center" value="applied">Applied</option>
                <option className="text-center" value="interview">Interview</option>
                <option className="text-center" value="rejected">Rejected</option>
                <option className="text-center" value="offer">Offer</option>
                </select>

                {error && <p className="text-red-400 text-sm mt-2">{error}</p>}


      </div>
    )
}