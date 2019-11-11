const mongoose = require("mongoose");
const { Schema } = mongoose;

const deputySchema = new Schema(
    {
        name: String,
        department: String,
        pictureEndpoint: String,
        profileEndpoint: String,
        uniqueHash: String,
        numberPeriods: {
            type: Number,
            default: 1
        },
        firstPeriodOn: {
            type: Date,
            default: new Date()
        },
        congress: { type: Schema.Types.ObjectId, ref: "Congress" },
        party: { type: Schema.Types.ObjectId, ref: "Party" }
    },
    {
        timestamps: { createdAt: true, updatedAt: true }
    }
);

const Deputy = mongoose.models.Deputy || mongoose.model("Deputy", deputySchema);

module.exports = Deputy;
