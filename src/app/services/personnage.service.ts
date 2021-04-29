import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { BNET_TOKEN, BNET_URL } from '../constantes/constantes';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PersonnageService {
  constructor(private httpService: HttpClient, private snackBar: MatSnackBar) {}

  /**
   * Appel l'API Bnet pour récupérer le profile d'un personnage ciblé
   * @param nom Nom du perssonnage recerché
   * @param serveur Serveur associé au personnage rechercher
   * @returns
   */
  searchPersonnage(nom: string, serveur: string): Observable<any> {
    console.log('Search Personnage : ', nom, serveur);
    this.snackBar.dismiss();

    let url: string =
      BNET_URL +
      '/profile/wow/character/' +
      serveur.toLowerCase() +
      '/' +
      nom.toLowerCase();

    return this.httpService
      .get(url, {
        params: {
          namespace: 'profile-eu',
          locale: 'fr_FR',
          access_token: BNET_TOKEN,
        },
      })
      .pipe(
        catchError((error) => {
          this.snackBar.open(
            'Erreur lors de la récupération du personnage : ' + nom
          );
          return of(undefined);
        })
      );
  }
  /**
   * Appel l'API Bnet pour récuperer le stuff du perosnnage ciblé
   * @param url url du stuff de la personne
   * @returns
   */
  getEquipement(url: string): Observable<any> {
    return this.httpService
      .get(url, { params: { access_token: BNET_TOKEN } })
      .pipe(
        catchError((error) => {
          this.snackBar.open('Erreur lors de la récupération de lequipement');
          return of(undefined);
        })
      );
  }

  getMediaItem(id: string): Observable<any> {
    let url: string = BNET_URL + 'data/wow/media/item/' + id;
    return this.httpService
      .get(url, {
        params: {
          namespace: 'static-eu',
          locale: 'fr_FR',
          access_token: BNET_TOKEN,
        },
      })
      .pipe(
        catchError((error) => {
          this.snackBar.open(
            'Erreur lors de la récupération de limage de litem'
          );
          return of(undefined);
        })
      );
  }
}
