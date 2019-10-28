const mongoose = require("mongoose");

const sampleSchema = new mongoose.Schema({
    App: String,
    Developer: String
});

var Sample = mongoose.models.Sample || mongoose.model("Sample", sampleSchema);

module.exports = Sample;
