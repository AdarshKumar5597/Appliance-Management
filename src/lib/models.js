const { default: mongoose, mongo } = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        min: 3,
        max: 20
    },
    email: {
        type: String,
        required: true,
        unique: true,
        max: 50
    },
    password: {
        type: String,
        min: 6
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
});

const historySchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    appliance: {
        type: String,
        required: true,
    },
    success: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    value: {
        type: String,
        required: true
    }
});

export const User = mongoose.models.User || mongoose.model("User", userSchema);
export const History = mongoose.models.History || mongoose.model("History", historySchema);