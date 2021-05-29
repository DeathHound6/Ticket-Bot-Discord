const { Schema, model } = require("mongoose");

let schema = new Schema({
    guild: String,
    prefix: String
});
exports.settings = model("Setting", schema);