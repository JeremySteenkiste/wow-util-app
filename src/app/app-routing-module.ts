import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilPageComponent } from './pages/accueil-page/accueil-page.component';
import { HdvPageComponent } from './pages/hdv-page/hdv-page.component';
import { OptimisationPageComponent } from './pages/optimisation-page/optimisation-page.component';

const routes: Routes = [
  { path: 'accueil', component: AccueilPageComponent },
  { path: 'optimisation', component: OptimisationPageComponent },
  { path: 'hdv', component: HdvPageComponent },
  { path: '', redirectTo: 'accueil', pathMatch: 'full' },
  { path: '**', redirectTo: 'accueil' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
