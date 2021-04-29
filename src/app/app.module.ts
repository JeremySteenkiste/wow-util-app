import { AppRoutingModule } from './app-routing-module';
import { NgModule } from '@angular/core';
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

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const materialImports = [
  MatButtonModule,
  MatToolbarModule,
  MatInputModule,
  MatIconModule,
];
@NgModule({
  declarations: [AppComponent, AccueilPageComponent, OptimisationPageComponent],
  imports: [
    BrowserModule,
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
