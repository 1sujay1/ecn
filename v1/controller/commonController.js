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
const axios = require('axios');
const fs = require('fs');
const path = require('path');


const locationByPincode = async (req, res, next) => {
    try {
        console.log("reqbody",req.body);
        const {pincode} = req.body;
        
        if(!pincode){
            return FormatData(res, false, "Required pincode", [])
        }
        const url =`https://api.postalpincode.in/pincode/${pincode}`
        let resp = await axios.get(url);
        resp =resp.data[0]
console.log(resp);
        if(resp.Status=='Success'){
            return FormatData(res, true, resp.Message, resp.PostOffice)

        }else{
            return FormatData(res, false, resp.Message, [])
        }
    
    } catch (error) {
        console.log("Error", error.message);
        next(error)
    }
}

const masterData = async (req, res, next) => {
    try {
        console.log(__dirname);
        console.log(path.join(__dirname,'../../config/country.json'));
       let countryData = fs.readFileSync(path.join(__dirname,'../../config/country.json'),"utf8")
       data = {countryData:JSON.parse(countryData)}
       return FormatData(res, true, "Data list", data)
    } catch (error) {
        console.log("Error", error.message);
        next(error)
    }
}


module.exports = {
    locationByPincode,
    masterData
}