import mongoose from "mongoose";
import bycrypt from "bcryptjs"
const userSchema = new mongoose.Schema({
    fullname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true, 
        minlength:6
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
userSchema.methods.matchPassword = async function(enteredPassword){
    const isPasswordCorrect = await bycrypt.compare(enteredPassword,this.password);
    return isPasswordCorrect;};



const User = mongoose.model("User",userSchema);
///pre hook


export default User;