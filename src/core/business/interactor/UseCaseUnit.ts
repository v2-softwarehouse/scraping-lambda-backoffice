import { UseCase } from './UseCase';
import { Output } from './../dto/Output';
import { ValueOutput } from './../dto/ValueOutput';
import { CallbackDecorator } from './CallbackDecorator';

export class UseCaseUnit<P, R> {
    private use_case: UseCase<P, R>;
    private param: P;

    constructor(use_case: UseCase<P, R>, param: P) {
        this.use_case = use_case;
        this.param = param;
    }

    async process(): Promise<Output<R>> {
        const callback = new UseCaseUnit.Callback<R>();
        const decorator = new CallbackDecorator(this.use_case, callback.set.bind(callback));
        await decorator.process(this.param);
        return callback.output;
    }

    static Callback = class Callback<R> {
        output: Output<R> = new ValueOutput<R>();
        async set(value: Output<R>) {
            this.output = value;
        }
    }
}