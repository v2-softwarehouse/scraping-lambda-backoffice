import { UseCase } from './UseCase';
import { Output } from './../dto/Output';
import { ErrorOutput } from './../dto/ErrorOutput';

export class ChainedUseCase<P, R, T> extends UseCase<P, T> {
    constructor(private first: UseCase<P, R>, private second: UseCase<R, T>) {
        super();
    }

    execute(param: P | null): Output<T> {
        const intermediate = this.first.execute(param);
        if (intermediate.isSuccess()) {
            return this.second.execute(intermediate.value);
        }

        return new ErrorOutput(intermediate.error!);
    }
}