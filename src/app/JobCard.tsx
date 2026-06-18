"use client"

import {  useState } from "react";


async function update(x:{id:number,company:string,role:string,status:string}) {

    const response= await fetch (`http://localhost:3000/api/jobs/${x.id}`, {
        method:"PATCH",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(x)
    })
    
}


async function deleteCard (x:{id:number,company:string,role:string,status:string}) {


    const response= await fetch (`http://localhost:3000/api/jobs/${x.id}`, {
        method:"DELETE",
        headers: {"Content-Type": "application/json"}
    })
    

}





export function JobCard({x, onDelete}:{x:{id:number,company:string,role:string,status:string},onDelete:(id:number)=>void}) {
    const [status, setStatus] = useState<string>(x.status);
    

    return (
        <div key={x.id} className="bg-[#1E293B] w-[210px] h-auto px-4 py-5 m-3 rounded-lg text-white font-[sans-serif] flex flex-col items-center justify-center ">

            <button 
            onClick={async ()=>{
                    await deleteCard({id:Number(x.id),company:x.company,role:x.role,status:x.status});
                    onDelete(x.id)

                }}
            className="self-end font-bold mr-2 mb-2">X</button>



        <p className="mb-3 text-lg text-center">Company: {x.company}</p>

        <p className="mb-3 text-lg text-center" >Role: {x.role}</p>

        <label htmlFor="inpStatus" className="font-bold  text-white">Status</label>

                <select id="inpStatus" className="border px-1 rounded mt-1 bg-gray-300 font-[Inter] text-black" value={status}
                onChange={(eve)=>{
                    setStatus(eve.target.value)
                    update({id:Number(x.id),company:x.company,role:x.role,status:eve.target.value})

                }}>
                <option value="applied">Applied</option>
                <option value="interview">Interview</option>
                <option value="rejected">Rejected</option>
                <option className="text-center" value="offer">Offer</option>
                </select>




      </div>
    )
}