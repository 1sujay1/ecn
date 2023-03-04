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


const CreateHosp = async (req, res, next) => {
    try {
        const {_id, hospitalType, name, contactEmail, contactNumber, website, mapLink , address, pincode, lat, lon,img_url,thumbNail,ratings,country,state,district,taluk,hobli,city } = req.body;
        let payload = {
            hospitalType, name, contactEmail, contactNumber, website, mapLink , address, pincode, lat, lon,createdBy:req.decoded?.user_id,img_url,thumbNail,ratings,country,state,district,taluk,hobli,city
        }
        if(_id){
          let checkExists =  await HospiModel.findOne({_id,isDeleted:false})
          if(!checkExists){
            return FormatData(res, false, "Hospital not found", [])
          }
          let updatedData = await HospiModel.updateOne({_id},payload)
            return FormatData(res, true, "Hospital updated successfully", updatedData)
        }else{
            let createhosp = await HospiModel.create(payload)
            return FormatData(res, true, "Hospital created successfully!!!", createhosp)
        }
    
    } catch (error) {
        console.log("Error", error.message);
        next(error)
    }
}

const GetHosp = async (req, res, next) => {
    try {
        const {_id,pincode,country,distict,state} = req.body;
        let filter ={isDeleted:false}
        if(_id){filter._id =_id}
        if(pincode){filter.pincode =pincode }
        if(country){filter.country =country }
        if(distict){filter.distict =distict }
        if(state){filter.state =state }
        console.log(filter);
        let checkExists =  await HospiModel.find(filter)
        if(!checkExists.length){
          return FormatData(res, false, "Hospital not found", [])
        }
          return FormatData(res, true, "Hospitals found successfully", checkExists)
    
    } catch (error) {
        console.log("Error", error.message);
        next(error)
    }
}

const DeleteHosp = async (req, res, next) => {
    try {
        const {_id} = req.body;
       
        if(_id){
          let checkExists =  await HospiModel.findOne({_id,isDeleted:false})
          if(!checkExists){
            return FormatData(res, false, "Hospital not found", [])
          }
          let updatedData = await HospiModel.updateOne({_id},{isDeleted:true})
            return FormatData(res, true, "Hospital deleted successfully", updatedData)
        }
    
    } catch (error) {
        console.log("Error", error.message);
        next(error)
    }
}

module.exports = {
    CreateHosp,
    GetHosp,
    DeleteHosp
}