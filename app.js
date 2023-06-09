const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
});

app.post("/",function(req,res){
    const query = req.body.cityname;
    const apikey= "1730d48167a33b8fe9fafc64e8ef3289";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+ "&units="+unit+ "&appid=" +apikey;

    https.get(url,function(response){
        console.log(response.statusCode);

        response.on("data",function(data){
            res.setHeader('Content-Type', 'text/html');
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const Weatherdescription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageurl = " https://openweathermap.org/img/wn/"+icon+"@2x.png";

            res.write("<p>The weather is currently "+Weatherdescription+"</p>");
            res.write("<h1>The temperature in "+query+" is "+temp+" degrees Celcius</h1>");
            res.write("<img src="+imageurl+">");
            res.send();
        });
    });
});

app.listen(3000,function(){
    console.log("Server is running on port 3000");
});


















