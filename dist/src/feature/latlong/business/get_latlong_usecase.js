"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetLatlongUseCase = void 0;
const ValueOutput_1 = require("../../../core/business/dto/ValueOutput");
const UseCase_1 = require("../../../core/business/interactor/UseCase");
class GetLatlongUseCase extends UseCase_1.UseCase {
    constructor(repo) {
        super();
        this.repo = repo;
    }
    execute(_param) {
        console.log("GetLatlongUseCase.execute.start");
        return new Promise((resolve, reject) => {
            var latlong = this.repo.getLatLong(_param);
            setTimeout(() => {
                resolve(new ValueOutput_1.ValueOutput(latlong));
            }, 1500);
        });
    }
}
exports.GetLatlongUseCase = GetLatlongUseCase;
//# sourceMappingURL=get_latlong_usecase.js.map