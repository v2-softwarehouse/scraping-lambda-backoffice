import { APIGatewayProxyHandler, APIGatewayProxyEvent, Context, Handler } from 'aws-lambda';
import { UseCaseGatewayInjectorCompanion } from './src/feature/latlong/gateway/backoffice_gateway_injector';
import { GetLatlongUseCase } from './src/feature/latlong/business/get_latlong_usecase';
import { GoogleAPIImpl } from './src/plugin/feature/latlong/google_api_impl';
import { PresenterBackOfficeImpl } from './src/plugin/feature/latlong/gateway/presenter_backoffice_impl';

//injeta classes concretas
UseCaseGatewayInjectorCompanion.self = {
    get getUseCase(): GetLatlongUseCase {
        return new GetLatlongUseCase(new GoogleAPIImpl());
    }
}

export const hello: APIGatewayProxyHandler = async (event, _context) => {    
    let presenter = new PresenterBackOfficeImpl();
    
    //chama funcao que passa por dentro da ode.
    presenter.fetchLatLong("")

    // request call with parameters
   

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