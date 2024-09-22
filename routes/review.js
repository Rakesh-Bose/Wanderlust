const express=require("express")
const router=express.Router({mergeParams:true})
const wrapAsync=require("../utils/wrapasync.js")
const {reviewSchema}=require("../schema.js")
const ExpressError=require("../utils/Expresserror.js")
const listing=require("../models/listing.js");
const review=require("../models/review.js");
const {validatereview,isloggedIn,isReviewAuthor} = require("../middileware.js");
const reviewcontroller=require("../controllers/review.js")

//review post
router.post("/",isloggedIn,validatereview,wrapAsync(reviewcontroller.reviewpost));
//delete review route
router.delete("/:reviewid",isloggedIn,isReviewAuthor,wrapAsync(reviewcontroller.reviewdelete))
module.exports=router;