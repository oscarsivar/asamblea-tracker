const mongoose = require("mongoose");
const { Schema } = mongoose;

const congressSchema = new Schema(
    {
        periodStart: Date,
        periodEnd: Date,
        lastElection: Date,
        nextElection: Date
    },
    {
        timestamps: { createdAt: true, updatedAt: true }
    }
);

const Congress =
    mongoose.models.Congress || mongoose.model("Congress", congressSchema);

module.exports = Congress;
