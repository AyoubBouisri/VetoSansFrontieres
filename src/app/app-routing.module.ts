import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClinicPageComponent } from './clinic-page/clinic-page.component';
import { MainPageComponent } from './main-page/main-page.component'

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: MainPageComponent },
  { path: 'clinic/:id', component: ClinicPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
