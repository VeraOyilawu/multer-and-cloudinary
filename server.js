const express =require("express")
const PORT = 1616
const db = require("./config/profileDB")
const router = require("./routes/personRouter")

const app = express()
app.use(express.json())
app.use("/uploads", express.static("uploads"))
app.use(router)

app.listen(PORT, ()=>{
    console.log(`SERVER IS LISTENING TO PORT ${PORT}`);
})