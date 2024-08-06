"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseViewModel = void 0;
const CompositeJobDisposable_1 = require("./../business/interactor/CompositeJobDisposable"); // Substitua com a implementação real
const CallbackDecorator_1 = require("./../business/interactor/CallbackDecorator"); // Substitua com a implementação real
const UseCaseDispatcher_1 = require("./../business/interactor/UseCaseDispatcher"); // Substitua com a implementação real
const events_1 = require("events");
class BaseViewModel extends events_1.EventEmitter {
    constructor() {
        super(...arguments);
        this.channels = new Map();
        this.compositeJobDisposable = new CompositeJobDisposable_1.CompositeJobDisposable();
    }
    observe(channelName, listener) {
        if (!this.channels.has(channelName)) {
            this.channels.set(channelName, []);
        }
        this.on(channelName, listener);
    }
    getChannels() {
        return Array.from(this.channels.keys());
    }
    disposeAll() {
        this.compositeJobDisposable.cancel();
    }
    postValue(channelName, value) {
        console.log("BaseViewModel.postValue.start");
        this.emit(channelName, value);
        console.log("BaseViewModel.postValue.end");
    }
    async dispatchUseCase(param, useCase, listener) {
        console.log("BaseViewModel.dispatchUseCase.start");
        const dispatcher = new UseCaseDispatcher_1.UseCaseDispatcher(new CallbackDecorator_1.CallbackDecorator(useCase, listener));
        const worker = await dispatcher.dispatch(param);
        this.compositeJobDisposable.add(worker);
        console.log("BaseViewModel.dispatchUseCase.end");
        return worker;
    }
}
exports.BaseViewModel = BaseViewModel;
//# sourceMappingURL=BaseViewModel.js.map