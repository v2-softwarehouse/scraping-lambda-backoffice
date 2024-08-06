"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UseCase = void 0;
const ErrorOutput_1 = require("./../dto/ErrorOutput");
class UseCase {
    async process(param) {
        try {
            if (this.guard(param)) {
                const output = await this.execute(param);
                await this.onResult(output);
            }
            else {
                await this.onGuardError();
            }
        }
        catch (error) {
            await this.onError(error);
        }
    }
    async execute(param) {
        throw new Error("Method not implemented.");
    }
    async onError(error) {
        await this.onResult(new ErrorOutput_1.ErrorOutput(error));
    }
    async onResult(output) {
        // Implement in subclass
    }
    guard(param) {
        return true;
    }
    async onGuardError() {
        // Implement in subclass
    }
}
exports.UseCase = UseCase;
//# sourceMappingURL=UseCase.js.map