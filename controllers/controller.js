const Scoreboard = require("../models/Scoreboard")
const Joi = require('@hapi/joi');
const schema = Joi.object({
    name: Joi.string().min(3).max(20).required(),
    score: Joi.number().min(1).required()
})

async function getScoreBoard(req, res, next) {
    let scoreboard
    try {
        scoreboard = await Scoreboard.find().sort({ score: -1 })
        if (scoreboard == null) {
            return res.status(404).json({ "message": "No Scores found" })
        }

    } catch (err) {
        return res.status(500).json({ message: err.message })

    }
    res.scoreboard = scoreboard
    next()
}


async function postScoreBoard(req, res, next) {

    try {
        let data = req.body
        validateData = schema.validate(data)
        if (!validateData.error) {

            const { name, score } = req.body
            const response = await Scoreboard.findOne({ name: name })
            if (response == null) {
                let scoreboard = new Scoreboard({
                    name,
                    score
                })
                const saveScore = await scoreboard.save()
                res.score = saveScore

            }
            if (response) {
                await Scoreboard.findOneAndUpdate({ name: req.body.name }, { score: req.body.score }, {
                    new: true
                })
                res.json({ message: "Players exists and score has been updated" })


            }


        } else res.send(validateData.error.details[0].message)

    } catch (err) {
        res.status(400).json({ message: err.message })
    }

    next()
}

async function removeByName(req, res, next) {

    try {
        await Scoreboard.findOneAndRemove({ name: req.body.name }, function (err, output) {
            if (err) return res.json({ message: err.message })
            if (!output) res.json({ message: "Name is not found" })
            else res.json({ message: "Player with Name is deleted" })


        })



    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
    next()
}

async function removeByID(req, res, next) {
    try {
        console.log(req.params.id)
        await Scoreboard.findByIdAndRemove(req.params.id, function (err, output) {
            if (err) return res.json({ message: err.message })
            if (!output) res.json({ message: "ID is not found" })
            else res.json({ message: "Player with ID is deleted" })
        })


    } catch (err) {
        return res.status(500).json({ message: err.message })

    }
    next()
}

async function findByName(req, res, next) {
    try {
        const response = await Scoreboard.findOne({ name: req.body.name })
        if (response == null) return res.send("Not Found")
        res.response = response

    } catch (err) {
        res.status(400).json({ message: err.message })
    }
    next()
}

async function findByID(req, res, next) {
    try {
        const response = await Scoreboard.findById(req.params.id)
        if (response == null) return res.send("Not Found")
        res.response = response

    } catch (err) {
        res.status(400).json({ message: err.message })
    }
    next()
}

module.exports.getScoreBoard = getScoreBoard
module.exports.postScoreBoard = postScoreBoard
module.exports.findByName = findByName
module.exports.findByID = findByID
module.exports.removeByName = removeByName
module.exports.removeByID = removeByID
