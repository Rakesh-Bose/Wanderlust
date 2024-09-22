const mongoose=require("mongoose")
const schema=mongoose.Schema;
const reviewSchema=new schema({
      comment:{type:String},
      rating:{type:Number,min:1,max:5},
      createdat:{
        type:Date,default:Date.now()},
        
      author:{
        type:schema.Types.ObjectId,
        ref:"user",
      },
      });
        const review=mongoose.model("review",reviewSchema);
       module.exports=review;