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

  data: Observable<any> | undefined;

  constructor(private readonly firebaseService: FirebaseService) {}

  ngOnInit(): void {}

  onSearchItem() {
    console.log('Search item ' + this.itemSearchInput);

    let today = moment().format('DD-MM-YYYY').toString();
    console.log(today);
    //Récupération de toutes les ventes de l'item
    this.firebaseService
      .getItemFirebase(this.itemSearchInput)
      .subscribe((dataResult: any[]) => {
        let venteDuJour = dataResult.filter((dataItem: any) => {
          return dataItem.key === today;
        });
        console.log(venteDuJour[0].payload.val());
      });
  }
}
