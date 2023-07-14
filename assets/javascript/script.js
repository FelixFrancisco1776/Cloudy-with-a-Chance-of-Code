var weatherContainer = document.getElementById('weather');
var historyContainer = document.getElementById('history');
var searchButton = document.getElementById('search-button');
var fiveDayContainer = document.getElementById('five-day-container');


// set up the API key
var APIkey = '306168e2a8d2686de286ec2757ccac79';


// function to get Weather API Data
function searchAPI(event) {
  event.preventDefault();
  var searchValue1 = document.getElementById('search-value').value;
  getApi(searchValue1);
  getFiveDay(searchValue1);
}

// function to get value of city input by user
function getApi(searchValue) {
  var requestUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&appid=${APIkey}&units=imperial`;

  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);

      $('#search-value').val('');

      var temp = document.createElement('span');
      temp.textContent = "Temperature: " + data.main.temp + " F";
      temp.classList = "list-group";

      var feelslike = document.createElement('span');
      feelslike.textContent = "Feels Like: " + data.main.feels_like + " F";
      feelslike.classList = "list-group";

      var cityNameEL = document.createElement('h3');
      cityNameEL.textContent = data.name;

      var humidity = document.createElement('span');
      humidity.textContent = "Humidity: " + data.main.humidity + ' %';
      humidity.classList = "list-group";

      var windSpeed = document.createElement('span');
      windSpeed.textContent = "Wind Speed: " + data.wind.speed + " mph";
      windSpeed.classList = "list-group";

      var lon = data.coord.lon;
      var lat = data.coord.lat;

      getUVIndex(lat, lon);

      weatherContainer.innerHTML = '';

      weatherContainer.append(cityNameEL, temp, feelslike, humidity, windSpeed);
      clearInterval(cityNameEL.name);
      localStorage.setItem('cityHistory', data.name);


      var searchNameEl = document.createElement('button');
      searchNameEl.style.display = "block";
      searchNameEl.textContent = data.name;
      searchNameEl.classList.add("history-button");
      historyContainer.append(searchNameEl);
      localStorage.setItem('cityHistory', data.name);

      // console.log(localStorage);

      var weatherIcon = document.createElement("img")
      weatherIcon.setAttribute("src", `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);
      cityNameEL.appendChild(weatherIcon);

      var currentDate = document.createElement("span")
      currentDate.textContent = " (" + moment(weather.dt).format("MMM D, YYYY") + ") ";
      cityNameEL.append(currentDate);

    });
}

// function to get UV Index
function getUVIndex(lat, lon) {
  var queryURL = `https://api.openweathermap.org/data/2.5/uvi?appid=${APIkey}&lat=${lat}&lon=${lon}`;
  fetch(queryURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      var UVIndex = document.createElement('span');
      uvi = parseFloat(data.value);
      UVIndex.textContent = "UV Index: " + data.value;
      UVIndex.style.width = "200px";

      // if (uvi < 2) {
      //   UVIndex.style.backgroundColor = "green";
      //       } else if (uvi < 5) {
      //           UVIndex.style.backgroundColor = "yellow";
      //       } else if (uvi < 6) {
      //           UVIndex.style.backgroundColor = "orange";
      //       } else if (uvi > 8) {
      //           UVIndex.style.backgroundColor = "red";
      //       } else (uvi < 8)  
      //           UVIndex.style.backgroundColor = "violet";


      console.log(data.value);
      UVIndex.classList = "list-group"

      weatherContainer.appendChild(UVIndex);


    });
}

searchButton.addEventListener('click', searchAPI);

