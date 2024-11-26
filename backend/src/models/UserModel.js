const mongoose = require('mongoose')
const UserSchema = new mongoose.Schema(
    {
    name: { type:String, required:true},
    email: { type:String, required:true, unique:true},
    password: { type:String, required:true},
    isAdmin: { type:Boolean, default: false, required:true},
    phone: {type:String, required:true},
    //access_token: {type:String, required:true, default:''},
    //refresh_token: {type:String, required:true, default:''}
    },
    {
        timestamps:true
    }
);
const User = mongoose.model("User", UserSchema)
module.exports = User
