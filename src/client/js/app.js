import { countDown } from "./countdown";
import { checkReturnDay } from "./checkReturnDay";

// APIs

//Weatherbit API
const WEATHER_BASE_URL = "https://api.weatherbit.io/v2.0/forecast/daily?";
const WEATHER_API_KEY = "52cdeaaeea37459e847178fae7de0d57";

//Pixabay API
const PIXABAY_BASE_URL = "https://pixabay.com/api/?key=";
const PIXABAY_API_KEY = "23698861-193854710cfb9e8a1a04fc94c";
const PIXABAY_restURL = "&image_type=photo&editors_choice=true&per_page=3";

/* Global Variables  */
const server = "http://localhost:8081/";
const cityName = document.getElementById("city");
const leaving = document.getElementById("leaving-date");
const returnDate = document.getElementById("return-date");
const title = document.getElementById("city-name");
const cardInfo = document.getElementById("card-info");
const cardSection = document.getElementById("card-section");
const card = document.getElementById("card");
const submitBtn = document.getElementById("btn");
const printBtn = document.getElementById("print-btn");
const clearBtn = document.getElementById("clear-btn");

const cleanData = () => {
  cityName.value = "";
  leaving.value = "";
  returnDate.value = "";
};

const gatheringData = () => {
  let requiredData = {
    cityName: cityName.value,
    leaving: leaving.value,
    returnDate: returnDate.value,
  };

  let grabData = getDestinationInfo(requiredData);

  grabData
    .then((info) => {
      //calculate the duration for a user trip in days
      let duration = checkReturnDay(leaving.value, returnDate.value);

      //depend on the  duration (days) different type of weather forecast return
      duration > 7
        ? //call forecast weather API and give the further info
          weatherForcast(info.latitude, info.longitude, info.cityName)
        : //call the current weather API with limit info
          curentWeather(info.latitude, info.longitude, info.cityName);
    })
    .then(() => {
      //get the image related to the user 'destination'
      getImage();
    })
    .catch((error) => {
      alert("Invalid location name, please try again.");
      console.log(error);
    });
};
const getDestinationInfo = async (data) => {
  let res = await fetch(`${server}postData`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  try {
    const resData = await res.json();

    return resData;
  } catch (error) {
    console.log(error);
  }
};

async function curentWeather(latitude, longitude) {
  let WEATHER_BASE_URL = "http://api.weatherbit.io/v2.0/current?";
  const fullURL = `${WEATHER_BASE_URL}lat=${latitude}&lon=${longitude}&key=${WEATHER_API_KEY}`;

  try {
    const res = await fetch(fullURL);
    const currWeatherbitData = await res.json();

    let cityInfo = [
      {
        temp: currWeatherbitData.data[0].temp,
        cityName: currWeatherbitData.data[0].timezone,
        countryCode: currWeatherbitData.data[0].country_code,
        description: currWeatherbitData.data[0].weather.description,
      },
    ];

    prepareCardCurrent(cityInfo);
    return cityInfo;
  } catch (error) {
    console.log(error);
  }
}

async function weatherForcast(latitude, longitude) {
  const fullURL = `${WEATHER_BASE_URL}lat=${latitude}&lon=${longitude}&key=${WEATHER_API_KEY}`;

  try {
    const res = await fetch(fullURL);
    const weatherbitData = await res.json();
    let cityInfo = [
      {
        temp: weatherbitData.data[0].temp,
        lowTemp: weatherbitData.data[0].low_temp,
        maxTemp: weatherbitData.data[0].max_temp,
        cityName: weatherbitData.city_name,
        countryCode: weatherbitData.country_code,
        description: weatherbitData.data[0].weather.description,
      },
      {
        temp: weatherbitData.data[3].temp,
        lowTemp: weatherbitData.data[3].low_temp,
        maxTemp: weatherbitData.data[3].max_temp,
        date: weatherbitData.data[3].valid_date,
        description: weatherbitData.data[3].weather.description,
      },
      {
        temp: weatherbitData.data[8].temp,
        lowTemp: weatherbitData.data[8].low_temp,
        maxTemp: weatherbitData.data[8].max_temp,
        date: weatherbitData.data[8].valid_date,
        description: weatherbitData.data[8].weather.description,
      },
    ];
    prepareCardForcast(cityInfo);

    return cityInfo;
  } catch (error) {
    console.log(error);
  }
}

async function getImage() {
  const fullURL = `${PIXABAY_BASE_URL}${PIXABAY_API_KEY}&q=${cityName.value}${PIXABAY_restURL}`;
  const res = await fetch(fullURL);
  const pixabyData = await res.json();

  let src = pixabyData.hits[0].largeImageURL;

  //add image to the UI
  appendImg(src);
}

const appendImg = (src) => {
  const imgContainer = document.getElementById("city-image");
  imgContainer.setAttribute("src", src);
};

function prepareCardCurrent(info) {
  title.innerHTML = `${cityName.value}-${info[0].countryCode}`;
  cardInfo.innerHTML = `
    <h2>Destination  - ${info[0].cityName} 
    <p>Start ${leaving.value} End ${
    returnDate.value
  } <br>Duration ${checkReturnDay(
    leaving.value,
    returnDate.value
  )} days</p></h2>
      <h3>Typical weather for then is</h3>
      <h4>Tempreture : ${info[0].temp}</h4>
      <h4 class="desc">quick description <br> ${info[0].description}</h4>
     `;
  cardSection.classList.remove("hidden");
}

function prepareCardForcast(info) {
  title.innerHTML = `${info[0].cityName}-${info[0].countryCode}`;

  cardInfo.innerHTML = `
    <h2>Destination  - ${info[0].cityName}</h2>
    <p>Start ${leaving.value} End ${returnDate.value} </p>
  <p id="duration">Duration ${checkReturnDay(
    leaving.value,
    returnDate.value
  )} days</p>
      <h2>Typical weather for then is</h2>
      <p>Tempreture : ${info[0].temp}</p>
      <p>Low-temperature  ${info[0].lowTemp} and the Max-temperature is ${
    info[0].maxTemp
  }</p>
      <h2 class="desc">quick description</h2>
      <p>${info[0].description}</p>
    <hr>
    <h2 class="more-info-title">more weather info 🔽</h2>
    <div class="more-info-container">
    <div class="more-info first">
       <h4>Typical weather for ${info[1].date}</h4>
          <h5>Tempreture : ${info[1].temp}</h5>
          <p>Low-temperature  ${info[1].lowTemp} and the Max-temperature is ${
    info[1].maxTemp
  }</p>
       <h4 class="desc">quick description <br> ${info[1].description}</h4>
       </div>
       <div class="more-info">
      <h4>Typical weather for ${info[2].date}</h4>
        <h5>Tempreture : ${info[2].temp}</h5>
        <p>Low-temperature  ${info[2].lowTemp} and the Max-temperature is ${
    info[1].maxTemp
  }</p>
      <h4 class="desc">quick description <br> ${info[2].description}</h4>
  </div>
  </div>`;

  cardSection.classList.remove("hidden");
}

//only to the forecast API call
const sohwMoreINfo = (el) => {
  el.classList.contains("more-info-title")
    ? el.nextElementSibling.classList.toggle("show")
    : "";
};

function checkDate(date) {
  if (date.includes("-")) {
    let spiltDate = date.split("-");
    let m = parseInt(spiltDate[1]);
    let d = parseInt(spiltDate[2]);
    let y = parseInt(spiltDate[0]);
    let month = m < 10 ? "0" + m : m;
    let day = d < 10 ? "0" + d : d;
    let dateInfo = {
      month: month,
      day: day,
      year: y,
    };
    countDown(dateInfo);
  } else {
    alert("invalid date format make sure to use (-) in your format");
    return false;
  }
}

function handilingError() {
  alert("invalid input  please try again");
}

//event
const addTripEvent = submitBtn.addEventListener("click", () => {
  if (cityName.value == "" || leaving.value == "" || returnDate.value == "") {
    handilingError();
  } else {
    checkDate(leaving.value);
    gatheringData();
  }
});

clearBtn.addEventListener("click", cleanData);

cardInfo.addEventListener("click", (e) => {
  sohwMoreINfo(e.target);
});

const printCardBtn = printBtn.addEventListener("click", () => window.print());
export {
  gatheringData,
  sohwMoreINfo,
  addTripEvent,
  printCardBtn,
  handilingError,
};