// function to get 5 day forecast
function getFiveDay(searchValue) {
  var apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${searchValue}&units=imperial&appid=${APIkey}`
  console.log(apiUrl)
  console.log(searchValue)
  fetch(apiUrl)
      .then(function (response) {
          return response.json();
      })
      .then(function (data) {
          fiveDayContainer.innerHTML = '';
          for (let i = 0; i < data.list.length; i += 8) {
              console.log(data.list[i])
              var div = document.createElement("div");
              div.style.display = "inline-block";
              div.setAttribute('class', 'col-md-2 background-blue col-sm-6')
              var currentDate = document.createElement("span")
              currentDate.textContent = moment(data.list[i].dt_txt).format('MMM D, YYYY ');
              div.appendChild(currentDate)
              var temp = document.createElement('span');
              temp.textContent = "Temperature: " + data.list[i].main.temp + ' F';
              temp.classList = "list-group"
              div.appendChild(temp)
              
              var feelslike = document.createElement('span');
              feelslike.textContent = "Feels like: " + data.list[i].main.feelslike + ' F';
              feelslike.classList = "list-group"
              div.appendChild(feelslike)

              var humidity = document.createElement('span');
              humidity.textContent = "Humidity: " + data.list[i].main.humidity + ' %';
              humidity.classList = "list-group"
              div.appendChild(humidity)
              var weatherIcon = document.createElement("img")
              weatherIcon.setAttribute("src", `https://openweathermap.org/img/wn/${data.list[i].weather[0].icon}@2x.png`);
              div.appendChild(weatherIcon);
              fiveDayContainer.appendChild(div)
          }
      });
}

function historySearch(citySearch) {
  // var citySearch = document.querySelector('.history-button').innerHTML;
  console.log(citySearch);
  
  var requestUrl = `https://api.openweathermap.org/data/2.5/weather?q=${citySearch}&appid=${APIkey}&units=imperial`;

  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);

      $('#search-value').val('');

      var temp = document.createElement('span');
      temp.textContent = "Temperature: " + data.main.temp + " F";
      temp.classList = "list-group";

      var feelslike = document.createElement('span');
      feelslike.textContent = "Feels Like: " + data.main.feels_like + " F";
      feelslike.classList = "list-group";

      var cityNameEL = document.createElement('h3');
      cityNameEL.textContent = data.name;

      var humidity = document.createElement('span');
      humidity.textContent = "Humidity: " + data.main.humidity + ' %';
      humidity.classList = "list-group";

      var windSpeed = document.createElement('span');
      windSpeed.textContent = "Wind Speed: " + data.wind.speed + " mph";
      windSpeed.classList = "list-group";

      var lon = data.coord.lon;
      var lat = data.coord.lat;

      getUVIndex(lat, lon);

      weatherContainer.innerHTML = '';

      weatherContainer.append(cityNameEL, temp, feelslike, humidity, windSpeed);
      clearInterval(cityNameEL.name);
      localStorage.setItem('cityHistory', data.name);

      var weatherIcon = document.createElement("img")
      weatherIcon.setAttribute("src", `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);
      cityNameEL.appendChild(weatherIcon);

      var currentDate = document.createElement("span")
      currentDate.textContent = " (" + moment(weather.dt).format("MMM D, YYYY") + ") ";
      cityNameEL.append(currentDate);

    });

}

function getFiveDay1(citySearch) { 
  var apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${citySearch}&units=imperial&appid=${APIkey}`
  console.log(apiUrl)
  console.log(citySearch)
  fetch(apiUrl)
      .then(function (response) {
          return response.json();
      })
      .then(function (data) {
          console.log(data)
          fiveDayContainer.innerHTML = '';
          for (let i = 0; i < data.list.length; i += 8) {
              console.log(data.list[i])
              var div = document.createElement("div");
              div.style.display = "inline-block";
              div.setAttribute('class', 'col-md-2 background-blue col-sm-6')
              var currentDate = document.createElement("span")
              currentDate.textContent = moment(data.list[i].dt_txt).format('dddd MMM D, YYYY ');
              div.appendChild(currentDate)
              var temp = document.createElement('span');
              temp.textContent = "Temperature: " + data.list[i].main.temp + ' F';
              temp.classList = "list-group"
              div.appendChild(temp)
              var humidity = document.createElement('span');
              humidity.textContent = "Humidity: " + data.list[i].main.humidity + ' %';
              humidity.classList = "list-group"
              div.appendChild(humidity)
              var weatherIcon = document.createElement("img")
              weatherIcon.setAttribute("src", `https://openweathermap.org/img/wn/${data.list[i].weather[0].icon}@2x.png`);
              div.appendChild(weatherIcon);
              fiveDayContainer.appendChild(div)
          }
      });
}

historyContainer.addEventListener("click", function (event) {
  console.log(event.target.textContent);
  var buttonText = event.target.textContent;
  
  historySearch(buttonText);
  getFiveDay1(buttonText);

})



