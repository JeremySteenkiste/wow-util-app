import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hdv-page',
  templateUrl: './hdv-page.component.html',
  styleUrls: ['./hdv-page.component.scss'],
})
export class HdvPageComponent implements OnInit {
  // ID Fatalée : 169701
  itemSearchInput: string = '169701';

  constructor() {}

  ngOnInit(): void {}

  onSearchItem() {
    console.log("ID de l'item recherché : ", this.itemSearchInput);
  }
}
