const mongoose = require("mongoose");
const { Schema } = mongoose;

const partySchema = new Schema(
    {
        name: String,
        flagEndpoint: String,
        numberDeputies: Number
    },
    {
        timestamps: { createdAt: true, updatedAt: true }
    }
);

const Party = mongoose.models.Party || mongoose.model("Party", partySchema);

module.exports = Party;
