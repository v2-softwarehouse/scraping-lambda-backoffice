import { UseCase } from './UseCase';
import { Output } from './../dto/Output';
import { ValueOutput } from './../dto/ValueOutput';
import { CallbackDecorator } from './CallbackDecorator';

export class UseCaseUnit<P, R> {
    constructor(public useCase: UseCase<P, R>, public param: P | null) {}

    process(): Output<R> {
        const callback = new Callback<R>();
        const decorator = new CallbackDecorator(this.useCase, callback.set.bind(callback));
        decorator.process(this.param);
        return callback.output;
    }
}

class Callback<R> {
    output: Output<R> = new ValueOutput();

    set(value: Output<R>) {
        this.output = value;
    }
}
