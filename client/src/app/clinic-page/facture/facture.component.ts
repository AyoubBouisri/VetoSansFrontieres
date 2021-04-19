import { Component, Input, Output, EventEmitter, SimpleChanges, SimpleChange } from '@angular/core';
import { CommunicationService } from 'src/communication.service';
import {Facture} from '../../../../../common/tables/facture'
@Component({
  selector: 'app-facture',
  templateUrl: './facture.component.html',
  styleUrls: ['./facture.component.scss']
})
export class FactureComponent  {
  @Input() animalId : string;
  @Output() close = new EventEmitter<boolean>();

  public numeroFacture : string  = ''
  public etat : string = ''
  public date: string = ''
  public modePaiement: string = ''
  public montant : string = ''

  constructor(private communicationService: CommunicationService) { 
  }


  ngOnChanges(changes: SimpleChanges) {
    this.getFactureInfo(changes.animalId.currentValue);
  }

  getFactureInfo(animalId : string) : void {
    this.communicationService.getFacture(animalId).subscribe((facture : Facture) => {
        this.numeroFacture = facture.nofacture;
        this.etat = facture.etat;
        this.date = facture.datefacture.substring(0,10);
        this.modePaiement = facture.modepaiement;
        this.montant = '' + facture.montant;


    })
  }

}
