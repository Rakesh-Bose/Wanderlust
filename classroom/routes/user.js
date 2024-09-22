const express=require("express");
const router=express.Router();
//here router is writen beacuse we don,t want to write all the api in one file.so to easy to understand  a function express.Router which perform the api that app.get("/users",(req,res)) are do
//index-route
router.get("/",(req,res)=>{
    res.send("get for users")
})
//show users
//here /:id users means in server.js already maintion that app.use("/users",users) it is a middileware first it call /users in users folder. 
router.get("/:id",(req,res)=>{
    let {id}=req.params;
    res.send(`get for ${id}`)
})
router.post("/",(req,res)=>{
    res.send("post")
})
module.exports=router;