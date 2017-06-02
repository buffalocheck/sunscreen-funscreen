// Take a look at the openweathermaps API documentation: http://openweathermap.org/current


// Here's what a sample url will look like:
// 'http://api.openweathermap.org/data/2.5/weather?q=Chicago&units=imperial&appid=02e84210a52ed716535f02989864d080'

// Following this format:
// 'http://api.openweathermap.org/data/2.5/weather?q=City&units=imperial&appid=yourAppKey'

console.log('JS loaded');

var weatherUrl = "http://api.openweathermap.org/data/2.5/weather?q=";

var UVLevelUrl = "http://api.openweathermap.org/v3/uvi/";


// Get an api key: http://openweathermap.org/appid#get
var key = '02e84210a52ed716535f02989864d080';


$('#form1').on('submit', function(e) {
    e.preventDefault();

    var city = $('#city').val();

    $.ajax({
        url: weatherUrl + city + '&units=imperial&appid=02e84210a52ed716535f02989864d080',
        method: 'GET',
        success: function(response) {
            console.log(response);
            console.log('+++++++++++++++++');
            console.log(response.main);
            console.log('+++++++++++++++++');
            console.log(response.main.temp);
            $('#temp').html('The weather in ' + city + ' is ' + response.main.temp + ' degrees.');
            // Get the UV level when the weather API call succeeds
            var latitude = Math.round(response.coord.lat);
            console.log(latitude);
            var longitude = Math.round(response.coord.lon);
            console.log(longitude);
            // var latitude = 40.7;
            // var longitude = -74.2;
            var entireUrl = UVLevelUrl + latitude + ',' + longitude + '/current.json?appid=' + key;
            console.log('Here is the entireURL:', entireUrl);
            // Here is the ajax call for the UV Level and its results
            $.ajax({
                url: entireUrl,
                method: 'GET',
                success: function(response) {
                    console.log(response);
                    console.log('+++++++++++++++++');
                    console.log(response.location);
                    console.log('+++++++++++++++++');
                    console.log(response.data);
                    $('#UVLevel').html('The UV Level in ' + city + ' is ' + response.data + '.');
                }
            });
        }
    });
});
