const listings=require("./models/listing.js")
const Review=require("./models/review.js")
const { listingSchema,reviewSchema} = require("./schema.js")
const ExpressError = require("./utils/Expresserror.js")
module.exports.isloggedIn=(req,res,next)=>{
    //console.log(req.user);
    if(!req.isAuthenticated())
        {
           //redirect url
           req.session.redirectUrl=req.originalUrl
            req.flash("error","you must be logged into create listing")
            res.redirect("/login")
        }
        next()
}
module.exports.saveRedirectUrl=(req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl=req.session.redirectUrl;
    }
    next();
}
module.exports.isOwner=async(req,res,next)=>{
    let {id}=req.params;
    let listing=await listings.findById(id);
    if(!listing.owner.equals(res.locals.curruser._id))
    {
        req.flash("error","you dont have permission")

    
    return res.redirect(`/listings/${id}`)
    }
    next();
};
module.exports.isReviewAuthor=async(req,res,next)=>{
    let {id,reviewid}=req.params;
    let review=await Review.findById(reviewid);
    console.log(review.author)
    if(!review.author.equals(res.locals.curruser._id))
        {
            req.flash("error","you dont have author")
    
        
        return res.redirect(`/listings/${id}`)
        }
        next();

}
module.exports.validateListing = (req, res, next) => {
    let { error } = listingSchema.validate(req.body);
    if (error) {
        let ermsg = error.details.map((el) => el.message).join(",")
        throw new ExpressError(400, ermsg);
    }
    else {
        next();
    }
}
module.exports.validatereview=(req,res,next)=>{
    let {error}=reviewSchema.validate(req.body);
    if(error)
    {
        let ermsg=error.details.map((el)=>el.message).join(",")
        throw new ExpressError(400,ermsg);
    }
    else{
        next();
    }
}