import { Injectable } from '@angular/core';
import { AngularFireDatabase, SnapshotAction } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { IFirebaseResult } from '../models/firebase.model';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  constructor(private firebseDataService: AngularFireDatabase) {}

  getItemFirebase(
    idItem: string
  ): Observable<SnapshotAction<IFirebaseResult[]>[]> {
    return this.firebseDataService
      .list<IFirebaseResult[]>('/hdv/' + idItem)
      .snapshotChanges();
  }
}
