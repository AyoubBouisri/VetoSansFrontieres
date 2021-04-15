import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TitleComponent } from './main-page/title/title.component';
import { MainPageComponent } from './main-page/main-page.component';
import { ClinicPageComponent } from './clinic-page/clinic-page.component';
import { ClinicsComponent } from './main-page/clinics/clinics.component';
import { ClinicComponent } from './main-page/clinics/clinic/clinic.component';
import { AnimalComponentComponent } from './clinic-page/animal-component/animal-component.component';
import { CommunicationService } from 'src/communication.service';

@NgModule({
  declarations: [
    AppComponent,
    TitleComponent,
    MainPageComponent,
    ClinicPageComponent,
    ClinicsComponent,
    ClinicComponent,
    AnimalComponentComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    CommunicationService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
