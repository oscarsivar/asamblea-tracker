const mongoose = require("mongoose");
const { Schema } = mongoose;

const deputySchema = new Schema(
    {
        name: String,
        department: String,
        pictureEndpoint: String,
        profileEndpoint: String,
        uniqueHash: String,
        congressFk: Schema.Types.ObjectId
    },
    {
        timestamps: { createdAt: true, updatedAt: true }
    }
);

const Deputy = mongoose.models.Deputy || mongoose.model("Deputy", deputySchema);

module.exports = Deputy;
