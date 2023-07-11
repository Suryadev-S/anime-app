const path = require("path");
const express = require("express");

const app = express();

//setting public folder
app.use(express.static('public'));

//setting views and engine
app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');

//routes
app.get("/",(req,res)=>{
    res.render('Home');
})


app.listen(3000,()=>{
    console.log("port connected");
})