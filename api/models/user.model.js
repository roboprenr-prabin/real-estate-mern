import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username :{
        type:String,
        required:true,
        unique:true,
    },
    email :{
        type:String,
        required:true,
        unique:true,
    },
    password :{
        type:String,
        required:true
    },
    avatar:{
        type:String,
        default: "https://imgs.search.brave.com/L5BVKmFq-Fc-6Ay0CSQM4ua29I67UrsE34rpF5zFwd0/rs:fit:500:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzAwLzY0LzY3LzI3/LzM2MF9GXzY0Njcy/NzM2X1U1a3BkR3M5/a2VVbGw4Q1JRM3Az/WWFFdjJNNnFrVlk1/LmpwZw"
    },
},
{timestamps:true} 
)

const User = mongoose.model('User',userSchema)

export default User
