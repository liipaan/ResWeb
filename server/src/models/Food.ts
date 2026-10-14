import { Schema, model } from "mongoose";

const foodSchema = new Schema({
name:{
    type: String,
    required: true,
    trim: true,
    maxlength: 120,
},
description:{
type: String,
trim:true,
maxlength: 10000,
default: "No description provided",
},
price:{
    type: Number,
    required: true,
    min: 0,
},
imageUrl:{
    type: String,
    trim: true,
    default:""
},
category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: true,
    },
    available: {
    type: Boolean,
    default: true,
    },
},{timestamps: true});

export const Food = model("Food", foodSchema);