"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UseCaseUnit = void 0;
const ValueOutput_1 = require("./../dto/ValueOutput");
const CallbackDecorator_1 = require("./CallbackDecorator");
class UseCaseUnit {
    constructor(use_case, param) {
        this.use_case = use_case;
        this.param = param;
    }
    async process() {
        const callback = new UseCaseUnit.Callback();
        const decorator = new CallbackDecorator_1.CallbackDecorator(this.use_case, callback.set.bind(callback));
        await decorator.process(this.param);
        return callback.output;
    }
}
exports.UseCaseUnit = UseCaseUnit;
UseCaseUnit.Callback = class Callback {
    constructor() {
        this.output = new ValueOutput_1.ValueOutput();
    }
    async set(value) {
        this.output = value;
    }
};
//# sourceMappingURL=UseCaseUnit.js.map