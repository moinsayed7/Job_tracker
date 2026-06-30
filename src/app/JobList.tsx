"use client"

import {  useState } from "react";
import { JobCard } from "./JobCard";



type Job={id:number;
    company:string;
    role:string;
    status:string;
    createdAt:string
  
}

export function JobList({data}:{data:Job[]}) {

    const [jobData, setJobData] = useState<Job[]>(data); 
    
    function handleDelete(id: number) {
        

  setJobData((prev)=> prev.filter((job) => job.id !== id));
}

    if(jobData.length===0){
        return (
            <div>No jobs yet</div>
        )
    }

    const cardCont=jobData.map((job:Job)=>{
        return (<JobCard key={job.id} x={job} onDelete={handleDelete}/>)
    })


    return (
        <>
            {cardCont}

        </>
          

        


    )
}









