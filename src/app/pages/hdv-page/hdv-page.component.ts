import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import * as moment from 'moment';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Hdv } from 'src/app/models/hdv.model';
import { HdvStateActions } from 'src/app/state/hdv-state/hdv.action';
import { HdvState } from 'src/app/state/hdv-state/hdv.state';

@Component({
  selector: 'app-hdv-page',
  templateUrl: './hdv-page.component.html',
  styleUrls: ['./hdv-page.component.scss'],
})
export class HdvPageComponent implements OnInit {
  // ID Fatalée : 169701
  itemSearchInput: string = '169701';

  @Select(HdvState.ventes) ventes$:
    | Observable<Map<string, Hdv.IJour>>
    | undefined;

  constructor(private readonly store: Store) {}

  ngOnInit(): void {}

  onSearchItem() {
    this.store
      .dispatch(new HdvStateActions.SearchItemAction(this.itemSearchInput))
      .pipe(
        catchError((objectError) => {
          console.log(
            "Erreur lors de la récupération des données de l'item",
            objectError
          );
          return of(undefined);
        })
      )
      .subscribe();
  }
}
