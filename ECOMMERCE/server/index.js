const express = require('express')
const app = express()
const { default: mongoose } = require('mongoose');
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv').config();
const routes = require('./src/routes');
const cookieParser = require('cookie-parser')

const corsOption = {
    origin: [process.env.PORT_REACT],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],    // fix bug lỗi cors ERR_NETWORK
}
app.use(cors(corsOption));


app.get('/', (req, res, next) => {
    res.send('hello')
})

// app.use(bodyParser.json())
app.use(bodyParser.json({ limit: '50mb' })); // fix PayloadTooLargeError: request entity too large

app.use(cookieParser())
routes(app)

mongoose.connect(process.env.MONGO_DB)
    .then(() => {
        console.log('connec db success!')
    })
    .catch((err) => {
        console.log(err)
    })

const port = process.env.PORT || 3001
app.listen(port, () => {
    console.log('server is running in port' + port)
}) 
