import { Component, Input, signal, effect } from '@angular/core';
import { Insured } from '../models/Insured';
import { Observable, of } from 'rxjs';
import { Address } from '../models/Address';
import { Producer } from '../models/Producer';
import { Phone } from '../models/Phone';

@Component({
  selector: 'app-insureds',
  templateUrl: './insureds.component.html',
  styleUrls: ['./insureds.component.css']
})
export class InsuredsComponent {
  @Input() insureds:Observable<Insured[]> = of([]);

  constructor(){}    

  evaluateColor(prod:Producer):string{
    const colors:any = {
      'zurdo':'orange',
      'tiki':'blue',
      'ricky':'green',
      'leo':'red'
    }
    return `${colors[prod.firstname] || 'white'}`;
  }

  formatDate(date:Date):string{
    return new Date(date).toLocaleDateString();
  }

  formatAddress(addr:Address):string{
    return `${addr.street} ${addr.number}, ${addr.city}`;
  }

  formatProducer(prod:Producer):string{
    return prod.firstname;
  }

  formatPhones(phones:Phone[]){
    return phones.map((phone:Phone) => `${phone.number} `)
  }

  formatPhonesDescription(phones:Phone[]){
    return phones.map((phone:Phone) => `${phone.description} `)
  }
}
