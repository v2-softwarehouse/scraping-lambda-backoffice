"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Output = void 0;
class Output {
    constructor(value = null, error = null) {
        this.value = value;
        this.error = error;
    }
    isError() {
        return this.error !== null;
    }
    isSuccess() {
        return !this.isError();
    }
    isEmpty() {
        return this.value !== null;
    }
}
exports.Output = Output;
//# sourceMappingURL=Output.js.map