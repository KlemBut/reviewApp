const express = require('express')
const app = express()
const cors = require("cors")
const mongoose = require("mongoose")
const session = require("express-session")
require("dotenv").config()

mongoose.connect("mongodb+srv://admin:klemis@cluster0.2s1ijtw.mongodb.net/?retryWrites=true&w=majority")
    .then(res => {
        console.log('all good, database connected')
    }).catch(e => {
    console.log(e)
})

app.listen(4001)



app.use(
    session({
        secret: process.env.SESSION_KEY,
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false },
    })
);
app.use(cors({origin: true, credentials: true, methods: "GET,HEAD,PUT,PATCH,POST,DELETE"}))

app.use(express.json())



const router = require("./router/mainRouter")
app.use("/", router)