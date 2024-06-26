import mongoose, { Schema, model } from "mongoose";


const userSchema = new Schema({

    firstName : String,
    lastName : String,
    userName: {
        type: String,
        required: [true, 'userName is required'],
        min: [2, 'minimum length 2 char'],
        max: [20, 'max length 2 char']

    },
    email: {
        type: String,
        unique: [true, 'email must be unique value'],
        required: [true, 'userName is required'],
    },
    password: {
        type: String,
        required: [true, 'password is required'],
    },
   
    DOB: String,
    phone :{
        type: String,
        requeried : true 
    },
    address :{
        type: String,
        requeried : true 
    },
    gender: {
        type: String,
        default: 'male',
        enum: ['male', 'female']
    },
    role: {
        type: String,
        default: 'User',
        enum: ['User', 'Admin']
    },

    status: {
        type: String,
        default: 'offline',
        enum: ['offline', 'online','blocked']  
    },
    confirmEmail: {
        type: Boolean,
        default: false,
    },
    forgetCode : {
        type: Number,
        default : null
    },
    changePasswordTime : {
        type: Date,
    },
    image: Object,
}, {
    timestamps: true
})


const userModel = mongoose.models.User || model('User', userSchema)
export default userModel