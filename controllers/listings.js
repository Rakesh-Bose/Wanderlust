const listing=require("../models/listing.js")
module.exports.index=async (req, res) => {
    let alllistings = await listing.find({});
    res.render("./listings/index.ejs", { alllistings });
}
module.exports.new =async(req, res) => {
    //console.log(req.user) //show all details of user

    res.render("./listings/new.ejs")
}
module.exports.show=async (req, res) => {
    let { id } = req.params;
    const listings = await listing.findById(id).populate({path:"reviews",populate:{path:"author",},}).populate("owner");
    console.log(res.locals.user)
    if (!listings) {
        req.flash("error", "listing new requested doesnt exist");
        res.redirect("/listings");
    }
    //console.log(listings)
    res.render("./listings/show.ejs", { listings });
}
module.exports.edit=async (req, res) => {
    let { id } = req.params;
    const listings = await listing.findById(id)
    res.render("./listings/edit.ejs", { listings });
}
module.exports.update=async (req, res) => {
    let { id } = req.params;
    
    
    let { title, description, image, price, location, country } = req.body;

    let listings=await listing.findByIdAndUpdate(id, { title: title, description: description, image: image, price: price, location: location, country: country });
    if(typeof req.file!="undefined"){
    let url=req.file.path;
    let filename=req.file.filename;
    listings.image={url,filename};
    await listings.save();
    }
    res.redirect(`/listings/${id}`)

}
module.exports.delete=async (req, res) => {
    let { id } = req.params;


    await listing.findByIdAndDelete(id);
    req.flash("success", "listing deleted!");
    res.redirect("/listings")

}
module.exports.add=async (req, res, next) => {
    let url=req.file.path;
    let filename=req.file.filename;
    console.log(url,"..",filename)
     let { title, description, image, price, location, country } = req.body;
     let newlisting = new listing({
         title: title,
         description: description,
         image: image,
         price: price,
         location: location,
         country: country

     });

    // // // 
    // // let result=listingSchema.validate(req.body);
    // // if(result.error){
    // //     throw new ExpressError(400,result.error);
    // // }

    // // if(!description)
    // // {
    // //     throw new ExpressError(400,"Description is missing");
    // // }
     newlisting.owner=req.user._id;
     newlisting.image={url,filename};
    await newlisting.save();
     req.flash("success", "new listing created!");
    res.redirect("/listings")
}
