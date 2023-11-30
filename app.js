const express = require("express")
const fs = require('fs');
const routes = require('./route/Route')

const app = express()

// middleware
app.use(express.json())

// route
app.use('/', routes)

//start server
app.listen(3000, ()=>{
    console.log("listeniing at port:3000")
}) 