import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { CommunicationService } from 'src/communication.service';
import {Clinique} from '../../../../../common/tables/clinique'

export interface ClinicStructure {
  name: string;
  image : string;
  adress: string;
  number: string;

} 
@Component({
  selector: 'app-clinics',
  templateUrl: './clinics.component.html',
  styleUrls: ['./clinics.component.scss']
})
export class ClinicsComponent {

  private readonly NUMBER_OF_IMAGES = 3;
  public clinics : ClinicStructure[] = []

  constructor(private communicationService : CommunicationService) {
      this.getClinics();
  }
  
  /**
   * Returns all the clinics under the foundation
   * TODO get the clinics from the database
   * @returns 
   */ 
  getClinics() : void {
    this.communicationService.getCliniques().subscribe((cliniques: Clinique[]) => {
      this.clinics = []
      for (let clinique of cliniques) {
      this.clinics.push({
        name: clinique.nom,
        image: this.getRandomClinicImage(),
        adress : `${clinique.rue}, ${clinique.codepostal}, ${clinique.ville} ${clinique.province}`,
        number : clinique.noclinique
      })
    }
    });
   
  }

  private getRandomClinicImage() : string {
    let randomNbr = Math.floor(Math.random() * this.NUMBER_OF_IMAGES) + 1;
    return "assets/clinic-images/" + randomNbr + ".png"
  }
}
