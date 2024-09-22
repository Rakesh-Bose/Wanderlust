const mongoose=require("mongoose")
const initData=require("./data.js")
const listing=require("../models/listing.js");
async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/Airbnb")
}
main().then((res)=>{
    console.log("connection succesful");
})
.catch((err)=>console.log(err));

const initDB = async () =>{
    await listing.deleteMany({});
    initData.data=initData.data.map((obj)=>({...obj,owner:"66b901693fde6716609cfcbd"}))
    await listing.insertMany(initData.data);
    console.log("Data saved");
};
initDB();