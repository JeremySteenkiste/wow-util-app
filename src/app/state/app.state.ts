import { BnetAuthService } from './../services/bnet-auth.service';
import { IStuff } from './../models/equipement.model';
import { Injectable } from '@angular/core';
import { Action, Select, Selector, State, StateContext } from '@ngxs/store';
import { StateModel } from '../models/state.model';
import { PersonnageService } from '../services/personnage.service';
import { AppStateActions } from './app.actions';
import { switchMap, map, catchError } from 'rxjs/operators';
import { forkJoin, of } from 'rxjs';
@State<StateModel>({
  name: 'AppState',
  defaults: {
    bnet_token: '',
    caracteristique: undefined,
    sutff: undefined,
  },
})
@Injectable()
export class AppState {
  constructor(
    private persoService: PersonnageService,
    private bnetAuth: BnetAuthService
  ) {}

  @Selector()
  static bnetToken(state: StateModel) {
    return state.bnet_token;
  }

  @Selector()
  static caracteristique(state: StateModel) {
    return state.caracteristique;
  }
  @Selector()
  static stuff(state: StateModel) {
    return state.sutff;
  }

  @Action(AppStateActions.InitAction)
  init(ctx: StateContext<StateModel>) {
    this.bnetAuth.getTokenBnet().subscribe((token: string) => {
      ctx.patchState({
        bnet_token: token,
      });
    });
  }

