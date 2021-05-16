import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-hdv-page',
  templateUrl: './hdv-page.component.html',
  styleUrls: ['./hdv-page.component.scss'],
})
export class HdvPageComponent implements OnInit {
  // ID Fatalée : 169701
  itemSearchInput: string = '169701';

  data: any;

  constructor(private readonly firebaseService: FirebaseService) {}

  ngOnInit(): void {}

  onSearchItem() {
    console.log('Search item ' + this.itemSearchInput);

    let today = moment().format('DD-MM-YYYY').toString();
    console.log(today);
    //Récupération de toutes les ventes de l'item
    this.firebaseService
      .getItemFirebase(this.itemSearchInput)
      .subscribe((result) => {
        let test = result[0].payload.val() as object;
        let keys = Object.keys(test)[0];
        let data: any = test[keys as keyof typeof test];
        let ventes: any[] = data.ventes;
        ventes.sort((a, b) => {
          return a.prix_unite - b.prix_unite;
        });
        this.data = ventes;
        console.log(data.ventes);
      });
  }
}
