// Take a look at the openweathermaps API documentation: http://openweathermap.org/current

var weatherUrl = "http://api.openweathermap.org/data/2.5/weather?q=";

var UVLevelUrl = "http://api.openweathermap.org/v3/uvi/";


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
            // Get the UV level when the weather API call succeeds
            // lat and long must be specific decimal values or no data will return
            var latitude = Math.round(response.coord.lat);
            var longitude = Math.round(response.coord.lon);
            var entireUrl = UVLevelUrl + latitude + ',' + longitude + '/current.json?appid=' + key;
            // Here is the ajax call for the UV Level and its results
            $.ajax({
                url: entireUrl,
                method: 'GET',
                success: function(response) {
                    $('#UVLevel').html('The UV Level in ' + city + ' is ' + response.data + '.');
                    var spf = $('#spf').val();
                    var applyMinutes = Math.floor(spf * 32 / response.data);
                    $('#ApplyFreq').html('You should apply sunscreen every ' + applyMinutes + ' minutes.');
                }
            });
        }
    });
});
