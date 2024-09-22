const express = require("express")
const router = express.Router()
const wrapAsync = require("../utils/wrapasync.js")
// const { listingSchema } = require("../schema.js")
// const ExpressError = require("../utils/Expresserror.js")
const listing = require("../models/listing.js");
const {isloggedIn,isOwner,validateListing} = require("../middileware.js");
const listingcontroller=require("../controllers/listings.js")
const multer=require("multer")
const {storage}=require("../cloudconfig.js")
//const upload=multer({dest:"uploads/"})
const upload=multer({storage})

router.get("/", wrapAsync(listingcontroller.index));

router.get("/new", isloggedIn,listingcontroller.new )
//show
router.get("/:id", wrapAsync(listingcontroller.show));


//Edit route
router.get("/:id/edit", isloggedIn, wrapAsync(listingcontroller.edit));

//update
router.put("/:id", upload.single("image"),isloggedIn,isOwner,wrapAsync(listingcontroller.update));
//delete
router.delete("/:id", isloggedIn,isOwner, wrapAsync(listingcontroller.delete));

//add
router.post("/",upload.single("image"), validateListing,wrapAsync(listingcontroller.add));

module.exports = router;

// router.get("/testlisting",async (req,res)=>{
//     let sampletesting=new listing({
//         title:"my home",
//         description:"by the beach",
//         price:1200,
//         loaction:"Goa",
//         country:"India"

//     });
//     await sampletesting.save();
//     res.send("succesful testing")
// })