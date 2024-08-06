import { UseCase } from './UseCase';
import { Output } from './../dto/Output';
import { UseCaseDecorator } from './UseCaseDecorator';
import { parentPort, Worker, isMainThread } from 'worker_threads';

export class UseCaseDispatcher<P, R> {
    private decorator: DispatcherDecorator<P, R>;

    constructor(useCase: UseCase<P, R>) {
        this.decorator = new DispatcherDecorator(useCase);
    }

    async dispatch(param: P | null = null): Promise<Worker> {
        return await this.decorator.dispatch(param);
    }
}

export class DispatcherDecorator<P, R> extends UseCaseDecorator<P, R> {
    async dispatch(param: P | null = null): Promise<Worker> {
        
        const process = JSON.parse(JSON.stringify(this.use_case.process(param)));
        const worker = new Worker(__filename, { workerData: { useCase: process } });
        if (isMainThread) {
            console.log("DispatcherDecorator.isMainThread")
            worker.on('message', (result) => {
                console.log("DispatcherDecorator.isMainThread.onResult: "+ result)
                this.onResult(result)
            });
            worker.on('exit', (exitCode) => {
                console.log("DispatcherDecorator.isMainThread.onExit: "+ exitCode)
            });
            worker.on('error', (error) => {
                console.log("DispatcherDecorator.isMainThread.onError: "+ error)
                this.onError(error)
            });
        } else {
            console.log("DispatcherDecorator.process")
            this.process(param);
        }

        return worker
    }

    override async execute(param: P | null): Promise<Output<R>> {
        console.log("DispatcherDecorator.execute")
        const result = await super.execute(param);
        console.log("DispatcherDecorator.postMessage")
        parentPort?.postMessage(result);

        return result;
    }

    async onResult(output?: Output<R>): Promise<void> {
        
    }

    async onError(error: Error): Promise<void> {
        
    }
}
