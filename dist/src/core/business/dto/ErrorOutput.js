"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorOutput = void 0;
const Output_1 = require("./Output");
class ErrorOutput extends Output_1.Output {
    constructor(error, value = null) {
        super(value, error);
    }
    isError() {
        return true;
    }
}
exports.ErrorOutput = ErrorOutput;
//# sourceMappingURL=ErrorOutput.js.map