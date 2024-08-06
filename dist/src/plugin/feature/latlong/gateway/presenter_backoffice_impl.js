"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PresenterBackOfficeImpl = void 0;
const BaseViewModel_1 = require("../../../../core/mvvm/BaseViewModel");
const backoffice_gateway_injector_1 = require("../../../../feature/latlong/gateway/backoffice_gateway_injector");
class PresenterBackOfficeImpl extends BaseViewModel_1.BaseViewModel {
    constructor() {
        super();
        this.getUseCase = this.injectUseCase();
    }
    injectUseCase() {
        return backoffice_gateway_injector_1.UseCaseGatewayInjectorCompanion.self.getUseCase;
    }
    fetchLatLong(channelName) {
        console.log("PresenterBackOfficeImpl.fetchLatLong.start");
        this.dispatchUseCase(PresenterBackOfficeImpl.PARAM_TEST, this.getUseCase, (result) => {
            // this.postValue(channelName, result);
            // console.log("PresenterBackOfficeImpl.fetchLatLong.postValue")
        });
        console.log("PresenterBackOfficeImpl.fetchLatLong.end");
    }
}
exports.PresenterBackOfficeImpl = PresenterBackOfficeImpl;
PresenterBackOfficeImpl.PARAM_TEST = "1301 S University Parks Dr, Waco, TX";
//# sourceMappingURL=presenter_backoffice_impl.js.map