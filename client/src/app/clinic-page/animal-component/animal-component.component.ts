import { Component, Input, EventEmitter, Output } from '@angular/core';
import { CommunicationService } from 'src/communication.service';

export interface animalStructure {
  id : number,
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
  @Output() reloadAnimals = new EventEmitter<string>();
  @Output() showTraitements = new EventEmitter<number>();
  
  photo: string = '';

  constructor(private communicationService:CommunicationService) {
    this.photo = this.getAnimalPhoto();
   }


  getAnimalPhoto() {
    let randomNbr = Math.floor(Math.random() * 5) + 1;
    return "assets/animals/" + randomNbr + ".jpg" 
  }

  delete() {
    console.log(this.animalInformations.id);
    this.communicationService.deleteAnimal(this.animalInformations.id).subscribe(() => { 
      this.reloadAnimals.emit('')
    });
  }
}
