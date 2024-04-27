const express = require('express');
const connectdb = require('./config/dbConnection');
const dotenv = require("dotenv").config();
connectdb();
const app = express();
app.use(express.json());

module.exports=app;
