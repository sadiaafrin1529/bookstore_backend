// const express = require('express')
// const dotenv = require('dotenv')
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import bookRoute from './route/book.route.js'
import userRoute from './route/user.route.js'

const app = express()
// const cors = require('cors')
app.use(cors())
app.use(express.json())
dotenv.config();

const port= 4000;
const URI = process.env.MongoDBURI;

//connect to mongodb
try {
    mongoose.connect(URI,
    {useNewUrlParser:true},
    {useUnifiedTopology: true }
    )
    console.log("Connect to mongodb")
} catch (error) {
    console.log("error:", error);
}
app.use('/book', bookRoute)
app.use('/user', userRoute)


app.get('/', async (req, res) => {
  res.send("welcome to bookstore backend")
})

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`)
})