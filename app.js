// Modules
const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

// Variables
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res) {
  const cityName = req.body.cityName;

  if (cityName != "") {
    const apiKey = "2290798fcd897101c360105c5dfe46d6";
    const units = "metric";
    const url = `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&units=${units}&q=${cityName}`;

    https.get(url, function(response) {
      if (response.statusCode == 200) {
        response.on("data", function(data) {
          const weatherData = JSON.parse(data);
          const weatherDataName = weatherData.name;
          const temp = weatherData.main.temp;
          const weatherDescription = weatherData.weather[0].description;
          const weatherIcon = weatherData.weather[0].icon;
          const weatherIconImageUrl = `http://openweathermap.org/img/wn/${weatherIcon}@2x.png`;

          res.send(`<h1>The weather in ${weatherDataName} is currently ${weatherDescription}
            <img src="${weatherIconImageUrl}" alt="${weatherIcon}" />.<br>
                    The temperature in ${weatherDataName} is ${temp} degrees Celsius.</h1>`);
        });
      }
    });
  }
});



app.listen(port, function() {
  console.log(`Server is now running on port ${port}.`);
});
