import { Output } from './../dto/Output';
import { ErrorOutput } from './../dto/ErrorOutput';

export abstract class UseCase<P, R> {
    async process(param: P | null = null) {
        try {
            if (this.guard(param)) {
                var output = this.execute(param)
                this.onResult(output);
            } else {
                this.onGuardError();
            }
        } catch (error) {
            this.onError(error as Error);
        }
    }

    public abstract execute(param: P | null): Output<R>;

    public onError(error: Error) {
        this.onResult(new ErrorOutput(error));
    }

    public onResult(_output: Output<R>) {}

    public guard(_param: P | null): boolean {
        return true;
    }

    public onGuardError() {}
}