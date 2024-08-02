import { BaseViewModel } from "../../../../core/mvvm/BaseViewModel";
import { GetLatlongUseCase } from "../../../../feature/latlong/business/get_latlong_usecase";
import { UseCaseGatewayInjectorCompanion } from "../../../../feature/latlong/gateway/backoffice_gateway_injector";
import { ControllerBackOffice } from "../../../../feature/latlong/gateway/controller_backoffice";

export class PresenterBackOfficeImpl extends BaseViewModel implements ControllerBackOffice {
    private getUseCase: GetLatlongUseCase;

    constructor() {
        super();
        this.getUseCase = this.injectUseCase();
    }

    private injectUseCase(): GetLatlongUseCase {
        return UseCaseGatewayInjectorCompanion.self.getUseCase;
    }

    public fetchLatLong(channelName: string): void {
        this.dispatchUseCase(PresenterBackOfficeImpl.PARAM_TEST, this.getUseCase, (result) => {
            this.postValue(channelName, result);
        });
    }

    private static readonly PARAM_TEST: string = "1301 S University Parks Dr, Waco, TX";
}