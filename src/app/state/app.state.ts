import { IStuff } from './../models/equipement.model';
import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { StateModel } from '../models/state.model';
import { PersonnageService } from '../services/personnage.service';
import { AppStateActions } from './app.actions';
import { switchMap, map } from 'rxjs/operators';
import { forkJoin, of } from 'rxjs';
@State<StateModel>({
  name: 'AppState',
  defaults: {
    caracteristique: undefined,
    sutff: undefined,
  },
})
@Injectable()
export class AppState {
  constructor(private persoService: PersonnageService) {}

  @Selector()
  static caracteristique(state: StateModel) {
    return state.caracteristique;
  }
  @Selector()
  static stuff(state: StateModel) {
    return state.sutff;
  }

  @Action(AppStateActions.SearchAction)
  search(ctx: StateContext<StateModel>, action: AppStateActions.SearchAction) {
    //Appel de la ressource pour récupérer le personnage
    return this.persoService
      .searchPersonnage(action.nomPerso, action.serveur)
      .pipe(
        switchMap((character) => {
          if (character) {
            ctx.patchState({
              caracteristique: {
                pseudo: character.name,
                classe: character.character_class.name,
                specialisation: character.active_spec.name,
                faction: character.faction.name,
                ilevel: character.equipped_item_level,
                niveau: character.level,
                race: character.race.name,
              },
            });
            //Appel la ressource pour récupérer l'équipement
            return forkJoin([
              this.persoService.getEquipement(character.equipment.href),
            ]).pipe(
              map((data: any[]) => {
                this.mappingEquipement(ctx, data[0]);
              })
            );
          } else {
            ctx.patchState({ caracteristique: undefined });
            return of(undefined);
          }
        })
      );
  }

  mappingEquipement(ctx: StateContext<StateModel>, dataBnet: any) {
    console.log(dataBnet.equipped_items);
    let stuffTMP: IStuff = {};

    dataBnet.equipped_items.forEach((item: any) => {
      switch (item.slot.type) {
        case 'HEAD':
          stuffTMP.tete = {
            id: item.item.id,
            nom: item.name.fr_FR,
          };
          item.bonus_list
            ? (stuffTMP.tete.id += '?bonus=' + item.bonus_list.join(':'))
            : null;
          break;
        case 'NECK':
          stuffTMP.cou = {
            id: item.item.id,
            nom: item.name.fr_FR,
          };
          item.bonus_list
            ? (stuffTMP.cou.id += '?bonus=' + item.bonus_list.join(':'))
            : null;
          break;
        case 'SHOULDER':
          stuffTMP.epaules = {
            id: item.item.id,
            nom: item.name.fr_FR,
          };
          item.bonus_list
            ? (stuffTMP.epaules.id += '?bonus=' + item.bonus_list.join(':'))
            : null;
          break;
        case 'WAIST':
          stuffTMP.ceinture = {
            id: item.item.id,
            nom: item.name.fr_FR,
          };
          item.bonus_list
            ? (stuffTMP.ceinture.id += '?bonus=' + item.bonus_list.join(':'))
            : null;
          break;
        case 'LEGS':
          stuffTMP.jambes = {
            id: item.item.id,
            nom: item.name.fr_FR,
          };
          item.bonus_list
            ? (stuffTMP.jambes.id += '?bonus=' + item.bonus_list.join(':'))
            : null;
          break;
        case 'FEET':
          stuffTMP.pieds = {
            id: item.item.id,
            nom: item.name.fr_FR,
          };
          item.bonus_list
            ? (stuffTMP.pieds.id += '?bonus=' + item.bonus_list.join(':'))
            : null;
          break;
        case 'WRIST':
          stuffTMP.brassard = {
            id: item.item.id,
            nom: item.name.fr_FR,
          };
          item.bonus_list
            ? (stuffTMP.brassard.id += '?bonus=' + item.bonus_list.join(':'))
            : null;
          break;
        case 'HANDS':
          stuffTMP.mains = {
            id: item.item.id,
            nom: item.name.fr_FR,
          };
          item.bonus_list
            ? (stuffTMP.mains.id += '?bonus=' + item.bonus_list.join(':'))
            : null;
          break;
        case 'FINGER_1':
          stuffTMP.bague1 = {
            id: item.item.id,
            nom: item.name.fr_FR,
          };
          item.bonus_list
            ? (stuffTMP.bague1.id += '?bonus=' + item.bonus_list.join(':'))
            : null;
          break;
        case 'FINGER_2':
          stuffTMP.bague2 = {
            id: item.item.id,
            nom: item.name.fr_FR,
          };
          item.bonus_list
            ? (stuffTMP.bague2.id += '?bonus=' + item.bonus_list.join(':'))
            : null;
          break;
        case 'TRINKET_1':
          stuffTMP.bijou1 = {
            id: item.item.id,
            nom: item.name.fr_FR,
          };
          item.bonus_list
            ? (stuffTMP.bijou1.id += '?bonus=' + item.bonus_list.join(':'))
            : null;
          break;
        case 'TRINKET_2':
          stuffTMP.bijou2 = {
            id: item.item.id,
            nom: item.name.fr_FR,
          };
          item.bonus_list
            ? (stuffTMP.bijou2.id += '?bonus=' + item.bonus_list.join(':'))
            : null;
          break;
        case 'BACK':
          stuffTMP.dos = {
            id: item.item.id,
            nom: item.name.fr_FR,
          };
          item.bonus_list
            ? (stuffTMP.dos.id += '?bonus=' + item.bonus_list.join(':'))
            : null;
          break;
        case 'CHEST':
          stuffTMP.torse = {
            id: item.item.id,
            nom: item.name.fr_FR,
          };
          item.bonus_list
            ? (stuffTMP.torse.id += '?bonus=' + item.bonus_list.join(':'))
            : null;
          break;
        case 'TABARD':
          stuffTMP.tabard = {
            id: item.item.id,
            nom: item.name.fr_FR,
          };
          item.bonus_list
            ? (stuffTMP.tabard.id += '?bonus=' + item.bonus_list.join(':'))
            : null;
          break;
        case 'SHIRT':
          stuffTMP.chemise = {
            id: item.item.id,
            nom: item.name.fr_FR,
          };
          item.bonus_list
            ? (stuffTMP.chemise.id += '?bonus=' + item.bonus_list.join(':'))
            : null;
          break;
        default:
          break;
      }
    });
    ctx.patchState({
      sutff: stuffTMP,
    });
  }
}
