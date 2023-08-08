import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-loading-card',
  templateUrl: './loading-card.component.html',
  styleUrls: ['./loading-card.component.css']
})
export class LoadingCardComponent {
  @Input() incomingStream: any;
}
