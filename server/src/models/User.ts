import { Schema, model, type InferSchemaType } from "mongoose";

const userSchema = new Schema({
    name:{
        type :String,
        required : true,
        trim: true,
    minlength: 2,
    maxlength: 80,
    },
    email:{
        type :String,
        required : true,
        trim: true,
        lowercase: true,
        unique: true,
    },
    password:{
        type :String,
        required : true,
        select: false,
    },
    role:{
        type: String,
    enum: ["customer", "admin"],
    default: "customer",
    }
},{timestamps: true});
export type UserDocument = InferSchemaType<typeof userSchema>;
export const User = model("User", userSchema);