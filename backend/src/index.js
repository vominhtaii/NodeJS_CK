const express = require('express');
const dotenv = require('dotenv');
const {default: mongoose} = require('mongoose'); 
const routes = require('./routes')
dotenv.config()

const app = express()
const port = process.env.PORT || 3001;

routes(app);

mongoose.connect('mongodb+srv://root:123@cluster0.9thcp.mongodb.net/Shop_management?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => {
        console.log('Connect Db success');
    })
    .catch((err) => {
        console.log(err);
        
    })

app.listen(port, () => {
    console.log('Server started at http://localhost:' + port);
})