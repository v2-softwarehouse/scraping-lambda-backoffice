"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DispatcherDecorator = exports.UseCaseDispatcher = void 0;
const UseCaseDecorator_1 = require("./UseCaseDecorator");
const worker_threads_1 = require("worker_threads");
class UseCaseDispatcher {
    constructor(useCase) {
        this.decorator = new DispatcherDecorator(useCase);
    }
    async dispatch(param = null) {
        return await this.decorator.dispatch(param);
    }
}
exports.UseCaseDispatcher = UseCaseDispatcher;
class DispatcherDecorator extends UseCaseDecorator_1.UseCaseDecorator {
    async dispatch(param = null) {
        const process = JSON.parse(JSON.stringify(this.use_case.process(param)));
        const worker = new worker_threads_1.Worker(__filename, { workerData: { useCase: process } });
        if (worker_threads_1.isMainThread) {
            console.log("DispatcherDecorator.isMainThread");
            worker.on('message', (result) => {
                console.log("DispatcherDecorator.isMainThread.onResult: " + result);
                this.onResult(result);
            });
            worker.on('exit', (exitCode) => {
                console.log("DispatcherDecorator.isMainThread.onExit: " + exitCode);
            });
            worker.on('error', (error) => {
                console.log("DispatcherDecorator.isMainThread.onError: " + error);
                this.onError(error);
            });
        }
        else {
            console.log("DispatcherDecorator.process");
            this.process(param);
        }
        return worker;
    }
    async execute(param) {
        console.log("DispatcherDecorator.execute");
        const result = await super.execute(param);
        console.log("DispatcherDecorator.postMessage");
        worker_threads_1.parentPort === null || worker_threads_1.parentPort === void 0 ? void 0 : worker_threads_1.parentPort.postMessage(result);
        return result;
    }
    async onResult(output) {
    }
    async onError(error) {
    }
}
exports.DispatcherDecorator = DispatcherDecorator;
//# sourceMappingURL=UseCaseDispatcher.js.map