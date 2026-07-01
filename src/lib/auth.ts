import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import { schemaLogin } from "./registerValidation"
import { prisma } from "./prisma"


export const {handlers, signIn, signOut, auth}=NextAuth({
    providers:[
        Credentials({
            credentials:{
                email:{},
                password:{},
            },
            authorize:async(credentials)=>{
                const parsed= schemaLogin.safeParse(credentials);
                if(!parsed.success){
                    return null
                }
                
                const user=await prisma.user.findUnique({
                    where:{email:parsed.data.email}
                })
                
                if(!user){
                    return null
                }

                const isValidPass=await bcrypt.compare(parsed.data.password,user.password);
                
                if(!isValidPass) return null

                return {email:user.email, id:String(user.id)}

            }
        })
    ]
})







