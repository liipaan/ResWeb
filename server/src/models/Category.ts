import { Schema, model } from "mongoose";

const categorySchema = new Schema({
    name:{
        type: String,
        required:true,
        unique: true,
        maxlength: 60,
        trim: true,
    },
    description:{
        type: String,
        required: true,
        maxlength: 300,
        trim: true,
    },

},{timestamps: true});
export const Category = model("Category", categorySchema);