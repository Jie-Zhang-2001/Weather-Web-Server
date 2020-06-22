const request = require('request');
const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiamllemhhbmcxNTkiLCJhIjoiY2tibWpuOWExMWpqNjJ4bXhvZGpuMmVteiJ9.DSn3rzUXpq2JC-0U3zTrjg&limit=1';
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to location service!', undefined);
        } else if (body.features.length === 0) {
            callback('Please specify a correct address!');
        } else {
            callback(undefined, {
                Lat: body.features[0].center[1],
                Lon: body.features[0].center[0],
                Location: body.features[0].place_name
            })
        }
    });
};

const forecast = (lat, lon, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=6ea0982e4382a71d75d12e4d1b775b98&query=' + lon + ',' + lat + '&units=f';
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to reach forecast service!', undefined);
        } else if (body.error) {
            callback('Please enter a correct location!', undefined);
        } else {
            callback(undefined, body.current.weather_descriptions[0] + " It's currently " + body.current.temperature + " out, it feels like " + body.current.feelslike + " now. Wind speed: " + body.current.wind_speed);
        }
    })
}

module.exports = {
    geocode: geocode,
    forecast: forecast
}