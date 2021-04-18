import { Component, OnInit } from '@angular/core';
import { ClinicStructure } from '../main-page/clinics/clinics.component';
import {ActivatedRoute} from "@angular/router";
import { animalStructure } from './animal-component/animal-component.component';
import { CommunicationService } from 'src/communication.service';
import {Clinique} from '../../../../common/tables/clinique'
import {animal} from '../../../../common/tables/animal'
@Component({
  selector: 'app-clinic-page',
  templateUrl: './clinic-page.component.html',
  styleUrls: ['./clinic-page.component.scss']
})
export class ClinicPageComponent {

  // give the initial clinic information empty values while the real clinic info is loading
  public clinicInformation: ClinicStructure = {
    name: '',
    adress: '',
    number: '',
    image: ''
  }

  public animals: animalStructure[] = [];

  constructor(private route: ActivatedRoute, private communicationService : CommunicationService) {
    this.route.params.subscribe( params => this.getClinicInformation(params.id) );
  }

  getClinicInformation( id: string ) : void {
    // temporary for now TODO change to get from DB
    const clinicInfo = this.communicationService.getClinique(id).subscribe((c : Clinique) => {
      this.clinicInformation = {
        name: c.nom,
        adress : `${c.rue}, ${c.codepostal}, ${c.ville} ${c.province}`,      
        number: c.noclinique,
        image:''
      }

    })
    this.animals = this.getAnimals(id);
  }

  getAnimals(id:string) : animalStructure[] {
    this.animals = [];
    this.communicationService.getAnimalsInClinique(id).subscribe((animals : animal[]) => {
      this.
    })
    return [
      {
        name: 'Bilou',
        type: 'Chien',
        espece: 'Berger Allemand',
        taille: '1.75 cm',
        poids: '150 lbs',
        dateDeNaissance: '12-Fevrier-2020',
        dateDInscription: '2 Mars 2021',
        etat: 'Vivant',
        proprietaire: 'Who Knows !'
      },
      {
        name: 'Pupi',
        type: 'Chat',
        espece: 'Chat Allemand',
        taille: '3 cm',
        poids: '400 lbs',
        dateDeNaissance: '12-Fevrier-2020',
        dateDInscription: '2 Mars 2021',
        etat: 'Vivant',
        proprietaire: 'Maraine Ginette'
      },
      {
        name: 'Bilou',
        type: 'Chien',
        espece: 'Berger Allemand',
        taille: '1.75 cm',
        poids: '150 lbs',
        dateDeNaissance: '12-Fevrier-2020',
        dateDInscription: '2 Mars 2021',
        etat: 'Vivant',
        proprietaire: 'Who Knows !'
      },
      {
        name: 'Pupi',
        type: 'Chat',
        espece: 'Chat Allemand',
        taille: '3 cm',
        poids: '400 lbs',
        dateDeNaissance: '12-Fevrier-2020',
        dateDInscription: '2 Mars 2021',
        etat: 'Vivant',
        proprietaire: 'Maraine Ginette'
      },
      {
        name: 'Bilou',
        type: 'Chien',
        espece: 'Berger Allemand',
        taille: '1.75 cm',
        poids: '150 lbs',
        dateDeNaissance: '12-Fevrier-2020',
        dateDInscription: '2 Mars 2021',
        etat: 'Vivant',
        proprietaire: 'Who Knows !'
      },
      {
        name: 'Pupi',
        type: 'Chat',
        espece: 'Chat Allemand',
        taille: '3 cm',
        poids: '400 lbs',
        dateDeNaissance: '12-Fevrier-2020',
        dateDInscription: '2 Mars 2021',
        etat: 'Vivant',
        proprietaire: 'Maraine Ginette'
      }
    ]
       
  }
}
