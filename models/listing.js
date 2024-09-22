const mongoose = require("mongoose")
const review = require("./review.js")
const schema = mongoose.Schema;
const listingSchema = new schema({
      title: { type: String, required: true },
      description: String,
      image: {
            url:String,
            filename:String,
      },
      price: Number,
      location: String,
      country: String,
      reviews: [{
            type: schema.Types.ObjectId,
            ref: "review"
      }],
      owner:{
            type:schema.Types.ObjectId,
            ref:"user"
      }
})
listingSchema.post("findOneAndDelete", async (listing) => {
      if (listing) {
            await review.deleteMany({ _id: { $in: listing.reviews } });
      }
})
const listing = mongoose.model("listing", listingSchema);
module.exports = listing;