import { UseCase } from './UseCase';
import { Output } from './../dto/Output';
import { ErrorOutput } from './../dto/ErrorOutput';

export class ChainedUseCase<P, R, T> extends UseCase<P, T> {
    constructor(private first: UseCase<P, R>, private second: UseCase<R, T>) {
        super();
    }

    async execute(param: P | null): Promise<Output<T>> {
        const intermediate = await this.first.execute(param);
        if (intermediate.isSuccess()) {
            return await this.second.execute(intermediate.value);
        }

        return new ErrorOutput(intermediate.error!);
    }
}