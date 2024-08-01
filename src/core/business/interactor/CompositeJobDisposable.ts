import { Worker } from 'worker_threads';

export class CompositeJobDisposable {
    private list: Worker[] = [];
    private purgeInterval: NodeJS.Timeout;

    constructor() {
        this.purgeInterval = setInterval(this.purge.bind(this), 2 * 60 * 1000);
    }

    add(worker: Worker | null) {
        if (worker !== null) {
            this.list.push(worker);
        }
    }

    remove(worker: Worker) {
        const index = this.list.indexOf(worker);
        if (index !== -1) {
            this.list.splice(index, 1);
        }
    }

    cancel() {
        this.list.forEach(worker => worker.terminate());
        this.list = [];
    }

    private purge() {
        this.list = this.list.filter(worker => worker.threadId !== -1);
    }
}
