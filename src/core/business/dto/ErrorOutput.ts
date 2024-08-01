import { Output } from "./Output";

export class ErrorOutput<V> extends Output<V> {
    constructor(error: Error, value: V | null = null) {
        super(value, error);
    }

    isError(): boolean {
        return true;
    }
}

