import { Output } from './../dto/Output';
import { ErrorOutput } from './../dto/ErrorOutput';

export abstract class UseCase<P, R> {
    async process(param?: P) {
        try {
            if (this.guard(param)) {
                const output = await this.execute(param);
                await this.onResult(output);
            } else {
                await this.onGuardError();
            }
        } catch (error) {
            await this.onError(error);
        }
    }

    async execute(param?: P): Promise<Output<R>> {
        throw new Error("Method not implemented.");
    }

    async onError(error: Error) {
        await this.onResult(new ErrorOutput(error));
    }

    async onResult(output?: Output<R>) {
        // Implement in subclass
    }

    guard(param?: P): boolean {
        return true;
    }

    async onGuardError() {
        // Implement in subclass
    }
}