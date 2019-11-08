const mongoose = require("mongoose");
const { Schema } = mongoose;

const careerSchema = new Schema(
    {
        raw: String,
        type: {
            type: String,
            enum: ["Politics", "Academic"],
            default: "Politics"
        }
    },
    {
        timestamps: { createdAt: true, updatedAt: true }
    }
);

const Career = mongoose.models.Career || mongoose.model("Career", careerSchema);

module.exports = Career;
