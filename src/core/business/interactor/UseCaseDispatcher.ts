import { UseCase } from './UseCase';
import { Output } from './../dto/Output';
import { UseCaseDecorator } from './UseCaseDecorator';
import { Worker, parentPort } from 'worker_threads';
import { ErrorOutput } from '../dto/ErrorOutput';

export class UseCaseDispatcher<P, R> {
    private decorator: DispatcherDecorator<P, R>;

    constructor(useCase: UseCase<P, R>) {
        this.decorator = new DispatcherDecorator(useCase);
    }

    dispatch(param: P | null = null): Worker | null {
        return this.decorator.dispatch(param);
    }
}

class DispatcherDecorator<P, R> extends UseCaseDecorator<P, R> {
    constructor(public useCaseDispatcher: UseCase<P, R>) {
        super(useCaseDispatcher);
    }

    dispatch(param: P | null): Worker | null {
        const worker = new Worker(__filename, { workerData: { param, useCase: this.useCaseDispatcher } });
        worker.on('message', (result: Output<R>) => this.onResult(result));
        worker.on('error', (error: Error) => this.onError(error));
        return worker;
    }

    onError(error: Error) {
        parentPort?.postMessage(new ErrorOutput(error));
    }

    onResult(output: Output<R>) {
        parentPort?.postMessage(output);
    }
}
