import { Controller } from './../mvvm/Controller';

export interface ControllerFactory<V, T extends Controller> {
  create(context: V): T;
}