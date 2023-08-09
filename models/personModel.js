const mongoose = require("mongoose")

const personSchema = new mongoose.Schema({
    personName: {
        type : String,
        required: true
    },
    personNumber: {
        type : String,
        required: true
    },
    personProfile: {
        type : String,
        required: true
    }
}, {timestamps: true})

const personModel = mongoose.model("personProfile", personSchema)
module.exports = personModel