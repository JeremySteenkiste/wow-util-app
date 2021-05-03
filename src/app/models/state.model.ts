import { IStuff } from './equipement.model';
import { ICaracteristique } from './caracteristique.model';

export interface StateModel {
  bnet_token: string;
  caracteristique: ICaracteristique | undefined;
  sutff: IStuff | undefined;
}
