const mongoose = require("mongoose")

const url = "mongodb://localhost/projectdb"

mongoose.connect(url)
.then(() => {
    console.log("connected.............");
})
.catch( () => {
    console.log("unable to connet.......");
})