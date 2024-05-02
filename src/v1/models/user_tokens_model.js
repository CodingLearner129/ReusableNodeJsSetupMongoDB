import mongoose from "mongoose";

// create schema 
const userTokensSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.ObjectId,
        ref: 'user'
    },
    fcm_token: {
        type: String,
        trim: true,
    },
    device_token: {
        type: String,
        trim: true,
    },
    created_at: {
        type: Number,
        default: 0
    },
    updated_at: {
        type: Number,
        default: 0
    },
    deleted_at: {
        type: Number,
        default: 0
    }
}, {
    timestamps: false
});

// create model
const userTokens = mongoose.model("user_tokens", userTokensSchema); //where "user" is model name which is used for relationship

export { userTokens };