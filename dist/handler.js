"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.novoArquivoJSON = exports.nuvem = exports.hello = void 0;
const backoffice_gateway_injector_1 = require("./src/feature/latlong/gateway/backoffice_gateway_injector");
const get_latlong_usecase_1 = require("./src/feature/latlong/business/get_latlong_usecase");
const google_api_impl_1 = require("./src/plugin/feature/latlong/google_api_impl");
const presenter_backoffice_impl_1 = require("./src/plugin/feature/latlong/gateway/presenter_backoffice_impl");
const googleAPIImpl = new google_api_impl_1.GoogleAPIImpl();
//injeta classes concretas
backoffice_gateway_injector_1.UseCaseGatewayInjectorCompanion.self = {
    get getUseCase() {
        return new get_latlong_usecase_1.GetLatlongUseCase(googleAPIImpl);
    }
};
const hello = async (event, _context) => {
    const presenter = new presenter_backoffice_impl_1.PresenterBackOfficeImpl();
    //chama funcao que passa por dentro da ode.
    console.log("presenter.fetchLatLong.start");
    presenter.fetchLatLong("TESTE");
    console.log("presenter.fetchLatLong.end");
    // googleAPIImpl.getLatLong("1301 S University Parks Dr, Waco, TX")
    // request call with parameters
    return {
        statusCode: 200,
        body: JSON.stringify({
            message: 'Go Serverless Webpack (Typescript) v1.0! Your function executed successfully!',
            input: event,
        }),
    };
};
exports.hello = hello;
const nuvem = async (mensagem, context) => {
    context.succeed('Mensagem da Nuvem: ' + mensagem);
};
exports.nuvem = nuvem;
const novoArquivoJSON = async (event, _context) => {
    console.info(event);
};
exports.novoArquivoJSON = novoArquivoJSON;
//# sourceMappingURL=handler.js.map