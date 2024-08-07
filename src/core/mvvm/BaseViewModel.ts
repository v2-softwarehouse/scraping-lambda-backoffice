
import { Controller } from './../mvvm/Controller';
import { CompositeJobDisposable } from './../business/interactor/CompositeJobDisposable'; // Substitua com a implementação real
import { CallbackDecorator } from './../business/interactor/CallbackDecorator'; // Substitua com a implementação real
import { UseCase } from './../business/interactor/UseCase'; // Substitua com a implementação real
import { UseCaseDispatcher } from './../business/interactor/UseCaseDispatcher'; // Substitua com a implementação real
import { Output } from './../business/dto/Output'; // Substitua com a implementação real
import { EventEmitter } from 'events';
import { Worker } from 'worker_threads';
import { UseCaseUnit } from '../business/interactor/UseCaseUnit';

export abstract class BaseViewModel extends EventEmitter implements Controller {
    private channels: Map<string, any> = new Map();
    private compositeJobDisposable = new CompositeJobDisposable();

    observe(channelName: string, listener: (value: any) => void) {
        if (!this.channels.has(channelName)) {
            this.channels.set(channelName, []);
        }
        this.on(channelName, listener);
    }

    getChannels(): string[] {
        return Array.from(this.channels.keys());
    }

    disposeAll() {
        this.compositeJobDisposable.cancel();
    }

    protected postValue(channelName: string, value: any) {
        console.log("BaseViewModel.postValue.start")
        this.emit(channelName, value);
        console.log("BaseViewModel.postValue.end")
    }

    public async dispatchUseCase<P, R>(param: P | null, useCase: UseCase<P, R>, listener: (output: Output<R>) => void): Promise<Worker> | null {
        console.log("BaseViewModel.dispatchUseCase.start")
        const dispatcher = new UseCaseDispatcher(new CallbackDecorator(useCase, listener));
        const worker = await dispatcher.dispatch(param);
        this.compositeJobDisposable.add(worker);
        console.log("BaseViewModel.dispatchUseCase.end")
        return worker;
    }

    public async processUseCase<P, R>(param: P | null, useCase: UseCase<P, R>): Promise<Output<R>> {
        const callback = new UseCaseUnit.Callback<R>();
        const decorator = new CallbackDecorator(useCase, await callback.set.bind(callback))
        await decorator.process(param)

        return callback.output
    }
}