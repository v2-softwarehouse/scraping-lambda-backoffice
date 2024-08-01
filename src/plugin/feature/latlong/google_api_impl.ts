const request = require('request'); // Imports the module for use

export class GoogleAPIImpl implements GoogleAPI {
    getLatLong(_param: any): string | null {
        
        let targetUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${_param}&key=${process.env.API_KEY}`
        request(targetUrl, function (err, res) {
            if (err) {
                console.log('error:', err); // prints the error if one occurred
                return
            }
            let geoLocation = JSON.parse(res.body);
            let mssg = `lat: ${geoLocation.results[0].geometry.location.lat} long: ${geoLocation.results[0].geometry.location.lng}`;
            console.log(mssg);
        });


        return "mock string para testes"
    }   
}