import { AppRoutingModule } from './app-routing-module';
import { NgModule } from '@angular/core';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AccueilPageComponent } from './pages/accueil-page/accueil-page.component';
import { OptimisationPageComponent } from './pages/optimisation-page/optimisation-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxsModule } from '@ngxs/store';
import { AppState } from './state/app.state';
import { CarateristiqueComponent } from './components/carateristique/carateristique.component';
import { HdvPageComponent } from './pages/hdv-page/hdv-page.component';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { AngularFireAnalyticsModule } from '@angular/fire/analytics';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { HdvState } from './state/hdv-state/hdv.state';

const materialImports = [
  MatButtonModule,
  MatToolbarModule,
  MatInputModule,
  MatIconModule,
  MatSnackBarModule,
];
@NgModule({
  declarations: [
    AppComponent,
    AccueilPageComponent,
    OptimisationPageComponent,
    CarateristiqueComponent,
    HdvPageComponent,
  ],
  imports: [
    NgxsModule.forRoot([AppState, HdvState]),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAnalyticsModule,
    AngularFireDatabaseModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ...materialImports,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
