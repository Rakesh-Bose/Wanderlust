const user=require("../models/user.js")
const review=require("../models/review.js")
const listing=require("../models/listing.js")
module.exports.getsignup=(req, res) => {
    res.render("users/signup.ejs")
}
module.exports.postsignup=async (req, res) => {
    try {
        let { username, email, password } = req.body;
        const newuser = new user({ email, username });
        const registeruser = await user.register(newuser, password)
        console.log(registeruser);
        //when we signup then it automatically login
        req.login(registeruser, (err) => {
            if (err) {
                return next(err)
            }
            req.flash("success", "welcome to airbnb");
            res.redirect("/listings");
        })

    }
    catch (e) {
        req.flash("error", e.message);
        res.redirect("/signup")
    }
}
module.exports.getlogin=(req, res) => {
    res.render("users/login.ejs");
}
module.exports.postlogin=async (req, res) => {
    req.flash("Welcomè to wanderlust ")
    
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl)
}
module.exports.logout=(req, res) => {
    req.logout((err) => {
        if (err) {
            next(err);
        }
        req.flash("success", "you are logged out");
        res.redirect("/listings");
    })
}