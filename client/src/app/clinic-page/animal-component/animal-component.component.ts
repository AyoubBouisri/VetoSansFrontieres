import { Component, Input, OnInit } from '@angular/core';

export interface animalStructure {
  name: string,
  type: string,
  espece: string,
  taille: string,
  poids: string,
  dateDeNaissance: string;
  dateDInscription: string;
  etat: string,
  proprietaire: string
}
@Component({
  selector: 'app-animal-component',
  templateUrl: './animal-component.component.html',
  styleUrls: ['./animal-component.component.scss']
})
export class AnimalComponentComponent {

  @Input() animalInformations: animalStructure;
  
  photo: string = '';
  constructor() {
    this.photo = this.getAnimalPhoto();
   }


  getAnimalPhoto() {
    let randomNbr = Math.floor(Math.random() * 5) + 1;
    return "assets/animals/" + randomNbr + ".jpg" 
  }
}
