import { Component, Input, signal, effect, WritableSignal } from '@angular/core';
import { Insured } from '../models/Insured';
import { Observable, of } from 'rxjs';
import { Address } from '../models/Address';
import { Producer } from '../models/Producer';
import { Phone } from '../models/Phone';
import { DialogComponent } from '../dialog/dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { InsuredService } from '../services/insured.service';

@Component({
  selector: 'app-insureds',
  templateUrl: './insureds.component.html',
  styleUrls: ['./insureds.component.css']
})
export class InsuredsComponent {
  public deletedOk:WritableSignal<boolean|undefined> = signal(undefined);
  @Input() insureds:Observable<Insured[]> = of([]);

  constructor(private service:InsuredService,private dialog:MatDialog){}    

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

  openDialog(firstname:string,lastname:string,id:number): void {
    const ref = this.dialog.open(DialogComponent, {
      height:'20%',
      data: {
        display:-1,
        status:true,
        delete:firstname + " " + lastname
      }
    });

    ref.afterClosed().subscribe(del => {
      if(del){
        this.service.delete(id).subscribe({
          next: _ => {
            this.deletedOk.set(true);
            this.insureds = this.service.all();
            this.insureds.subscribe();
          },
          error: _ => this.deletedOk.set(false)
        })
        console.log("executing")
      }
    })
  }
}
