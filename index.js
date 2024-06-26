// import path from 'path'
// import { fileURLToPath } from 'url'
// import dotenv from 'dotenv'
// import chalk from 'chalk' 

const path = require('path');
 const { fileURLToPath }  = require('url');
 const dotenv = require('dotenv');
 const chalk = require('chalk');
 const express = require('express');
 const initApp = require('./src/index.router.js');





//set directory dirname 
// const __dirname = path.dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: path.join(__dirname, './config/.env') })
// import express from 'express'
// import initApp from './src/index.router.js'
// import { date } from 'joi'
const app = express()
// setup port and the baseUrl
const port = process.env.PORT || 5000
app.set('case sensitive routing' , true);
initApp(app ,express)

console.log(new Date());
app.listen(port, () => console.log(chalk.blueBright(`Example app listening on port ${port}!`)))

app.use("/" , (req,res)=> {
return res.send("Hello World")
})
module.exports =  app 