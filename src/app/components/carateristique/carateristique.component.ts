import { IStuff } from './../../models/equipement.model';
import { AppState } from './../../state/app.state';
import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable, ObservedValueOf } from 'rxjs';
import { ICaracteristique } from 'src/app/models/caracteristique.model';

@Component({
  selector: 'carateristique',
  templateUrl: './carateristique.component.html',
  styleUrls: ['./carateristique.component.scss'],
})
export class CarateristiqueComponent implements OnInit {
  @Select(AppState.caracteristique) caract$:
    | Observable<ICaracteristique>
    | undefined;
  @Select(AppState.stuff) stuff$: Observable<IStuff> | undefined;
  constructor() {}

  ngOnInit(): void {}
}
