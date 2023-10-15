const express = require('express');
const app = new express();
const router = require('./src/routes/api');
const cookieParser = require('cookie-parser');
const cors = require('cors');
var hpp = require('hpp');
//var sanitizerPlugin = require(ExpressMongoSanitize);
const helmet = require('helmet');
const ratelimit = require('express-rate-limit');
const ExpressMongoSanitize = require('express-mongo-sanitize');
//const { default: mongoose } = require('mongoose');

//db lib import
const mongoose = require('mongoose');
app.use(express.static('client/build'));






app.use(cookieParser());
app.use(express.json());
app.use(cors());
app.use(hpp());
app.use(ExpressMongoSanitize());
app.use(helmet());


//mongo db connection establishment

let URI="mongodb+srv://<username>:<password>@cluster0.mjrccrh.mongodb.net/CRUD"
//let URI="mongodb://127.0.0.1:27017/CRUD"
let OPTION={user:'tanbin5036',pass:'tanbin5036',autoIndex:true}
// mongoose.connect(URI,OPTION,(error)=>{
//     console.log("connection success")
//     console.log("error")
// });

mongoose.connect(URI,OPTION).then((res) => {
    console.log("Database connected");
  }).catch(error => {
     console.log(error);
   });


app.use('/',router);

app.use((req,res)=>{
    res.status(404).send('404 not found');
})

module.exports=app;



