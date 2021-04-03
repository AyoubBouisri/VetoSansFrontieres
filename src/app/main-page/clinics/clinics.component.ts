import { Component, OnInit } from '@angular/core';


// TODO fill up the clinic structure 
export interface ClinicStructure {
  name: string;
  image : string;

} 
@Component({
  selector: 'app-clinics',
  templateUrl: './clinics.component.html',
  styleUrls: ['./clinics.component.scss']
})
export class ClinicsComponent {

  private readonly NUMBER_OF_IMAGES = 3;
  public clinics : ClinicStructure[] = []

  constructor() {
    this.clinics = this.getClinics();
  }
  
  /**
   * Returns all the clinics under the foundation
   * TODO get the clinics from the database
   * @returns 
   */
  getClinics() : ClinicStructure[] {
    return [
      {
        name : 'MONTREAL',
        image : this.getRandomClinicImage()
      },
      {
        name : 'GATINEAU',
        image : this.getRandomClinicImage()
      },
      {
        name : 'ONTARIO',
        image : this.getRandomClinicImage()
      },
      {
        name : 'VANCOUVER',
        image : this.getRandomClinicImage()
      }
    ]
  }

  private getRandomClinicImage() : string {
    let randomNbr = Math.floor(Math.random() * this.NUMBER_OF_IMAGES) + 1;
    return "assets/clinic-images/" + randomNbr + ".png"
  }
}
