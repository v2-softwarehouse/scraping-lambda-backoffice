import { UseCase } from './UseCase';
import { UseCaseDecorator } from './UseCaseDecorator';
import { Output } from './../dto/Output';
import { ErrorOutput } from './../dto/ErrorOutput';

export class CallbackDecorator<P, R> extends UseCaseDecorator<P, R> {
    constructor(useCase: UseCase<P, R>, private callback: (output: Output<R>) => void) {
        super(useCase);
    }

    override async onResult(output: Output<R>) {
        console.log("CallbackDecorator.onResult.start:" + output.value)
        super.onResult(output);
        this.callback(output);
    }

    override async onError(error: Error) {
        console.log("CallbackDecorator.onError.start")
        super.onError(error);
        this.callback(new ErrorOutput(error));
    }
}