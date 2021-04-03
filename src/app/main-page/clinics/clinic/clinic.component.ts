import { Component, OnInit, Input } from '@angular/core';
import { ClinicStructure } from '../clinics.component';

@Component({
  selector: 'app-clinic',
  templateUrl: './clinic.component.html',
  styleUrls: ['./clinic.component.scss']
})
export class ClinicComponent {
  @Input() clinicInformation: ClinicStructure;

  constructor() { }

  

}
