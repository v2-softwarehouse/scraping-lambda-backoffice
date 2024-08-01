import { APIGatewayProxyHandler, APIGatewayProxyEvent, Context, Handler } from 'aws-lambda';
const request = require('request'); // Imports the module for use

export const hello: APIGatewayProxyHandler = async (event, _context) => {
    let address = '1301 S University Parks Dr, Waco, TX';
    let targetUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.API_KEY}`

    // request call with parameters
    request(targetUrl, function (err, res) {
        if (err) {
            console.log('error:', err); // prints the error if one occurred
            return
        }
        let geoLocation = JSON.parse(res.body);
        let mssg = `lat: ${geoLocation.results[0].geometry.location.lat} long: ${geoLocation.results[0].geometry.location.lng}`;
        console.log(mssg);
    });

    return {
        statusCode: 200,
        body: JSON.stringify({
            message: 'Go Serverless Webpack (Typescript) v1.0! Your function executed successfully!',
            input: event,
        }),
    };
}

export const nuvem: Handler = async (mensagem: String, context: Context) => {
    context.succeed('Mensagem da Nuvem: ' + mensagem);
}

export const novoArquivoJSON: Handler = async (event: APIGatewayProxyEvent, _context: Context) => {
    console.info(event);
}