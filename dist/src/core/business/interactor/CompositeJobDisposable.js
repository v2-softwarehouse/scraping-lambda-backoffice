"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompositeJobDisposable = void 0;
class CompositeJobDisposable {
    constructor() {
        this.list = [];
        // this.purgeInterval = setInterval(this.purge.bind(this), 2 * 60 * 1000);
    }
    add(worker) {
        if (worker !== null) {
            this.list.push(worker);
        }
    }
    remove(worker) {
        const index = this.list.indexOf(worker);
        if (index !== -1) {
            this.list.splice(index, 1);
        }
    }
    cancel() {
        this.list.forEach(worker => worker.terminate());
        this.list = [];
    }
}
exports.CompositeJobDisposable = CompositeJobDisposable;
//# sourceMappingURL=CompositeJobDisposable.js.map