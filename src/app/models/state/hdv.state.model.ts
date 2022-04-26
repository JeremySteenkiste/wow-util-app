import { Hdv } from '../hdv.model';

export interface IHdvState {
  idItem: number;
  ventes: Map<string, Hdv.IJour>;
}
