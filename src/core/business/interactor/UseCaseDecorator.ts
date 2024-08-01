import { UseCase } from './UseCase';
import { Output } from './../dto/Output';

export abstract class UseCaseDecorator<P, R> extends UseCase<P, R> {
    constructor(private useCase: UseCase<P, R>) {
        super();
    }

    public onError(error: Error) {
        this.useCase.onError(error);
    }

    public execute(param: P | null): Output<R> {
        return this.useCase.execute(param);
    }

    public onResult(output: Output<R>) {
        this.useCase.onResult(output);
    }

    public guard(param: P | null): boolean {
        return this.useCase.guard(param);
    }
}