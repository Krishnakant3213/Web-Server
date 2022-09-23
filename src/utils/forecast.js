const request = require('postman-request');

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=3e9e21bd81b314ab1e866b35d7279449&query=' + longitude + ',' + latitude + '&units=f';
    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback("Unable to connect to weather services!", undefined);
        } else if (body.error) {
            callback('Unable to find location', undefined);
        } else {
            const currentWeather = body.current;
            callback(undefined, currentWeather.weather_descriptions[0] + ' .It is currently ' + currentWeather.temperature + ' degrees out. It feels like ' + currentWeather.feelslike + ' degree out. The humadity is ' + currentWeather.humidity + ' %');
        }
    })
}
module.exports = forecast;
