'use strict';
let v = "strict mode script!";

// load document HTML
$(document).ready(function () {


    // date and time from Luxon
    function clock() {
        let DateTime = luxon.DateTime;

        //get params
        let dayLong = DateTime.local().weekdayLong;
        let dayOfMonth = DateTime.local().day;
        let hour = DateTime.local().hour;
        let minute = DateTime.local().minute;
        let second = DateTime.local().second;

        // forecast dates
        let today = DateTime.local(); // this is now!
        let day2 = DateTime.local().plus({ days: 1 });
        let day3 = DateTime.local().plus({ days: 2 });
        let day4 = DateTime.local().plus({ days: 3 });
        let day5 = DateTime.local().plus({ days: 4 });

        //days for forecast
        let forecastToday = today.weekdayShort;
        let forecastDay2 = day2.weekdayShort;
        let forecastDay3 = day3.weekdayShort;
        let forecastDay4 = day4.weekdayShort;
        let forecastDay5 = day5.weekdayShort;

        //set the day on the forecast tiles
        $('#day1').text(forecastToday);
        $('#day2').text(forecastDay2);
        $('#day3').text(forecastDay3);
        $('#day4').text(forecastDay4);
        $('#day5').text(forecastDay5);


        //format clock output
        if (hour == 0) {
            hour = 12;
        }

        if (hour > 12) {
            hour = hour - 12;
        }

        if (hour < 10) {
            hour = '0' + hour;
        }

        if (minute < 10) {
            minute = '0' + minute;
        }

        if (second < 10) {
            second = '0' + second;
        }

        // output time to page
        let currentTime = `${hour}:${minute}:${second}`;
        $("#currentTime").text(currentTime);

        // set the day and date on the page
        let todaysDate = `${dayLong} ${dayOfMonth}`;
        $('#day-of-week').text(todaysDate);


        // this increments the clock live
        let controlClock = setTimeout(clock, 1000);
        console.log(controlClock)
        stopClock(controlClock);
    }

    clock();

    // stops clock in case of recursive loop and memory leak
    function stopClock(controlClock) {
        if (controlClock > 256) {
            clearTimeout(controlClock);
        };
    };

    stopClock();


        // load random whether location
    let loadCityName = ['woodstock', 'dundee', 'new york', 'wuhan', 'anchorage', 'hobart', 'tehran', 'hanoi', 'islamabad', 'london', 'dublin', 'bangkok', 'mogadishu', 'mombasa', 'calcutta', 'manaus', 'kyoto', 'seattle', 'berlin', 'naples', 'buenos aires', 'miami', 'peshawar', 'new delhi', 'beijing', 'honolulu'];
    let index = Math.floor(Math.random() * loadCityName.length);
    let cityName = loadCityName[index];
    console.log(cityName);
    getWeather(cityName);
    getForecast(cityName);


    // get user input clicks
    $('#query-submit-button').click(function () {
        let cityName = $("#city").val().toLowerCase();
        console.log(cityName);
        getWeather(cityName);
        getForecast(cityName);
        createWeatherButton(cityName);
        storeCityInsideLocal(cityName);
    });

    $('#city').keydown(function () {
        let cityName = $("#city").val().toLowerCase();
        if (event.keyCode === 13) {
            event.preventDefault();
            console.log(cityName);
            getWeather(cityName);
            getForecast(cityName);
            createWeatherButton(cityName);
            storeCityInsideLocal(cityName);
        };
    });

    // clear button function
    $('#clear-results-button').on('click', function () {
        localStorage.setItem('city', null);
        $('#new-button-row').empty();
    })




    // listen to submit event to reduce code, work with Sam on this later 
    function getWeather(cityName) {
        //api key and query string
        const apiKey = `0d00e06c2b9381d1603d8240efcc25fb`;
        let queryUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

        // Get current weather
        $.ajax({
            url: queryUrl,
            method: "GET",
        })

            .then(response => {
                // this will happen eventually
                console.log(response);
                // set city name
                const todayCity = response['name'];
                console.log(todayCity);
                const todayIcon = response['weather'][0]['main'];
                console.log(todayIcon);
                const todayTemp = response['main']['temp'];
                console.log(todayTemp);
                const todayHumid = response['main']['humidity'];
                console.log(todayHumid);
                const todayWindSpeed = response['wind']['speed'];
                console.log(todayWindSpeed);
                const todayWindDeg = response['wind']['deg'];
                console.log(todayWindDeg);

                //weather icons 
                let iconObject = {
                    "Few clouds": "images_weather_dashboard/sun_cloud.svg",
                    "Scattered clouds": "images_weather_dashboard/sun_cloud.svg",
                    "Broken clouds": "images_weather_dashboard/sun_cloud.svg",
                    "Drizzle": "images_weather_dashboard/sun_cloud_light_rain.svg",
                    "Rain": "images_weather_dashboard/rain.svg",
                    "Snow": "images_weather_dashboard/snow.svg",
                    "Mist": "images_weather_dashboard/mist.svg",
                    "Clear": "images_weather_dashboard/sun.svg",
                    "Thunderstorm": "images_weather_dashboard/lightning.svg",
                    "Haze": "images_weather_dashboard/mist.svg",
                    "Clouds": "images_weather_dashboard/heavy_cloud.svg",
                    "Fog": "images_weather_dashboard/mist.svg"
                };


                //test to see if weather key is present
                if (iconObject[todayIcon]) {
                    console.log('Hooray, my key is right where I thought it would be');
                } else {
                    console.log('What? Who has nabbed my blasted key?');
                }

                // set city name
                $('#city-main').text(cityName);
                $('#city-main').css("text-white text-center text-sm-center text-md-left text-lg-left text-lg-left display-4", cityName);

                // get url out of iconObject - main weather icon
                const iconUrl = iconObject[todayIcon];
                console.log(iconUrl);
                $('.weather-icon').attr('src'); ///this bastard
                $('.weather-icon').css('background-image', "url(" + iconUrl + ")");

                // update wind icon
                $('.wind-icon').attr('src');
                $('.wind-icon').css('background-image', "url(" + iconUrl + ")");

                const todayTempDec = todayTemp.toFixed(0);
                $('#temp').text(todayTempDec + '°');


                //weather icons 
                let bgObject = {
                    "Few clouds": "images_weather_dashboard/light_cloud.jpg",
                    "Scattered clouds": "images_weather_dashboard/scattered_cloud.jpg",
                    "Broken clouds": "images_weather_dashboard/scattered_cloud.jpg",
                    "Drizzle": "images_weather_dashboard/drizzle.jpg",
                    "Rain": "images_weather_dashboard/moderate_rain.jpg",
                    "Snow": "images_weather_dashboard/light_snow.jpg",
                    "Mist": "images_weather_dashboard/mist.jpg",
                    "Clear": "images_weather_dashboard/clear_sky.jpg",
                    "Thunderstorm": "images_weather_dashboard/thunder.jpg",
                    "Haze": "images_weather_dashboard/haze.jpg",
                    "Fog": "images_weather_dashboard/fog.jpg",
                    "Clouds": "images_weather_dashboard/broken_cloud.jpg"
                };

                const bgUrl = bgObject[todayIcon];
                console.log(bgUrl);
                $('.bg-weather').attr('src');
                $('.bg-weather').css('background-image', "url(" + bgUrl + ")");

                //wind icons
                let windObject = {
                    "Few clouds": "images_weather_dashboard/dark/sun_cloud_dark.svg",
                    "Scattered clouds": "images_weather_dashboard/dark/sun_cloud_dark.svg",
                    "Broken clouds": "images_weather_dashboard/dark/sun_cloud_dark.svg",
                    "Drizzle": "images_weather_dashboard/dark/sun_cloud_light_rain_dark.svg",
                    "Rain": "images_weather_dashboard/dark/rain_dark.svg",
                    "Snow": "images_weather_dashboard/dark/snow_dark.svg",
                    "Mist": "images_weather_dashboard/dark/mist_dark.svg",
                    "Clear": "images_weather_dashboard/dark/sun_dark.svg",
                    "Thunderstorm": "images_weather_dashboard/dark/lightning_dark.svg",
                    "Haze": "images_weather_dashboard/dark/mist_dark.svg",
                    "Clouds": "images_weather_dashboard/dark/heavy_cloud_dark.svg",
                    "Fog": "images_weather_dashboard/mist.svg"
                };

                const windUrl = windObject[todayIcon];
                console.log(windUrl);
                $('.wind-icon').attr('src');
                $('.wind-icon').css('background-image', "url(" + windUrl + ")");

                $('.one').attr('src');
                $('.one').css('background-image', "url(" + windUrl + ")");

                //wind speed 
                const speed = todayWindSpeed.toFixed(0);

                //wind ang
                let degree = todayWindDeg;
                if (degree >= 1 && degree <= 360) {
                    degree = todayWindDeg;
                } else {
                    degree = '0';
                }

                $('#wind-index').text(speed + 'mph / ' + degree + '°');

            })
            // handle all ajax errors
            .catch(error => {
                console.log(error);
            })
    };

    // create location buttons
    function createWeatherButton(cityName) {
        let cityButton = $('<button/>', {
            text: cityName,
            type: "button",
            class: "btn btn-outline-light button-control-custom",
            click: function () {
                getWeather(cityName);
            }
        });

        let wrapper = $("<div/>", {
            class: "mb-2 mr-sm-3 button-control-custom pb-2",
        });

        wrapper.append(cityButton);
        $('#new-button-row').append(wrapper);
    }

    // loads cities from LS use line JSON.parse and createbutton func. 
    function getCityOnPageLoad() {
        let getCity = JSON.parse(localStorage.getItem('city')); // converts string back to array
        console.log(getCity)
        if (getCity === null) {
            getCity = [];
        }

        for (let i = 0; i < getCity.length; i++) {
            createWeatherButton(getCity[i]);
        }
    }


    // store city inside localStorage
    function storeCityInsideLocal(cityName) {
        let city = JSON.parse(localStorage.getItem('city')); // converts string back to array
        if (city === null) {
            city = [];
        }
        city.push(cityName);
        localStorage.setItem('city', JSON.stringify(city));
    }

});


