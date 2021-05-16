import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  constructor(private firebseDataService: AngularFireDatabase) {}

  getItemFirebase(idItem: string): Observable<any> {
    return this.firebseDataService.list('/hdv/' + idItem).snapshotChanges();
  }
}
