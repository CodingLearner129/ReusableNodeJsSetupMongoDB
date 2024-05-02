import mongoose from "mongoose";

// create schema 
const adminSchema = new mongoose.Schema({
    full_name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    profile: {
        type: String,
        required: true,
        trim: true,
    },
    created_at: {
        type: Number,
        required: false,
        default: 0
    },
    updated_at: {
        type: Number,
        required: false,
        default: 0
    },
}, {
    timestamps: false,
});

// create model
const admin = mongoose.model("admin", adminSchema); //where "user" is model name which is used for relationship

export { admin };