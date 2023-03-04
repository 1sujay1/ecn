const { GeneratePassword, FormatData, ValidatePassword, PublishDatabaseEvent } = require("../utils");
const { redisAndToken, redisDecodeRefreshToken, removeRefreshTokenRedis } = require("../utils/redis_token");
const { REDIS_SERVER_NOT_CONNECTED } = require("../utils/constants/constants");
const { GenerateActionObject } = require("../helpers/apiResponse");
const random = require('../utils/randomNumber');
const { formatEmailData, sendEmailWithStatic } = require("../utils/send_email");
const { sendOTP, reSendOTP, verifyOTP } = require("./otpController");
const { CustResponse } = require("../utils");
const db = require("../../models");
const UserModel = db.user;
const MobileOTPModel = db.mobile;
const EmailOTPModel = db.email;
const FCMUserModel = db.fcm;
const ResetModel = db.reset;
const HospiModel = db.hospital;


const CreateDoctor = async (req, res, next) => {
    try {
        const { name,degree,tag,email,password} = req.body;
        let payload = {
            name,degree,tag,email,password : await GeneratePassword(password, 8),roles:["DOCTOR"]
        }
       
            let createhosp = await UserModel.create(payload)
            return FormatData(res, true, "Doctor created successfully!!!", createhosp)
        
    
    } catch (error) {
        console.log("Error", error.message);
        next(error)
    }
}



module.exports = {
    CreateDoctor
}