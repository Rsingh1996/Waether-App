const express = require("express");
const https = require("https");
const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));


app.get("/", function (req, res) {
    res.sendFile(__dirname+"/index.html");
});

app.post("/", function (req, res) {
    res.setHeader("Content-type", "text/html");
    const query = req.body.cityName;
    const apiKey = "eef50fc51bc614c374bb44111ff3d9cd";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit + "";

    https.get(url, function (response) {

        response.on("data", function (data) {
            const weather = JSON.parse(data);
            const temp = weather.main.temp
            const weatherDescription = weather.weather[0].description
            const icon = weather.weather[0].icon
            const imgURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"

            
            res.write("<h1 style= 'font-size: 3.5rem';>The temperature in " + query + " is " + temp + " degree Celcius.</h1>");
            res.write("<h3 style='font-size: 2rem; color:blue';>The weather is currently " + weatherDescription + ".</h3>");
            res.write("<img  width='200px'; src=" + imgURL + " style='text-align:center';>");
            res.send();
        });
    });
});

app.listen(PORT, () => console.log(`Listening on port: ${ PORT }`));    
