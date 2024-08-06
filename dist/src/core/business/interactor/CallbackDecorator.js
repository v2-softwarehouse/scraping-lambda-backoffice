"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CallbackDecorator = void 0;
const UseCaseDecorator_1 = require("./UseCaseDecorator");
const ErrorOutput_1 = require("./../dto/ErrorOutput");
class CallbackDecorator extends UseCaseDecorator_1.UseCaseDecorator {
    constructor(useCase, callback) {
        super(useCase);
        this.callback = callback;
    }
    async onResult(output) {
        console.log("CallbackDecorator.onResult.start:" + output.value);
        super.onResult(output);
        this.callback(output);
    }
    async onError(error) {
        console.log("CallbackDecorator.onError.start");
        super.onError(error);
        this.callback(new ErrorOutput_1.ErrorOutput(error));
    }
}
exports.CallbackDecorator = CallbackDecorator;
//# sourceMappingURL=CallbackDecorator.js.map