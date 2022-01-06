import { ObjectId } from "bson";
import express, { response } from "express"

const router=express.Router();
import { createConnection } from "../index.js"

router.post("/addmessage",async(req,res) =>{
    const data=req.body;
    console.log(data)
    const client = await createConnection();
    const result = await client
        .db("Dynamessenger")
        .collection("messeges")
        .findOne({conversationId:data.conversationId})
        

    if (result==null){
        const result1 = await client
            .db("Dynamessenger")
            .collection("messeges")
            .insertOne({
                conversationId:data.conversationId,
                chat:[{by:data.messageby,message:data.content,time:Date()}]
            })

        const result3 = await client
            .db("Dynamessenger")
            .collection("messeges")
            .findOne({conversationId:data.conversationId})
        res.send(result3)
    }
    else{
        const result2 = await client
            .db("Dynamessenger")
            .collection("messeges")
            .updateOne({
                conversationId:data.conversationId
            },{ $push: { chat: {by:data.messageby,message:data.content,time:Date()} } })
        res.send(result2)
    }

})

router.post("/getAllmessages",async(req,res) =>{
    const {convoId} =req.body;
    console.log("=----------")
    console.log(convoId)
    console.log("=----------")

    const client = await createConnection();
    const result = await client
        .db("Dynamessenger")
        .collection("messeges")
        .findOne({conversationId:convoId})

    if(result)
        res.send({success:true,result})
    else    
        res.send({success:false})
})

export{router}