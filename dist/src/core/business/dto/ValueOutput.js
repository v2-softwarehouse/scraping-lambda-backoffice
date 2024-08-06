"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValueOutput = void 0;
const Output_1 = require("./Output");
class ValueOutput extends Output_1.Output {
    constructor(value = null) {
        super(value, null);
    }
    isError() {
        return false;
    }
}
exports.ValueOutput = ValueOutput;
//# sourceMappingURL=ValueOutput.js.map