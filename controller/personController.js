const personModel = require("../models/personModel")
const cloudinary = require("../utils/cloudinary")
const fs = require("fs")
const {validation} = require("../middleWare/personValidation")

const createProfile =async( req, res) => {
    try {
        const {personName, personNumber} = req.body
        res.status(409).json({
            message:error.details[0].message
        })
        const result = await cloudinary.uploader.upload(req.file.path)
        const newPerson = new personModel({
            personName,
            personNumber,
            personProfile: result.secure_url
        })

        const savedPerson = await newPerson.save()
        if(savedPerson) {
            res.status(201).json({
                message: "profile created sucessfully",
                data: savedPerson
            })
        } else {
            res.status(400).json({
                message: "unable to create profile"
            })
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const getPersons = async(req, res) => {
    try {
        const persons = await personModel.find()
        if (!persons) {
            res.status(400).json({
                message: "persons not found"
            })
        } else {
            res.status(200).json({
                message: "persons found are "+ persons.length,
                data: persons
            })
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const onePerson = async(req, res) => {
    try {
        const {id} = req.params
        const person = await personModel.findById(id)

        res.status(200).json({
            message: "the profile ",
            data: person
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const updatePerson = async(req, res) => {
    try {
        const {id} = req.params
        const person = await personModel.findById(id)
        const {personName, personNumber} = req.body

        if(person) {
            if(person.personProfile) {
                const public_id = person.personProfile.split("/").pop().split(".")[0]
                await cloudinary.uploader.destroy(public_id)
            }

            const result = cloudinary.uploader.upload(req.file.path)
            person.personName = personName
            person.personNumber = personNumber
            person.personProfile = result.secure_url

            res.status(200).json({
                message: "updated sucessfully",
                data: result
            })
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        }) 
    }
}

const deletePerson = async(req, res) => {
    try {
        const {id} = req.params
        const person = await personModel.findById(id)
        const {personName, personPhone} = req.body

        if(person) {
            if(person.personProfile) {
                const public_id = person.personProfile.split("/").pop().split(".")[0]
                await cloudinary.uploader.destroy(public_id)
            }

            res.status(200).json({
                message: "deleted sucessfully",
            })
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        }) 
    }
}

module.exports = {
    createProfile,
    getPersons,
    onePerson,
    updatePerson,
    deletePerson
    
}