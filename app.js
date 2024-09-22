
if(process.env.NODE_ENV!="production")
    {
        require("dotenv").config();
    }
console.log(process.env.secret)

const express=require("express");
const app=express();
const path=require("path");
const listingApi=require("./routes/listing.js")
const reviewApi=require("./routes/review.js")
const userApi=require("./routes/user.js");
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
const mongoose=require("mongoose");
const listing=require("./models/listing.js");
const review=require("./models/review.js");
app.use(express.urlencoded({extended:true}));//post method
const methodOveride=require("method-override");
app.use(methodOveride("_method"));
const ejsMate=require("ejs-mate");//use in boilerplate.ejs
app.engine('ejs',ejsMate);
const wrapAsync=require("./utils/wrapasync.js")
const ExpressError=require("./utils/Expresserror.js")
const {listingSchema,reviewSchema}=require("./schema.js")
app.use(express.static(path.join(__dirname,"/public")))
const session=require("express-session")
const flash=require("connect-flash")
const passport=require("passport")
const localStrategy=require("passport-local");
const user=require("./models/user.js")
const {isloggedIn} = require("./middileware.js");
const multer=require("multer")
const upload=multer({dest:"uploads/"})
async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/Airbnb")
}
main().then((res)=>{
    console.log("connection succesful");
})
.catch((err)=>console.log(err));

const sessionOptions={secret:"mysupersecretcode",
    resave:false,
    saveUninitialized:true,
    cookie:{
        expires:Date.now()+7*24*60*60*1000,
        maxAge:7*24*60*60*1000,
        httpOnly:true,
    }
};
app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize())
app.use(passport.session())
//to authenticate
passport.use(new localStrategy(user.authenticate()))
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());
// app.use((req,res,next)=>{
//     console.log(req.user);
//     next();
// })
app.use((req,res,next)=>{
    
    res.locals.success=req.flash("success");
    res.locals.error=req.flash("error");
    res.locals.curruser=req.user;
    next();
})
app.get("/demouser",async(req,res)=>{
    let fakeuser=new user({
        email:"student@gmail.com",
        username:"delta-student" //it automaticaaly add user
    });
    let registereduser=await user.register(fakeuser,"helloworld")
    res.send(registereduser);
})
//important line written here please visit routes listing.js

app.use("/listings",listingApi)
app.use("/listings/:id/reviews",reviewApi)
app.use("/",userApi)

app.all("*",(req,res,next)=>{
    next(new ExpressError(404,"page not found"))
})
//error
app.use((err,req,res,next)=>{
    let {statusCode=500,message="not respond"}=err;
    res.status(statusCode).render("error.ejs",{message})
})
app.listen(8080,()=>{
    console.log("app is listening")
})