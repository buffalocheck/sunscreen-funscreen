// Take a look at the openweathermaps API documentation: http://openweathermap.org/current

// Added https://cors-anywhere.herokuapp.com/ in front of the calls to provide https to heroku
var weatherUrl = "https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?q=";

var UVIndexUrl = "https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/v3/uvi/";


// Get an api key: http://openweathermap.org/appid#get
var key = '02e84210a52ed716535f02989864d080';


$('#form1').on('submit', function(e) {
    e.preventDefault();

    var city = $('#city').val();

    $.ajax({
        url: weatherUrl + city + '&units=imperial&appid=' + key,
        method: 'GET',
        success: function(response) {
            $('#temp').html('The weather in ' + city + ' is ' + response.main.temp + ' degrees.');
            // Get the UV Index when the weather API call succeeds
            // lat and long must be specific decimal values or no data will return
            var latitude = Math.round(response.coord.lat);
            var longitude = Math.round(response.coord.lon);
            var entireUrl = UVIndexUrl + latitude + ',' + longitude + '/current.json?appid=' + key;
            // Here is the ajax call for the UV Index and its results
            $.ajax({
                url: entireUrl,
                method: 'GET',
                success: function(response) {
                    $('#UVIndex').html('The UV Index in ' + city + ' is ' + response.data + '.');
                    var spf = $('#spf').val();
                    var applyMinutes = Math.floor(spf * 32 / response.data);
                    $('#ApplyFreq').html('You should apply sunscreen every ' + applyMinutes + ' minutes.');
                }
            });
        }
    });
});
