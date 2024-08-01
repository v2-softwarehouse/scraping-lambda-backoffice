import { Output } from "./Output";

export class ValueOutput<V> extends Output<V> {
    constructor(value: V | null = null) {
        super(value, null);
    }

    isError(): boolean {
        return false;
    }
}