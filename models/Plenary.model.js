const mongoose = require("mongoose");
const { Schema } = mongoose;

const plenarySchema = new Schema(
    {
        number: Number,
        attendanceEndpoint: String,
        type: { type: String, enum: ["Ordinaria", "Extraordinaria"] },
        occurredOn: { type: Date, default: new Date() },
        congress: { type: Schema.Types.ObjectId, ref: "Congress" },
    },
    {
        timestamps: { createdAt: true, updatedAt: true },
    }
);

const Plenary =
    mongoose.models.Plenary || mongoose.model("Plenary", plenarySchema);

module.exports = Plenary;
