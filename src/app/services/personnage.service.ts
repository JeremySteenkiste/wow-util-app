import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BNET_TOKEN, BNET_URL } from '../constantes/constantes';

@Injectable({
  providedIn: 'root',
})
export class PersonnageService {
  constructor(private httpService: HttpClient) {}

  /**
   * Appel l'API Bnet pour récupérer le profile d'un personnage ciblé
   * @param nom Nom du perssonnage recerché
   * @param serveur Serveur associé au personnage rechercher
   * @returns
   */
  searchPersonnage(nom: string, serveur: string): Observable<any> {
    console.log('Search Personnage : ', nom, serveur);
    //TODO: Gestion de l'erreur
    return this.httpService.get(
      BNET_URL +
        '/profile/wow/character/' +
        serveur.toLowerCase() +
        '/' +
        nom.toLowerCase(),
      {
        params: {
          namespace: 'profile-eu',
          locale: 'fr_FR',
          access_token: BNET_TOKEN,
        },
      }
    );
  }
}
