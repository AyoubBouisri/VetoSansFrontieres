import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommunicationService } from 'src/communication.service';
import {Traitement} from '../../../../../common/tables/traitement';
@Component({
  selector: 'app-liste-traitement',
  templateUrl: './liste-traitement.component.html',
  styleUrls: ['./liste-traitement.component.scss']
})
export class ListeTraitementComponent implements OnInit{

  @Input() animalId : string;
  @Output() close = new EventEmitter<boolean>();
  public traitements : Traitement[] = []

  constructor(private communicationService:CommunicationService) {

  }
  ngOnInit() : void {
    this.loadTraitements();
  }

  loadTraitements() : void {
    this.communicationService.getTraitements(this.animalId).subscribe((t : Traitement[])=> {
      this.traitements = t;
      console.log(this.traitements)
    })
  }

}
