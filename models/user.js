const mongoose=require("mongoose")
const schema=mongoose.Schema;
const passportlocalmongoose=require("passport-local-Mongoose");
const userSchema=new schema({
    email:{
        type:String,
        required:true
    }

});
userSchema.plugin(passportlocalmongoose);
let user=mongoose.model("user",userSchema);
module.exports=user;