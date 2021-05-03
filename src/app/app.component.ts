import { AppStateActions } from 'src/app/state/app.actions';
import { Store } from '@ngxs/store';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'wow-util-app';

  constructor(private readonly store: Store) {}
  ngOnInit() {
    this.store.dispatch(new AppStateActions.InitAction());
  }
}
