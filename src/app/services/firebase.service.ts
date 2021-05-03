import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  db;
  constructor(private firebseDataService: AngularFireDatabase) {
    this.db = this.firebseDataService.database;
  }

  getItemFirebase(idItem: string) {
    return this.db.ref('hdv').child(idItem);
  }
}
