import { Schema, model } from "mongoose";

const orderItemSchema = new Schema({
    food:{
        type: Schema.Types.ObjectId,
        ref: "Food",
        required: true,
    },
    quantity:{
        type: Number,
        required: true,
        min: 1,
        max:100
    },
    priceAtOrder: {
    type: Number,
    required: true,
    min: 0,
    },
    nameAtOrder: {
    type: String,
    required: true,
    },
}, { _id: false },);

const orderSchema =new Schema({
    user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    },
    items: {
    type: [orderItemSchema],
    required: true,
    validate: {
        validator: (items: unknown[]) => items.length > 0,
        message: "An order must contain at least one item",
    },
    },
    total: {
    type: Number,
    required: true,
    min: 0,
    },
    status: {
    type: String,
    enum: [
        "pending",
        "confirmed",
        "preparing",
        "ready",
        "delivered",
        "cancelled",
    ],
    default: "pending",
    },
    deliveryAddress: {
    type: String,
    required: true,
    trim: true,
    maxlength: 300,
    },
},{timestamps: true});
export const Order = model("Order", orderSchema);