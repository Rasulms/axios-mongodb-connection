const express = require('express')
const app = express();
const PORT = 5000;
const mongoose = require('mongoose')
const bodyparser = require('body-parser')
const cors = require('cors')

main()
app.use(cors());
app.use(express.json())
app.use(bodyparser.urlencoded({ extended: true }))
app.use(bodyparser.json())

app.use('/api', require('../Routes/api/dataAPI'))



async function main() {
    await mongoose.connect('mongodb://0.0.0.0:27017/Image-upload').then(
        () => console.log('Database connected successfully')).catch(err => console.log(err.message))
}

app.listen(PORT, () => { console.log(`Server started Succesfully on ${PORT}`) })