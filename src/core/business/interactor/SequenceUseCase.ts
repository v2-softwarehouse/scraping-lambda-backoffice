import { UseCase } from './UseCase';
import { Output } from './../dto/Output';
import { ValueOutput } from './../dto/ValueOutput';
import { UseCaseUnit } from './UseCaseUnit';

export class SequenceUseCase extends UseCase<null, Output<any>[]> {
  private stream: Output<any>[] = [];

  constructor(private units: UseCaseUnit<any, any>[]) {
      super();
  }

  static builder() {
      return new Builder();
  }

  public async execute(param: null): Promise<Output<Output<any>[]>> {
    for (const unit of this.units) {
          const output = await unit.process();
          this.stream.push(output);
      }
      return new ValueOutput(this.stream);
  }
}

class Builder {
  private list: UseCaseUnit<any, any>[] = [];

  add<P, R>(useCase: UseCase<P, R>, param: P | null = null): Builder {
      this.list.push(new UseCaseUnit(useCase, param));
      return this;
  }

  build(): UseCase<null, Output<any>[]> {
      return new SequenceUseCase(this.list);
  }
}