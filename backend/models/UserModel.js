import mongoose from 'mongoose'
const Schema = mongoose.Schema

const UserSchema = new Schema(
    {
    name: { type:String, required:true},
    email: { type:String, required:true, unique:true},
    password: { type:String, required:true},
    isAdmin: { type:Boolean, default: false, required:true},
    phone: {type:String, required:true},
    access_token: {type:String, required:true},
    refresh_token: {type:String, required:true}
    },
    {
        timestamps:true
    }
)

module.exports = mongoose.model('User',UserSchema)