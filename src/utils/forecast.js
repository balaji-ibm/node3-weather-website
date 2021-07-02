const request = require('request');


const forecast = (latitude, longitude, callback) => {
    //const url = 'http://api.weatherstack.com/current?access_key=952abceb012b471528fd53e1a987c2ec&query=12.844750,77.585000'

    const url = 'http://api.weatherstack.com/current?access_key=952abceb012b471528fd53e1a987c2ec&query=' + longitude + ',' + latitude;


    request({ url, json: true }, (error, { body }) => {
        if (error) { // ex when net is off not connected to service
            // console.log('Unable to connect to weather services!')
            callback('Unable to connect to weather services!', undefined);
        } else if (body.error) { // ex service is connected and we got a error response
            //console.log('Unable to find location');
            callback('Unable to find location', undefined);
        } else {
            callback(undefined, 'It is currently ' + body.current.temperature + ' degrees out in ' + body.location.name + '.  It feelslike ' + body.current.feelslike + ' degrees out.');

        }

    })
}

module.exports = forecast