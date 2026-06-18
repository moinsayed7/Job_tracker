"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";



async function sendData(x:{company:string, role:string, status:string} ) {


    let response=await fetch(`http://localhost:3000/api/jobs`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(x)
    })

}





export default function AddJob(){
    const [comp, setComp] = useState<string>("");
    const [inpRole, setRole] = useState<string>("");
    const [inpStatus, setStatus] = useState<string>("applied");
    const router=useRouter();





    return (
        <div className="flex flex-col items-center justify-center w-1/1">
            <div className="bg-gray-600 mt-5 flex flex-col items-center px-7 py-7 rounded-2xl">
                <div>

                <label className="font-bold text-white" htmlFor="inpComp">Company</label><br />
                <input value={comp}
                onChange={(eve)=>{
                    setComp(eve.target.value);
                    console.log(eve.target.value);
                }} className="border px-1 rounded w-[190px] mt-1 bg-gray-300" id="inpComp" type="text" />
                </div>

                

                <br />
                <div>
                <label htmlFor="inpRole" className="font-bold  text-white">Role</label><br />
                <input value={inpRole}
                onChange={(eve)=>{
                    setRole(eve.target.value)
                }}
                className="border px-1 rounded w-[190px] mt-1 bg-gray-300" id="inpRole" type="text" />
                </div>

                <br />

                <div className=" w-[190px]">
                <label htmlFor="inpStatus" className="font-bold  text-white">Status</label><br />

                <select id="inpStatus" className="border px-1 rounded mt-1 bg-gray-300 font-[Inter]"
                onChange={(eve)=>{
                    setStatus(eve.target.value)
                }}>
                <option value="applied">Applied</option>
                <option value="interview">Interview</option>
                <option value="rejected">Rejected</option>
                <option value="offer">Offer</option>
                </select>

                </div>

                <br />

                <div className="w-[190px] flex justify-end">
                <button className="bg-white px-4 py-1 mt-3 rounded-xl text-gray-900 font-bold "  
                onClick={async ()=>{
                    if(comp.trim()==="" || inpRole.trim()==="" ){
                        alert("Please enter complete information")
                        return
                    }

                    await sendData({company:comp, role:inpRole, status:inpStatus});


                    setComp("");
                    setRole("");
                    router.push("/");



                }}>Add</button >
                </div>


            </div>
        </div>
    )
}

