"use client"

import { useState } from "react"


    


export default function CreateAcc(){
    const [email, setEmail]=useState<string>("");
    const [password, setPassword]= useState<string>("");
    const [isLoading,setIsLoading]= useState<boolean>(false);
    const [error,setError]= useState<null | string>(null);

    return (
        <div>
            
            <div>
                <label htmlFor="email">Email:</label>
                <input disabled={isLoading} value={email} type="text" name="" id="email"
                onChange={(e)=>{
                    setEmail(e.target.value)
                }}
                />
            </div>

            <div>
                <label htmlFor="password">Password:</label>
                <input disabled={isLoading} value={password} type="password" name="" id="password" 
                onChange={ (e)=>{
                    setPassword(e.target.value)
                }}
                />
            </div>
            {error && <p className="text-red">{error}</p>}

            <button onClick={async ()=>{
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

            <p>Already have an account? <a href="/login">Sign in</a></p>        

        </div>
    )


}


