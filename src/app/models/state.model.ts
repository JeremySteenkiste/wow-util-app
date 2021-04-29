import { IStuff } from './equipement.model';
import { ICaracteristique } from './caracteristique.model';

export interface StateModel {
  caracteristique: ICaracteristique | undefined;
  sutff: IStuff | undefined;
}
