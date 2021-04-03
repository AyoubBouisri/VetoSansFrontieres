import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TitleComponent } from './main-page/title/title.component';
import { MainPageComponent } from './main-page/main-page.component';
import { ClinicPageComponent } from './clinic-page/clinic-page.component';
import { ClinicsComponent } from './main-page/clinics/clinics.component';
import { ClinicComponent } from './main-page/clinics/clinic/clinic.component';

@NgModule({
  declarations: [
    AppComponent,
    TitleComponent,
    MainPageComponent,
    ClinicPageComponent,
    ClinicsComponent,
    ClinicComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
