import {z} from "zod";


export const statusSchema= z.enum(["applied", "rejected", "offer", "interview"])



export const createdJobSchema=z.object({
    company:z.string().min(1,"Please enter a name"),
    role:z.string().min(1, "Please enter a role"),
    status:statusSchema

})

export const updatedJobSchema=z.object({
    status:statusSchema
})


