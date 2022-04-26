import { Injectable } from '@angular/core';
import { SnapshotAction } from '@angular/fire/database';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { map, take } from 'rxjs/operators';
import { IFirebaseResult } from 'src/app/models/firebase.model';
import { Hdv } from 'src/app/models/hdv.model';
import { IHdvState } from 'src/app/models/state/hdv.state.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { HdvStateActions } from './hdv.action';

@State<IHdvState>({
  name: 'HdvState',
})
@Injectable()
export class HdvState {
  constructor(private readonly firebaseService: FirebaseService) {}

  @Selector()
  static ventes(state: IHdvState) {
    return state.ventes;
  }

  @Action(HdvStateActions.SearchItemAction)
  searchItem(
    ctx: StateContext<IHdvState>,
    action: HdvStateActions.SearchItemAction
  ) {
    console.log('Search item ' + action.inputText);
    return this.firebaseService.getItemFirebase(action.inputText).pipe(
      take(1),
      map((result: SnapshotAction<IFirebaseResult[]>[]) => {
        let ventes = new Map<string, Hdv.IJour>();

        result.forEach((jour: SnapshotAction<IFirebaseResult[]>) => {
          let donneesDunJour = jour.payload.val() as any;
          let heures = Object.keys(donneesDunJour as object);
          let mapHeures = new Map<string, Hdv.IHeure>();
          heures.forEach((heure: string) => {
            let venteHeure: Hdv.IVente[] = donneesDunJour[heure].ventes;
            venteHeure.sort((a, b) => {
              return a.prix_unite - b.prix_unite;
            });
            mapHeures.set(heure, {
              ventes: donneesDunJour[heure].ventes,
            });
          });
          ventes.set(jour.key as string, {
            heures: mapHeures,
          });
        });

        return ctx.patchState({
          idItem: parseInt(action.inputText),
          ventes,
        });
      })
    );
  }
}
