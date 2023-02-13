const mongoose = require('mongoose');

module.exports = mongoose.model(
    "hospital",
    new mongoose.Schema({
        hospitalType: {
            type: String,
            enum: ["GOVERNMENT", "PRIVATE"],
            default: "PRIVATE"
        },
        name: String,
        email: String,
        mobile: String,
        website: String,
        mapLink: String,
        address: String,
        pincode:String,
        lat: String,
        lon: String,
        img_url:[String],
        thumbNail:String,
        ratings:Number,
        country: {type:String,default:"INDIA"},
        state: {type:String,default:"KARNATAKA"},
        district: {type:String,default:"BANGALORE"},
        taluk: {type:String},
        hobli: {type:String},
        village: {type:String},
        createdBy:{type:mongoose.Schema.Types.ObjectId,ref:"user"},
        isDeleted: { type: Boolean, default: false },
       

    }, { timestamps: true }),
    "hospitals"
)


