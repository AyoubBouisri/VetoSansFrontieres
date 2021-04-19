import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommunicationService } from 'src/communication.service';
import {Facture} from '../../../../../common/tables/facture'
import {Traitement} from '../../../../../common/tables/traitement'
export interface FactureElement{
  description: string;
  cout: number;
}
@Component({
  selector: 'app-facture',
  templateUrl: './facture.component.html',
  styleUrls: ['./facture.component.scss']
})
export class FactureComponent implements OnInit {
  @Input() animalId : string;
  @Output() close = new EventEmitter<boolean>();

  public numeroFacture : string  = '000'
  public etat : string = 'NaN'
  public date: string = '0000-00-00'
  public modePaiement: string = 'Nan'
  public montant : string = ''
  
  public factureElements:FactureElement[] = []
  constructor(private communicationService: CommunicationService) { 
  }

  ngOnInit() : void {
    let montant = 0;
    this.communicationService.getExamens(this.animalId).subscribe((t : Traitement[]) => {
      for (let traitement of t) {
        const cout = +traitement.cout.substring(1)
        montant = montant + cout;
        this.montant = montant + ' $'
        this.factureElements.push({
          description: traitement.description + ' (Examen)',
          cout: cout
        })

      }
    })

    this.communicationService.getTraitements(this.animalId).subscribe((t : Traitement[]) => {
      for (let traitement of t) {
        const cout = +traitement.cout.substring(1)
        montant = montant + cout;
        this.montant = montant + ' $'
        this.factureElements.push({
          description: traitement.description,
          cout: cout
        })
      }
    })

   
    this.getFactureInfo(this.animalId, montant);
  }

  getFactureInfo(animalId : string, cout: number) : void {
    this.communicationService.getFacture(animalId).subscribe((facture : Facture) => {
        if(facture === null ){
          this.montant = "La facture n'a pas encore été générée";
        }else {
          this.numeroFacture = facture.nofacture;
          this.etat = facture.etat;
          this.date = facture.datefacture.substring(0,10);
          this.modePaiement = facture.modepaiement;
         
        }
    })
  }

}
