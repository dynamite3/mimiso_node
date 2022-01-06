import { ObjectId } from "bson";
import express, { response } from "express"

const router=express.Router();
import { createConnection } from "../index.js"



router.post("/getcurrentchatid" ,async (request, response) => {

    const { convobetween} = request.body;
    const client = await createConnection();
    const result = await client
        .db("Dynamessenger")
        .collection("conversation")
        .findOne({convobetween:{$all:convobetween}})

    if (result==null){
        const result1 = await client
            .db("Dynamessenger")
            .collection("conversation")
            .insertOne({convobetween:convobetween})
        const result3 = await client
            .db("Dynamessenger")
            .collection("conversation")
            .findOne({convobetween:{$all:convobetween}})
        response.send(result3)
    }
    else{
        response.send(result)
    }
})

export{router}