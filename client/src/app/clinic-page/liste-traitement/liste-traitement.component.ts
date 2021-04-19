import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommunicationService } from 'src/communication.service';

@Component({
  selector: 'app-liste-traitement',
  templateUrl: './liste-traitement.component.html',
  styleUrls: ['./liste-traitement.component.scss']
})
export class ListeTraitementComponent {

  @Input() animalId : string;
  @Output() close = new EventEmitter<boolean>();

  constructor(private communicationService:CommunicationService) {

   }

  

}
