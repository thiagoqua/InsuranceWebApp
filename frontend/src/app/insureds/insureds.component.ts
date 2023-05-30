import { Component, Input, signal, effect } from '@angular/core';
import { Insured } from '../models/Insured';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-insureds',
  templateUrl: './insureds.component.html',
  styleUrls: ['./insureds.component.css']
})
export class InsuredsComponent {
  @Input() insureds:Observable<Insured[]> = of([]);

  constructor(){}    
}
