import type { Context } from "hono";
import { SubsPlan } from "../models/subsPlanModel";


export const createsubsPlan = async (c: Context)=>{
    const {name, price, billingCycle} = await c.req.json();
    const subsPlan = await SubsPlan.create({
        name,
        price,
        billingCycle
    })
return c.json(subsPlan, 201)
}

export const getAllSubsPlan =  async (c: Context )=>{
    const SubsPlans = await SubsPlan.find()
   return  c.json(SubsPlans)
}
