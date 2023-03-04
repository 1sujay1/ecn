const mongoose = require('mongoose');

module.exports = mongoose.model(
    "hospital",
    new mongoose.Schema({
        hospitalType: {
            type: String,
            enum: ["GOVERNMENT", "PRIVATE"],
            default: "PRIVATE"
        },
        services: [{type:String,default:"AMBULANCE"}],
        name: String,
        contactEmail: [String],
        contactNumber: [String],
        website: String,
        mapLink: String,
        address: String,
        pincode:String,
        lat: String,
        lon: String,
        img_url:[String],
        thumbNail:String,
        ratings:{type:Number,default:3},
        country: {type:String,default:"INDIA"},
        state: {type:String},
        district: {type:String},
        taluk: {type:String},
        hobli: {type:String},
        city: {type:String},
        createdBy:{type:mongoose.Schema.Types.ObjectId,ref:"user"},
        isDeleted: { type: Boolean, default: false },
       

    }, { timestamps: true }),
    "hospitals"
)


