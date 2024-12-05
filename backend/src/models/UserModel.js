const mongoose = require('mongoose')
const UserSchema = new mongoose.Schema(
    {
    name: { type:String},
    email: { type:String, required:true, unique:true},
    password: { type:String, required:true},
    isAdmin: { type:Boolean, default: false, required:true},
    phone: {type:String},
    access_token: {type:String, required:true},
    refresh_token: {type:String, required:true}
    },
    {
        timestamps:true
    }
);
const User = mongoose.model("User", UserSchema)
module.exports = User
