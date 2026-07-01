import { z } from "zod"

export const email=z.string().email()

export const password=z.string().min(9,"Password should be on min 9 char")

export const schemaLogin = z.object({
    email:email,
    password:password
})



export const createdRegistrationSchema = z.object({
    email:email,
    password:password
})