// load cities from local storage
getCityOnPageLoad();


// get forecast function
function getForecast(cityName) {
    //api key and query string
    const apiKey = `0d00e06c2b9381d1603d8240efcc25fb`;
    let queryUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=metric`;

    // Get forecast
    $.ajax({
        url: queryUrl,
        method: "GET",
    })

        .then(response => {
            console.log(response);

            let forecastArr = (response.list);
            console.log(forecastArr);


            //wind icons
            let forecastObject = {
                "Few clouds": "images_weather_dashboard/dark/sun_cloud_dark.svg",
                "Scattered clouds": "images_weather_dashboard/dark/sun_cloud_dark.svg",
                "Broken clouds": "images_weather_dashboard/dark/sun_cloud_dark.svg",
                "Drizzle": "images_weather_dashboard/dark/sun_cloud_light_rain_dark.svg",
                "Rain": "images_weather_dashboard/dark/rain_dark.svg",
                "Snow": "images_weather_dashboard/dark/snow_dark.svg",
                "Mist": "images_weather_dashboard/dark/mist_dark.svg",
                "Clear": "images_weather_dashboard/dark/sun_dark.svg",
                "Thunderstorm": "images_weather_dashboard/dark/lightning_dark.svg",
                "Haze": "images_weather_dashboard/dark/mist_dark.svg",
                "Clouds": "images_weather_dashboard/dark/heavy_cloud_dark.svg",
                "Fog": "images_weather_dashboard/mist.svg"
            };

            const icon1 = response.list[1]['weather'][0]['main'];
            const icon1Url = forecastObject[icon1];
            console.log(icon1)
            const icon2 = response.list[2]['weather'][0]['main'];
            const icon2Url = forecastObject[icon2];
            console.log(icon2)
            const icon3 = response.list[3]['weather'][0]['main'];
            const icon3Url = forecastObject[icon3];
            console.log(icon3)
            const icon4 = response.list[4]['weather'][0]['main'];
            const icon4Url = forecastObject[icon4];
            console.log(icon4)
            const icon5 = response.list[5]['weather'][0]['main'];
            const icon5Url = forecastObject[icon5];
            console.log(icon5)

            //set icons on page - not day one icon is set from current weather api
            $('.two').attr('src');
            $('.two').css('background-image', "url(" + icon2Url + ")");

            $('.three').attr('src');
            $('.three').css('background-image', "url(" + icon3Url + ")");

            $('.four').attr('src');
            $('.four').css('background-image', "url(" + icon4Url + ")");

            $('.five').attr('src');
            $('.five').css('background-image', "url(" + icon5Url + ")");


            const temp1 = response.list[1]['main']['temp'].toFixed(0);
            const temp1Str = (temp1 + '°');
            $('#temp1').text(temp1Str);
            const temp2 = response.list[2]['main']['temp'].toFixed(0);
            $('#temp2').text(temp2 + '°');
            const temp3 = response.list[3]['main']['temp'].toFixed(0);
            $('#temp3').text(temp3 + '°');
            const temp4 = response.list[4]['main']['temp'].toFixed(0);
            $('#temp4').text(temp4 + '°');
            const temp5 = response.list[5]['main']['temp'].toFixed(0);
            $('#temp5').text(temp5 + '°');

            const hum1 = response.list[1]['main']['humidity'].toFixed(0);
            $('#hum1').text('Hum ' + hum1);
            const hum2 = response.list[2]['main']['humidity'].toFixed(0);
            $('#hum2').text('Hum ' + hum2);
            const hum3 = response.list[3]['main']['humidity'].toFixed(0);
            $('#hum3').text('Hum ' + hum3);
            const hum4 = response.list[4]['main']['humidity'].toFixed(0);
            $('#hum4').text('Hum ' + hum4);
            const hum5 = response.list[5]['main']['humidity'].toFixed(0);
            $('#hum5').text('Hum ' + hum5);

        })
        // handle all ajax errors
        .catch(error => {
            console.log(error);
        })

};
