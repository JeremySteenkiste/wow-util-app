import { BNET_CONFIG } from './../constantes/constantes';
import { switchMap, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BnetAuthService {
  constructor(private http: HttpClient) {}

  getTokenBnet(): Observable<any> {
    let credentials = BNET_CONFIG.client_id + ':' + BNET_CONFIG.client_secret;
    return this.http
      .post(
        'https://eu.battle.net/oauth/token?grant_type=client_credentials',
        {},
        {
          headers: {
            Authorization: `Basic ${btoa(credentials)}`,
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      )
      .pipe(
        switchMap((bnetResult: any) => {
          return of(bnetResult.access_token);
        })
      );
  }
}
