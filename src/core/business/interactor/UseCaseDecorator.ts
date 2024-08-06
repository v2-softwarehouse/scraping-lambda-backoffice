import { UseCase } from './UseCase';
import { Output } from './../dto/Output';

export abstract class UseCaseDecorator<P, R> extends UseCase<P, R> {
    protected use_case: UseCase<P, R>;

    constructor(use_case: UseCase<P, R>) {
        super();
        this.use_case = use_case;
    }

    async execute(param?: P): Promise<Output<R>> {
        return await this.use_case.execute(param);
    }

    async onResult(output?: Output<R>) {
        return await this.use_case.onResult(output);
    }

    async onError(error: Error) {
        return await this.use_case.onError(error);
    }

    guard(param?: P): boolean {
        return this.use_case.guard(param);
    }
}