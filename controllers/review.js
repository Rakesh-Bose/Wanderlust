const user=require("../models/user.js")
const review=require("../models/review.js")
const listing=require("../models/listing.js")
module.exports.reviewpost=async(req,res)=>{
    let listings=await listing.findById(req.params.id);
    let {comment,rating}=req.body;
    let newreview=new review({rating:rating,comment:comment});
    newreview.author=req.user._id;
    console.log(newreview)
    
    listings.reviews.push(newreview);
    await newreview.save();
    await listings.save();
    req.flash("success","new review created");
    res.redirect(`/listings/${listings._id}`)
}
module.exports.reviewdelete=async(req,res)=>{
    let {id,reviewid}=req.params;
    //pull operator removes from array an existing array all instances of a vlaue or values that match

    await listing.findByIdAndUpdate(id,{$pull:{reviews:reviewid}})
    await review.findByIdAndDelete(reviewid);
    req.flash("success","review deleted!");
    res.redirect(`/listings/${id}`);
}