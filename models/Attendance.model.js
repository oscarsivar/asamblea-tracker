const mongoose = require("mongoose");
const { Schema } = mongoose;

const attendanceSchema = new Schema(
    {
        present: Schema.Types.Boolean,
        alternate: String,

        plenary: { type: Schema.Types.ObjectId, ref: "Plenary" },
        deputy: { type: Schema.Types.ObjectId, ref: "Deputy" }
    },
    {
        timestamps: { createdAt: true, updatedAt: true }
    }
);

const Attendance =
    mongoose.models.Attendance ||
    mongoose.model("Attendance", attendanceSchema);

module.exports = Attendance;
