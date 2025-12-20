import mongoose from "mongoose";
import bycrypt from "bcryptjs"
const userSchema = new mongoose.Schema({
    fullname:{
        type:String,
        required:true
    },
    Email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true, 
        minlength:8
    },
    bio:{
        type:String,
        default:""
    },
    profilePic:{
        type:String,
        default:"",
    },
    nativelanguage:{
        type:String,
        default:"",
    },
     learninglanguage:{
        type:String,
        default:"",
    },
    location:{
        type:String,
        default:"",
    },
    isOnboarding:{
        type:Boolean,
        default:false,
    },

    friends:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
        }
    ]

},{timestamps:true})

const User = mongoose.model("User",userSchema);
///pre hook
userSchema.pre("save",async function(next){
    if (!this.isModified("password")) return next();
    try{
        const salt =await bycrypt.genSalt(10);
        this.password = await bycrypt.hash(this.password,salt);
        next();
    }
    catch (error){
        next(error)
    }

});

export default User;