
import { prisma } from "@/lib/prisma";
import { JobList } from "./JobList";

import { auth } from "@/lib/auth";


type data={
    id:number;
    company:string;
    role:string;
    status:string;
    createdAt:string;
    userId:number
  }

export async function getData():Promise<data[]> {
  const session = await auth();
  if (!session?.user?.id) {
    return [];
  }

  const userId = Number(session.user.id);
  if (Number.isNaN(userId)) {
    return [];
  }

  const jobs = await prisma.job.findMany({
    where: { userId },
    orderBy:{id:"asc"}
  });

  return jobs.map((item) => ({
    ...item,
    createdAt: item.createdAt.toISOString(),
  }));
}


async function RenderCard(){

  

  let data=await getData();

  

  // let card=data.map((ele)=>{

  //   return (
  //     <JobList data={ele}/>



  //   )

  // })

  return(
    <>
         <JobList data={ data}/>

    </>
  )

}



export default async function Home() {



  return (
    <main className="bg-white flex flex-col items-center h-[100vh]">
      <div className="flex w-[100%] flex-wrap justify-center">
        <RenderCard />
      </div>
    </main>
  );
}




