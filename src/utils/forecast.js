const request = require('request');

const forecast = (latitude, longitude, callback) =>{
    const url = 'https://api.darksky.net/forecast/ca5ac981419bfa08e6ddcd2996f17b4b/'+ encodeURIComponent(latitude) + ',' +encodeURIComponent(longitude);

    request({url, json:true}, (error, {body}) =>{
        if(error){
            callback('Unable to connect to Weather service', undefined);
        }else if(body.error === 0){
           callback('Unable to find location. Try another', undefined);
        }else {
            callback(undefined, body.daily.data[0].summary + "It is currently "+body.currently.temperature+ " degrees out. There is a "+ body.currently.precipProbability +"% chance of rain");
        }
    });
}

module.exports = forecast;