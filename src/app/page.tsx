
import { JobList } from "./JobList";




type data={
    id:number;
    company:string;
    role:string;
    status:string;
    createdAt:string
  }

export async function getData():Promise<data[]> {

  let response= await fetch(`http://localhost:3000/api/jobs`);

  if(!response.ok){
    return []
  }

  let data= await response.json();
  
  return data
  
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
         <JobList data={data}/>

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




