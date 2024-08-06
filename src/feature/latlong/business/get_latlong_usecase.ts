import { Output } from "../../../core/business/dto/Output";
import { ValueOutput } from "../../../core/business/dto/ValueOutput";
import { UseCase } from "../../../core/business/interactor/UseCase";

export class GetLatlongUseCase extends UseCase<string, string> {
    private repo: GoogleAPI;

    constructor(repo: GoogleAPI) {
        super();
        this.repo = repo;
    }

    public execute(_param: string): Promise<Output<string>> {
        console.log("GetLatlongUseCase.execute.start")
        return new Promise<Output<string>>((resolve, reject) => {
            var latlong = this.repo.getLatLong(_param)
            setTimeout( () => {
                resolve(new ValueOutput(latlong));
            }, 1500);
        });
    }
}