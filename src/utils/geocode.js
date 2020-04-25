const request = require('request');

const geocode = (address, callback) =>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYWJyYWhhbWlrbyIsImEiOiJjazJ6djFhemswNHM0M2NwZmk4a3lzbmRiIn0.AX0TKnkEzin-ogphEsnL6A&limit=1';

    request({url , json:true}, (error, response) =>{
        if(error){
            callback('Unable to connect to location services', undefined);
        }else if(response.body.features.length === 0){
           callback('Unable to find location. Try another', undefined);
        }else {
            callback(undefined, {
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            });
        }
    });
}

module.exports = geocode;