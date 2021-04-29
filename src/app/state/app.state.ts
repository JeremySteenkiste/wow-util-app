import { ICaracteristique } from './../models/caracteristique.model';
import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { StateModel } from '../models/state.model';
import { PersonnageService } from '../services/personnage.service';
import { AppStateActions } from './app.actions';
import { map } from 'rxjs/operators';
import { AppStateSelectorEnum } from './app.selectors';
import { Observable } from 'rxjs';
@State<StateModel>({
  name: 'AppState',
  defaults: {
    caracteristique: undefined,
  },
})
@Injectable()
export class AppState {
  constructor(private persoService: PersonnageService) {}

  @Selector()
  static caracteristique(state: StateModel) {
    return state.caracteristique;
  }

  @Action(AppStateActions.SearchAction)
  search(ctx: StateContext<StateModel>, action: AppStateActions.SearchAction) {
    return this.persoService
      .searchPersonnage(action.nomPerso, action.serveur)
      .pipe(
        map((result) => {
          console.log(result);
          if (result) {
            ctx.patchState({
              caracteristique: {
                pseudo: result.name,
                classe: result.character_class.name,
                specialisation: result.active_spec.name,
                faction: result.faction.name,
                ilevel: result.equipped_item_level,
                niveau: result.level,
                race: result.race.name,
              },
            });
          } else {
            ctx.patchState({ caracteristique: undefined });
          }
        })
      );
  }
}
