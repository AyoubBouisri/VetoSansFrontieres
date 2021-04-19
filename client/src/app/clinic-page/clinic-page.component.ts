import { Component, OnInit } from '@angular/core';
import { ClinicStructure } from '../main-page/clinics/clinics.component';
import {ActivatedRoute} from "@angular/router";
import { animalStructure } from './animal-component/animal-component.component';
import { CommunicationService } from 'src/communication.service';
import {Clinique} from '../../../../common/tables/clinique'
import {animal} from '../../../../common/tables/animal'
import {Proprietaire} from '../../../../common/tables/proprietaire'

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
  public clinicId : string = '';
  public clinicProprietaires : Proprietaire[] = []
  public animals: animalStructure[] = [];

  public showTraitements:boolean = false;
  public traitementsAnimalId : string = ''
  public factureAnimalId: string = ''
  public showAdd : boolean = false;
  public animalToModify : string = ''

  constructor(private route: ActivatedRoute, private communicationService : CommunicationService) {
    this.route.params.subscribe( params => this.getClinicInformation(params.id) );
  }

  getClinicInformation( id: string ) : void {
    this.clinicId = id;
    this.communicationService.getClinique(id).subscribe((c : Clinique) => {
      this.clinicInformation = {
        name: c.nom,
        adress : `${c.rue}, ${c.codepostal}, ${c.ville} ${c.province}`,      
        number: c.noclinique,
        image:''
      }
    })

    this.communicationService.getCliniqueProprietaires(id).subscribe((p : Proprietaire[]) => {
      this.clinicProprietaires = p;
    })
    
   this.getAnimals(id);
  }

  getAnimals(id:string) : void{
    this.animals = [];
    this.communicationService.getAnimalsInClinique(id).subscribe((animals : animal[]) => {
      for(let a of animals) {
        this.animals.push({
          id: a.noanimal,
          name: a.nom,
          type: a.typeanimal,
          espece: a.espece,
          taille: a.taille + ' cm',
          poids: a.poids + ' kg',
          dateDeNaissance: a.datenaissance.substring(0,10),
          dateDInscription: a.dateinscription.substring(0,10),
          etat: a.etatactuel,
          proprietaire: a.nomproprietaire
        })
      }
    })
  }

  searchAnimals() : void {
    const input = document.getElementById('search-input') as HTMLInputElement;
    const query = input.value;

    if (query === ''){
      this.getAnimals(this.clinicId);
      return 
    }
    else {
      this.animals = [];
      this.communicationService.getAnimalsFromQuery(this.clinicId, query).subscribe((animals : animal[]) => {
        for(let a of animals) {
          this.animals.push({
            id: a.noanimal,
            name: a.nom,
            type: a.typeanimal,
            espece: a.espece,
            taille: a.taille + ' cm',
            poids: a.poids + ' kg',
            dateDeNaissance: a.datenaissance.substring(0,10),
            dateDInscription: a.dateinscription.substring(0,10),
            etat: a.etatactuel,
            proprietaire: a.nomproprietaire
          })
        }
      })
    }
  }

  modifyAnimal(animalId: string) {
    this.animalToModify = animalId;
    this.showAdd = true;
  }


  
}
