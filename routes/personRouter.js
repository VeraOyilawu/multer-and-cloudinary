const express = require("express")
const router= express.Router()
const {createProfile, getPersons, onePerson, updatePerson, deletePerson} = require("../controller/personController")
const upload = require("../utils/multer")
const validatePerson = require("../middleWare/personValidation")

// router.post("/profile", upload.single("personProfile"), createProfile)
router.post("/profile", validatePerson, upload.single("personProfile"), createProfile)
router.get("/profile", getPersons)
router.get("/profile/:id", onePerson)
router.put("/profile/:id", upload.single("personProfile"), updatePerson)
router.delete("/profile/:id", deletePerson)

module.exports = router