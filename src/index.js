const express = require("express");
const connect= require("./configs/db");
const userController = require("./controllers/user.controller")

const User = require("./models/user.model");

const {register,login} = require("./controllers/auth.controller");

const app = express();

app.use(express.json());

app.listen(6400, async()=>{
    try {
        await connect();
        console.log("listening port 6400")
    } catch (err) {
        console.log("error:", err)
    }
});