  @Action(AppStateActions.SearchAction)
  search(ctx: StateContext<StateModel>, action: AppStateActions.SearchAction) {
    let token = ctx.getState().bnet_token;
    //Appel de la ressource pour récupérer le personnage
    return this.persoService
      .searchPersonnage(action.nomPerso, action.serveur, token)
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

            return this.persoService
              .getEquipement(character.equipment.href, token)
              .pipe(
                switchMap((equipements) => {
                  let obs$: any[] = [];
                  equipements.equipped_items.forEach((equipement: any) => {
                    obs$.push(
                      this.persoService.getMediaItem(equipement.item.id, token)
                    );
                  });
                  return forkJoin(obs$).pipe(
                    map((data: any[]) => {
                      this.mappingEquipement(ctx, equipements, data);
                    })
                  );
                })
              );
          } else {
            ctx.patchState({ caracteristique: undefined });
            return of(undefined);
          }
        })
      );
  }

  mappingEquipement(
    ctx: StateContext<StateModel>,
    dataBnet: any,
    assetData: any[]
  ) {
    let stuffTMP: IStuff = {};
    dataBnet.equipped_items.forEach((item: any) => {
      switch (item.slot.type) {
        case 'HEAD':
          let assetHead = assetData.filter(
            (asset) => asset.id === item.item.id
          );
          stuffTMP.tete = {
            id: item.item.id,
            nom: item.name.fr_FR,
            imageUrl: assetHead ? assetHead[0].assets[0].value : undefined,
          };
          item.bonus_list
            ? (stuffTMP.tete.id += '?bonus=' + item.bonus_list.join(':'))
            : null;
          break;
        case 'NECK':
          let assetNeck = assetData.filter(
            (asset) => asset.id === item.item.id
          );
          stuffTMP.cou = {
            id: item.item.id,
            nom: item.name.fr_FR,
            imageUrl: assetNeck ? assetNeck[0].assets[0].value : undefined,
          };
          item.bonus_list
            ? (stuffTMP.cou.id += '?bonus=' + item.bonus_list.join(':'))
            : null;
          break;
        case 'SHOULDER':
          let assetShoulder = assetData.filter(
            (asset) => asset.id === item.item.id
          );
          stuffTMP.epaules = {
            id: item.item.id,
            nom: item.name.fr_FR,
            imageUrl: assetShoulder
              ? assetShoulder[0].assets[0].value
              : undefined,
          };
          item.bonus_list
            ? (stuffTMP.epaules.id += '?bonus=' + item.bonus_list.join(':'))
            : null;
          break;
        case 'WAIST':
          let assetWaist = assetData.filter(
            (asset) => asset.id === item.item.id
          );
          stuffTMP.ceinture = {
            id: item.item.id,
            nom: item.name.fr_FR,
            imageUrl: assetWaist ? assetWaist[0].assets[0].value : undefined,
          };
          item.bonus_list
            ? (stuffTMP.ceinture.id += '?bonus=' + item.bonus_list.join(':'))
            : null;
          break;
        case 'LEGS':
          let assetLegs = assetData.filter(
            (asset) => asset.id === item.item.id
          );
          stuffTMP.jambes = {
            id: item.item.id,
            nom: item.name.fr_FR,
            imageUrl: assetLegs ? assetLegs[0].assets[0].value : undefined,
          };
          item.bonus_list
            ? (stuffTMP.jambes.id += '?bonus=' + item.bonus_list.join(':'))
            : null;
          break;
        case 'FEET':
          let assetFeet = assetData.filter(
            (asset) => asset.id === item.item.id
          );
          stuffTMP.pieds = {
            id: item.item.id,
            nom: item.name.fr_FR,
            imageUrl: assetFeet ? assetFeet[0].assets[0].value : undefined,
          };
          item.bonus_list
            ? (stuffTMP.pieds.id += '?bonus=' + item.bonus_list.join(':'))
            : null;
          break;
        case 'WRIST':
          let assetBrassard = assetData.filter(
            (asset) => asset.id === item.item.id
          );
          stuffTMP.brassard = {
            id: item.item.id,
            nom: item.name.fr_FR,
            imageUrl: assetBrassard
              ? assetBrassard[0].assets[0].value
              : undefined,
          };
          item.bonus_list
            ? (stuffTMP.brassard.id += '?bonus=' + item.bonus_list.join(':'))
            : null;
          break;
        case 'HANDS':
          let assetHands = assetData.filter(
            (asset) => asset.id === item.item.id
          );
          stuffTMP.mains = {
            id: item.item.id,
            nom: item.name.fr_FR,
            imageUrl: assetHands ? assetHands[0].assets[0].value : undefined,
          };
          item.bonus_list
            ? (stuffTMP.mains.id += '?bonus=' + item.bonus_list.join(':'))
            : null;
          break;
        case 'FINGER_1':
          let assetFinger1 = assetData.filter(
            (asset) => asset.id === item.item.id
          );
          stuffTMP.bague1 = {
            id: item.item.id,
            nom: item.name.fr_FR,
            imageUrl: assetFinger1
              ? assetFinger1[0].assets[0].value
              : undefined,
          };
          item.bonus_list
            ? (stuffTMP.bague1.id += '?bonus=' + item.bonus_list.join(':'))
            : null;
          break;
        case 'FINGER_2':
          let assetFinger2 = assetData.filter(
            (asset) => asset.id === item.item.id
          );
          stuffTMP.bague2 = {
            id: item.item.id,
            nom: item.name.fr_FR,
            imageUrl: assetFinger2
              ? assetFinger2[0].assets[0].value
              : undefined,
          };
          item.bonus_list
            ? (stuffTMP.bague2.id += '?bonus=' + item.bonus_list.join(':'))
            : null;
          break;
        case 'TRINKET_1':
          let assetTrinket1 = assetData.filter(
            (asset) => asset.id === item.item.id
          );
          stuffTMP.bijou1 = {
            id: item.item.id,
            nom: item.name.fr_FR,
            imageUrl: assetTrinket1
              ? assetTrinket1[0].assets[0].value
              : undefined,
          };
          item.bonus_list
            ? (stuffTMP.bijou1.id += '?bonus=' + item.bonus_list.join(':'))
            : null;
          break;
        case 'TRINKET_2':
          let assetTrinket2 = assetData.filter(
            (asset) => asset.id === item.item.id
          );
          stuffTMP.bijou2 = {
            id: item.item.id,
            nom: item.name.fr_FR,
            imageUrl: assetTrinket2
              ? assetTrinket2[0].assets[0].value
              : undefined,
          };
          item.bonus_list
            ? (stuffTMP.bijou2.id += '?bonus=' + item.bonus_list.join(':'))
            : null;
          break;
        case 'BACK':
          let assetBack = assetData.filter(
            (asset) => asset.id === item.item.id
          );
          stuffTMP.dos = {
            id: item.item.id,
            nom: item.name.fr_FR,
            imageUrl: assetBack ? assetBack[0].assets[0].value : undefined,
          };
          item.bonus_list
            ? (stuffTMP.dos.id += '?bonus=' + item.bonus_list.join(':'))
            : null;
          break;
        case 'CHEST':
          let assetChest = assetData.filter(
            (asset) => asset.id === item.item.id
          );
          stuffTMP.torse = {
            id: item.item.id,
            nom: item.name.fr_FR,
            imageUrl: assetChest ? assetChest[0].assets[0].value : undefined,
          };
          item.bonus_list
            ? (stuffTMP.torse.id += '?bonus=' + item.bonus_list.join(':'))
            : null;
          break;
        case 'TABARD':
          let assetTabard = assetData.filter(
            (asset) => asset.id === item.item.id
          );
          stuffTMP.tabard = {
            id: item.item.id,
            nom: item.name.fr_FR,
            imageUrl: assetTabard ? assetTabard[0].assets[0].value : undefined,
          };
          item.bonus_list
            ? (stuffTMP.tabard.id += '?bonus=' + item.bonus_list.join(':'))
            : null;
          break;
        case 'SHIRT':
          let assetShirt = assetData.filter(
            (asset) => asset.id === item.item.id
          );
          stuffTMP.chemise = {
            id: item.item.id,
            nom: item.name.fr_FR,
            imageUrl: assetShirt ? assetShirt[0].assets[0].value : undefined,
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

  /**
   * credentilas sous string
   * btoa(credentials)
   */
}
