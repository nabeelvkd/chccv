const mongoose=require('mongoose')

const userSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    name:{
        type:String,
        required:true
    },
    university:{
        type:String,
        required:false
    },
    adn:{
        type:String,
        required:true
    },
    college:{
        type:String,
        required:true
    },
    branch:{
        type:String,
        required:true
    },
    semester:{
        type:Number,
        required:true
    }
})
const userModel = mongoose.model('engineers', userSchema);
mongoose.set('strictQuery', false)

module.exports = userModel