const express = require('express');
const dotenv = require('dotenv');
const {default: mongoose} = require('mongoose'); 
const routes = require('./routes')
const bodyParser = require('body-parser')
dotenv.config()

const app = express()
const port = process.env.PORT || 3001;

app.use(bodyParser.json())

routes(app);

console.log('MONGO_DB Password:', process.env.MONGO_DB);

mongoose.connect(`mongodb+srv://root:${process.env.MONGO_DB}@cluster0.9thcp.mongodb.net/`)
    .then(() => {
        console.log('Connect Db success');
    })
    .catch((err) => {
        console.log(err);
    })


app.listen(port, () => {
    console.log('Server started at http://localhost:' + port);
})