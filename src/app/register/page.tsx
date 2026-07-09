"use client"

import { useState } from "react"


    


export default function CreateAcc(){
    const [email, setEmail]=useState<string>("");
    const [password, setPassword]= useState<string>("");
    const [isLoading,setIsLoading]= useState<boolean>(false);
    const [error,setError]= useState<null | string>(null);

    return (
        <div className="flex justify-center ">
            <div className="bg-blue-200 flex flex-col items-center py-7 px-7 rounded-xl mt-22 shadow-xl">

            <h1  className="text-center text-2xl mb-10">Sign up</h1>
            
            <div>
                <input  className="border bg-white px-2 w-50 mb-3"
                placeholder="Email"
                disabled={isLoading} value={email} type="text" name="" id="email"
                onChange={(e)=>{
                    setEmail(e.target.value)
                }}
                />
            </div>

            <div>
                
                <input  className="border bg-white px-2 w-50 mb-7"
                placeholder="Password"
                disabled={isLoading} value={password} type="password" name="" id="password" 
                onChange={ (e)=>{
                    setPassword(e.target.value)
                }}
                />
            </div>
            {error && <p className="text-red mb-3">{error}</p>}

            <button className="w-50 bg-green-200 mb-7 rounded-md shadow-md"
            onClick={async ()=>{
                setError(null);
                setIsLoading(true)

                if(email.trim()==="" || password.trim()===""){
                    setError("Email or password cannot be emphty");
                    setIsLoading(false)
                    return
                }

                const data= {
                    email:email,
                    password:password
                };

                const response= await fetch("/api/register", {
                    method:"POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify(data),
        

                });

                if(!response.ok){
                    const body=await response.json();
                    setError(body.error ?? "Error occured")
                    setIsLoading(false);
                    return
                }

                setIsLoading(false);
                window.location.href="/login"







            }}>Submit</button>

            <p className="w-50 text-center">Already have an account? <a  className="text-blue-900 underline" href="/login">Sign in</a></p>        
            </div>
        </div>
    )


}


