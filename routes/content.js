import express, { response } from "express"

import { auth } from "../middleware/auth.js";
import { createConnection } from "../index.js";
import { ObjectId } from "bson";
const router=express.Router();



router.get("/",auth,async(request,response)=>{
    response.send("Protected content")
})



export{router}