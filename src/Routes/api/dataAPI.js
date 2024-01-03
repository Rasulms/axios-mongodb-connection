const express = require('express')
const Router = express.Router()
const DataSchema = require('../../Model/dataSchema')


Router.route('/').get(
    async (req, res) => {
        try {
            const resultData = await DataSchema.find()
            res.json(resultData)

        } catch (err) {
            console.log(err);
            res.status(500).send("server error")
        }

    }
)
Router.route('/post').post(
    async (req, res) => {
        console.log('request body :', req.body);

        try {
            const resultData = await DataSchema.create({
                name: req.body.name,
                image: req.body.image,
            })
            console.log(resultData);
            console.log('posted successfully');

        } catch (err) {
            console.log(err);
            res.status(500).send("server error")
        }

    })
module.exports = Router;