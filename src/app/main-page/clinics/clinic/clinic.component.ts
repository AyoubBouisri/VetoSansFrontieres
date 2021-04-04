import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ClinicStructure } from '../clinics.component';

@Component({
  selector: 'app-clinic',
  templateUrl: './clinic.component.html',
  styleUrls: ['./clinic.component.scss']
})
export class ClinicComponent {
  @Input() clinicInformation: ClinicStructure;

  constructor(private route : Router) { }

  openClinicPage(event: any) : void {
    this.route.navigate(['/clinic/' + this.clinicInformation.number])
  }

}
