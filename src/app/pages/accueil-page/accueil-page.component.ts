import { Component, OnInit } from '@angular/core';
import { PersonnageService } from 'src/app/services/personnage.service';

@Component({
  selector: 'app-accueil-page',
  templateUrl: './accueil-page.component.html',
  styleUrls: ['./accueil-page.component.scss'],
})
export class AccueilPageComponent implements OnInit {
  searchInput: string = '';
  constructor(private personnageService: PersonnageService) {}

  ngOnInit(): void {}

  //TODO: Sélection du serveur de jeu
  onSearch() {
    this.personnageService
      .searchPersonnage(this.searchInput, 'hyjal')
      .subscribe((result) => {
        console.log(result);
      });
  }
}
