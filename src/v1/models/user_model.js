import mongoose from "mongoose";

// create schema 
const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        trim: true,
    },
    last_name: {
        type: String,
        trim: true,
    },
    gender: {
        type: Number,
        comment: "0 = Male, 1 = Female, 2 = Non-binary, 3 = Prefer Not to say"
    },
    country_code: {
        type: String,
        default: "",
    },
    phone: {
        type: Number,
        default: 0,
    },
    dob: {
        type: Number,
    },
    profile: {
        type: String,
    },
    bio: {
        type: String,
    },
    height: {
        type: Number,
    },
    height_type: {
        type: Number,
        default: 0,
        comment: "0 = cm, 1 = ft"
    },
    weight: {
        type: Number,
    },
    weight_type: {
        type: Number,
        default: 0,
        comment: "0 = kg, 1 = lbs"
    },
    dietary: {
        type: Number,
        comment: "0 = Diet, 1 = Mobility, 2 = Structure"
    },
    fitness_goals: {
        type: Array,
        comment: "0 = Aesthetics, 1 = Weight Loss, 2 = Weight Gain, 3 = Strength, 4 = Competition, 5 = Endurance"
    },
    email: {
        type: String,
        // unique: true,
        lowercase: true,
        trim: true,
        default: ""
    },
    location: {
        type: {
            type: String,
            // default: 'Point',
            enum: ['Point']
        },
        coordinates: {
            type: [Number], // Array of numbers for coordinates
            // default: [0, 0] // Default coordinates (longitude, latitude)
        },
        address: String,
        description: String
    },
    postcode: {
        type: String,
        trim: true,
    },
    insta_link: {
        type: String,
        trim: true,
    },
    is_plan_active: {
        type: Boolean,
        default: false,
    },
    allow_notification: {
        type: Boolean,
        default: true,
    },
    allow_dm: {
        type: Boolean,
        default: true,
    },
    profile_verified_at: {
        type: Number,
        default: 0
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

// userSchema.index({ country_code: 1, phone: 1 }, { unique: true }); // Define compound unique index
userSchema.index({ country_code: 1, phone: 1 }); // Define compound unique index
userSchema.index({ email: 1 }); // Define compound unique index
userSchema.index({ location: '2dsphere' });

// create model
const user = mongoose.model("user", userSchema); //where "user" is model name which is used for relationship

export { user };