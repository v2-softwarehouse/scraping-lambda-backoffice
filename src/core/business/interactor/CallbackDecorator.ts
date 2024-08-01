import { UseCase } from './UseCase';
import { UseCaseDecorator } from './UseCaseDecorator';
import { Output } from './../dto/Output';
import { ErrorOutput } from './../dto/ErrorOutput';

export class CallbackDecorator<P, R> extends UseCaseDecorator<P, R> {
    constructor(useCase: UseCase<P, R>, private callback: (output: Output<R>) => void) {
        super(useCase);
    }

    onResult(output: Output<R>) {
        super.onResult(output);
        this.callback(output);
    }

    onError(error: Error) {
        super.onError(error);
        this.callback(new ErrorOutput(error));
    }
}