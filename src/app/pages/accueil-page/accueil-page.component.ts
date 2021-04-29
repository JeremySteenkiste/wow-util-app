import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { AppStateActions } from 'src/app/state/app.actions';

@Component({
  selector: 'app-accueil-page',
  templateUrl: './accueil-page.component.html',
  styleUrls: ['./accueil-page.component.scss'],
})
export class AccueilPageComponent implements OnInit {
  searchInput: string = '';
  constructor(private store: Store) {}

  ngOnInit(): void {}

  //TODO: Sélection du serveur de jeu
  onSearch() {
    this.store.dispatch(
      new AppStateActions.SearchAction(this.searchInput, 'hyjal')
    );
  }
}
