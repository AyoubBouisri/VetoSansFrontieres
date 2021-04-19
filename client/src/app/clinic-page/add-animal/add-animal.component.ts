import { Component, Output, EventEmitter, Input } from '@angular/core';
import { CommunicationService } from 'src/communication.service';
import {animal} from '../../../../../common/tables/animal'
import {Proprietaire}  from '../../../../../common/tables/proprietaire'
@Component({
  selector: 'app-add-animal',
  templateUrl: './add-animal.component.html',
  styleUrls: ['./add-animal.component.scss']
})
export class AddAnimalComponent {
  @Input() proprietaires : Proprietaire[];
  @Input() noClinique
  @Output() close = new EventEmitter<boolean>();
  constructor(private communicationService: CommunicationService) { }

  addAnimal() : void {
    if (this.validateForm()) {
      let newAnimal : animal = {
        noanimal : 0,
        nom: (document.getElementById('nom-input') as HTMLInputElement).value,
        typeanimal: (document.getElementById('type-input') as HTMLInputElement).value,
        espece: (document.getElementById('espece-input') as HTMLInputElement).value,
        taille : +(document.getElementById('taille-input') as HTMLInputElement).value,
        poids: +(document.getElementById('poids-input') as HTMLInputElement).value,
        description: (document.getElementById('description-input') as HTMLInputElement).value,
        datenaissance: (document.getElementById('datenaissance-input') as HTMLInputElement).value,
        dateinscription: (document.getElementById('dateinscription-input') as HTMLInputElement).value,
        etatactuel: (document.getElementById('etat-input') as HTMLSelectElement).value,
        noproprietaire: +(document.getElementById('proprietaire-input') as HTMLSelectElement).value,
        nomproprietaire:''
      }

      this.communicationService.addAnimal(newAnimal).subscribe((res : number) => {
        if(res !== -1) {
          this.close.emit(true)
        }else {
          this.showError(true, "Une erreur est survenue lors de la sauvegarde de l'animal.")
        }
      });

    }
  }

  validateForm() : boolean {

    if((document.getElementById('nom-input') as HTMLInputElement).value === '') {
      this.showError(true, "Le nom est obligatoire.")
      return false
    }

    if((document.getElementById('type-input') as HTMLInputElement).value === '') {
      this.showError(true, "Le type est obligatoire.")
      return false;
    }

    
    if((document.getElementById('espece-input') as HTMLInputElement).value === '') {
      this.showError(true, "L'espece est obligatoire.")
      return false;
    }
    
    const regExp = /[a-zA-Z]/g;
    const tailleStr = (document.getElementById('taille-input') as HTMLInputElement).value;

    if(tailleStr === '') {
      this.showError(true, "La taille est obligatoire")
      return false;
    }

    if (regExp.test(tailleStr)){
      this.showError(true, "La taille n'est pas en forme decimal")
      return false;
    }

    const poidsString = (document.getElementById('poids-input') as HTMLInputElement).value;

    if(poidsString === '') {
      this.showError(true, "Le poids est obligatoire")
      return false;
    }

    if (regExp.test(poidsString)){
      this.showError(true, "Le poids n'est pas en forme decimal")
      return false;
    }

    if((document.getElementById('datenaissance-input') as HTMLInputElement).value === '') {
      this.showError(true, 'La date de naissance de est obligatoire.');
      return false;
    }

    if((document.getElementById('dateinscription-input') as HTMLInputElement).value === '') {
      this.showError(true, "La date d'inscription de est obligatoire.");
      return false;
    }

    this.showError(false, '')
    return true;
  }

  showError(show:boolean, message:string) : void {
    let errorDiv = document.getElementById('error-modal') as HTMLDivElement;
    errorDiv.style.top = '-60px'

    if(show) {
      errorDiv.textContent = message;
      errorDiv.style.top = '0px';
      errorDiv.style.transition = '0.3s ease';
    }

  }
}
