"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UseCaseDecorator = void 0;
const UseCase_1 = require("./UseCase");
class UseCaseDecorator extends UseCase_1.UseCase {
    constructor(use_case) {
        super();
        this.use_case = use_case;
    }
    async execute(param) {
        return await this.use_case.execute(param);
    }
    async onResult(output) {
        return await this.use_case.onResult(output);
    }
    async onError(error) {
        return await this.use_case.onError(error);
    }
    guard(param) {
        return this.use_case.guard(param);
    }
}
exports.UseCaseDecorator = UseCaseDecorator;
//# sourceMappingURL=UseCaseDecorator.js.map