var path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

// create  instance
const app = express();

const cors = require("cors");
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static("dist"));

console.log(__dirname);

app.get("/", function (req, res) {
  // res.sendFile('dist/index.html')
  res.sendFile(path.resolve("src/client/views/index.html"));
});

// Geonames API
const GEONAMES_BASE_URL =
  "http://api.geonames.org/searchJSON?formatted=true&q=";
const GEONAMES_API_KEY = "siham";
const GEONAMES_restURL = `&username=${GEONAMES_API_KEY}&style=full`;
let info = {
  cityName: "",
  latitude: "",
  longitude: "",
};
app.post("/postData", async (req, res) => {
  const fullURL = `${GEONAMES_BASE_URL}${req.body.cityName}${GEONAMES_restURL}`;
  const response = await axios.post(fullURL);
  const resData = await response.data;

  //get lat and lng
  (info.cityName = req.body.cityName),
    (info.latitude = resData.geonames[0].lat),
    (info.longitude = resData.geonames[0].lng);
  console.log(info);
  res.send(info);
});

const port = 8081;

// designates what port the app will listen to for incoming requests
app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`);
});
