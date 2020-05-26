const mongoose = require("mongoose");

const Attendance = require("./Attendance.model");
const Congress = require("./Congress.model");
const Plenary = require("./Plenary.model");
const Deputy = require("./Deputy.model");
const Career = require("./Career.model");
const Party = require("./Party.model");

const connectDatabase = () => {
    const {
        MONGO_USER,
        MONGO_PASS,
        MONGO_HOST,
        MONGO_PORT,
        MONGO_DB,
    } = process.env;

    return mongoose.connect(
        `mongodb://${MONGO_USER}:${MONGO_PASS}@${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB}`,
        { useNewUrlParser: true, useUnifiedTopology: true }
    );
};

module.exports = {
    connectDatabase,
    models: { Attendance, Congress, Plenary, Deputy, Career, Party },
};
