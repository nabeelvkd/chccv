const userModel = require("../models/userModel")
const bcrypt = require('bcrypt');
const mongoose = require("mongoose");

module.exports = {
    createUser: (user) => {
        return new Promise(async (resolve, reject) => {
            let userData = await userModel.findOne({ email: user.email })
            if (userData) {
                resolve(400)
            } else {
                user.password=await bcrypt.hash(user.password,10)
                const newUser = new userModel(user)
                newUser.save()
                resolve(200,userData)
            }
        })
    },
    validateUser:(user)=>{
        return new Promise(async(resolve,reject)=>{
            let userData = await userModel.findOne({ email: user.email })
            if(userData){
                bcrypt.compare(user.password,userData.password,(err,result)=>{
                    if(result){
                        resolve(200)
                    }else{
                        resolve(400)
                    }
                })
            }else{
                resolve(404)
            }
        })
    }
}