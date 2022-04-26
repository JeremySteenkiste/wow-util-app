import { DataSnapshot } from '@angular/fire/database/interfaces';

export interface IFirebaseResult {
  payload: DataSnapshot;
  key: string;
  type: string;
  prevKey?: string;
}
