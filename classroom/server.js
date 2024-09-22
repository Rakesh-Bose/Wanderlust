const express=require("express");
const cookieparser=require("cookie-parser");
const app=express();
const users=require("./routes/user.js")
const posts=require("./routes/post.js")
const flash=require("connect-flash")

// const methodOveride=require("method-override");
// app.use(methodOveride("_method"));

//here /users is the api and users is the folder from where it require
app.use("/users",users)
app.use("/posts",posts)

app.use(cookieparser("secretcode"))
//cookies
app.get("/getcookies",(req,res)=>{
    res.cookie("greet","hello");
    res.send("sent u some cookies")
})
//to parse the cokies to anthor we use cookie-parser package
app.get("/",(req,res)=>{
    console.log(req.cookies);
    res.send("ok")
})
//if name is present in key and there is a value for it and not there rakesh show
app.get("/greet",(req,res)=>{
    let {name="Rakesh"}=req.cookies;
    res.send(`hi,${name}`)
}
)
app.get("/getsignedcookies",(req,res)=>{
    res.cookie("made-in","india",{signed:true});
    res.send("signed cookie sent")
})
app.get("/verify",(req,res)=>{
    console.log(req.cookies);//it print unsigned cookies
    console.log(req.signedCookies);
    res.send("ok")
})

//for session create 
const session=require("express-session")
const sessionOptions={secret:"mysupersecretstring",
    resave:false,
    saveUninitialized:true}
app.use(session(sessionOptions))
app.use(flash());
app.get("/recount",(req,res)=>{
    if(req.session.count)
    {
        req.session.count++;
    }
    else{
        req.session.count=1
    }
    res.send(`you sent a req ${req.session.count} times`)
})
app.get("/register",(req,res)=>{
    let {name="bose"}=req.query;
    //here name we add 
    req.session.name=name;
    req.flash("success","user registerd scuccesfully")
    res.redirect("/hello")
})
app.get("/hello",(req,res)=>
{
    res.locals.messages=req.flash("success");
    res.render("page.ejs",{name:req.session.name});
})
//flash stat here


app.listen(3000,()=>{
    console.log("succesful")
})