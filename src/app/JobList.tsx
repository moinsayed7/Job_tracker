"use client"

import { useEffect, useState } from "react";
import { JobCard } from "./JobCard";



type Job={id:number;
    company:string;
    role:string;
    status:string;
    createdAt:string
  
}

export function JobList({data}:{data:Job[]}) {

    const [initialJobs, setinitialJobs] = useState<Job[]>(data); 
    
    function handleDelete(id: number) {
  setinitialJobs(initialJobs.filter((job) => job.id !== id));
}


    let xyz=initialJobs.map((ele:Job)=>{
        return (<JobCard x={ele} key={ele.id} onDelete={handleDelete}/>)
    })

    if(initialJobs.length===0){
        return (
            <div>No jobs yet</div>
        )
    }

    return (
        <>
            {xyz}

        </>
          

        


    )
}









