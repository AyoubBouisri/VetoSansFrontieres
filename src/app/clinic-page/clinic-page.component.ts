import { Component, OnInit } from '@angular/core';
import { ClinicStructure } from '../main-page/clinics/clinics.component';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-clinic-page',
  templateUrl: './clinic-page.component.html',
  styleUrls: ['./clinic-page.component.scss']
})
export class ClinicPageComponent implements OnInit {

  // give the initial clinic information empty values while the real clinic info is loading
  public clinicInformation: ClinicStructure = {
    name: '',
    adress: '',
    number: '',
    image: ''
  }

  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe( params => this.getClinicInformation(params.id) );
  }
  
  ngOnInit(): void {
  }

  getClinicInformation( id: string ) : void {
    // temporary for now TODO change to get from DB
    this.clinicInformation = {
      name: 'TEST',
      adress: '1234, rue LaRue, H9T 3T5',
      number: '123',
      image: ''
    }
  }

  getAnimals() : void {

  }
}
