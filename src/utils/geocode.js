const request = require('postman-request');

const geoCode = (address, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1Ijoic2FrYWZlc2EiLCJhIjoiY2w3cnEzb2ozMGhzMjN1bGQ4dGdyZ2lzMCJ9.FlH1dYf-9DzTKQjjzX75lA";
    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback("Unable to connect to location services!", undefined);
        } else if (body.features.length === 0) {
            callback('Unable to find location.Try another search', undefined);
        } else {
            callback(undefined, {
                latitude: body.features[0].center[0],
                longitude: body.features[0].center[1],
                location: body.features[0].place_name
            });
        }
    });

}

module.exports = geoCode;