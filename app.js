const path = require("path");
const express = require("express");
const axios = require('axios');

const app = express();

//setting public folder
app.use(express.static('public'));

//setting views and engine
app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');

async function returnObject(object){
    return await object.json;
}

//routes
app.get("/",(req,res)=>{
    let data;
    axios.get('https://api.jikan.moe/v4/seasons/now').then((response)=>{
        let dataObject = response.data; 
        // console.log(response.data);
        res.render('current',{dataArray: dataObject.data,pages: dataObject.pagination});
    })
})


app.listen(3000,()=>{
    console.log("port connected");
})