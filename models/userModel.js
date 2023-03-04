const mongoose = require('mongoose');

module.exports = mongoose.model(
    "user",
    new mongoose.Schema({
        dob: { type: Date, default: null },
        about_me: String,
        img_url: String,
        coverImage: [String],
        name: { type: String, trim: true },
        email: { type: String, trim: true },
        mobile: { type: String, trim: true },
        password: String,
        degree: String,
        tag: String,
        provider: {
            type: String,
            enum: ["ECN", "GOOGLE", "APPLE"],
            default: "ECN"
        },
        roles: [String],
        mobileVerified: {
            type: Boolean,
            default: false
        },
        emailVerified: {
            type: Boolean,
            default: false
        },
        initialized: { type: Boolean, default: false },

        //address info
        country: String,
        state: String,
        district: String,
        address: [String],
        pin_code: String,
        created_by: {type:mongoose.Schema.Types.ObjectId,ref:"user"},
        hospitalConn:{type:mongoose.Schema.Types.ObjectId,ref:"hospital"},
        specilizations:[String],
        isDeleted: { type: Boolean, default: false },
       

    }, { timestamps: true }),
    "users"
)


