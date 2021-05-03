import { Component, OnInit } from '@angular/core';
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
    this.firebaseService
      .getItemFirebase(this.itemSearchInput)
      .on('value', (dataResult) => {
        this.data = dataResult.val();
      });
  }
}
