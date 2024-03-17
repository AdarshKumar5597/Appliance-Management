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
    img: {
        type: String,
        default: ""
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    isUser: {
        type: Boolean,
        default: false,
    },
    isThirdPerson:{
        type: Boolean,
        default: true,
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    tasks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Task"
    }]
});

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        default: "assigned",
        enum: ["assigned", "completed"]
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
});

export const User = mongoose.models.User || mongoose.model("User", userSchema);
export const Task = mongoose.models.Task || mongoose.model("Task", taskSchema);