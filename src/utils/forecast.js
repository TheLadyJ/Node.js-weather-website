const request = require('request')


const forecast = (lat, long, callback) => {
    const url = 'http://api.weatherapi.com/v1/current.json?key=cf7d7cec411f40469ba110638210603&q=' + lat + ',' + long + '+&p=Belgrade'

    request({
        url,
        json: true
    }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather services', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, 
                'The current temperature is ' + body.current.temp_c + ' °C. The humidity is ' + body.current.humidity + '%. We hope you\'ll have a great day!'
            )
        }
    })

}

module.exports = forecast