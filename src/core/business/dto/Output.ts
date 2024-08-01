export abstract class Output<V> {
    constructor(public value: V | null = null, public error: Error | null = null) {}

    isError(): boolean {
        return this.error !== null;
    }

    isSuccess(): boolean {
        return !this.isError();
    }

    isEmpty(): boolean {
        return this.value !== null;
    }
}