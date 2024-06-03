const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose')
const cors = require('cors');
dotenv.config();
mongoose.connect(process.env.DB_STRING).then(() => {
    console.log("db connected");
}).catch((err) => {
    console.log(err);
});

const auth = require("./routes/authentication");
const watchlist = require('./routes/watchlist');


const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors());
app.use(auth);
app.use(watchlist);




app.listen(8080, () => {
    console.log("server started at 8080 port");
})