const request = require('request'); // Imports the module for use

export class GoogleAPIImpl implements GoogleAPI {
    getLatLong(_param: any): string | null {
        // TODO: Não to conseguindo pegar valores do .env
        // const API_KEY = process.env["API_KEY"]
        const API_KEY = "AIzaSyDcUxk8BLS7WpGnWCIMiy2cyPtXfE7Cho4"
        const targetUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${_param}&key=${API_KEY}`
        request(targetUrl, function (err, res) {
            if (err) {
                console.log('error:', err); // prints the error if one occurred
                return
            }
            const geoLocation = JSON.parse(res.body);
            if (geoLocation.results) {
                const msg = `lat: ${geoLocation.results[0].geometry.location.lat} long: ${geoLocation.results[0].geometry.location.lng}`;
                console.log(msg);
            }
        });

        return "mock string para testes"
    }
}