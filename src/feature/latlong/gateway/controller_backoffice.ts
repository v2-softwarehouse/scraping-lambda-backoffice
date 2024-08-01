import { Controller } from "../../../core/mvvm/Controller";

export interface ControllerBackOffice extends Controller {
    fetchLatLong(channelName: string): void
}