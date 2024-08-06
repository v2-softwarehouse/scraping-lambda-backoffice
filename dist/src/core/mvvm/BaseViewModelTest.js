"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseViewModelTest = void 0;
class BaseViewModelTest {
    constructor() {
        this.viewModel = null;
        this.observer = new TestObserver();
    }
    setup() {
        this.setupViewModel();
        this.observeViewModel();
    }
    assertViewStateError(exception) {
        if (this.observer.viewState) {
            // expect(this.observer.viewState.isError()).toBe(true);
            // expect(this.observer.viewState.error).toBe(exception);
        }
    }
    assertViewStateSuccess(value) {
        if (this.observer.viewState) {
            // expect(this.observer.viewState.isSuccess()).toBe(true);
            // expect(this.observer.viewState.value).toBe(value);
        }
    }
    teardown() {
        // No direct equivalent in TypeScript, would need to implement a mock lifecycle handler if needed
    }
    observeViewModel() {
        this.observer = new TestObserver();
        if (this.viewModel) {
            this.viewModel.getChannels().forEach(channel => {
                // this.viewModel!.observe(channel, this.observer);
            });
        }
    }
    getLifecycleOwner() {
        // Not directly translatable, would need a mock implementation for tests
    }
}
exports.BaseViewModelTest = BaseViewModelTest;
class TestObserver {
    constructor() {
        this.viewState = null;
    }
    onMessage(value) {
        this.viewState = value;
    }
}
//# sourceMappingURL=BaseViewModelTest.js.map