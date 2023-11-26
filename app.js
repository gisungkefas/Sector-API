const express = require("express");
const cors = require("cors")
const mongoose = require("mongoose");
require('dotenv').config()

const userRoute = require('./route/userDataRoute')

const app = express();

app.use(express.json());
app.use(cors())

app.use('/api', userRoute)

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("connected to database"))
  .catch((err) => console.log("Error", err));



const port = process.env.PORT || 3001
app.listen(port, () => console.log("connected on port 3001"));