const mongoose = require('mongoose')

const dataSchema = new mongoose.Schema(
    {
        name: {
            type: String
        },
        image: {
            type: String,
            required: true,
        }
    }
)
module.exports = mongoose.model('connection-data', dataSchema)
