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
  @Input() insureds:Observable<Insured[]> = of([]);
  @Input() isPreview?:boolean = false;
  public deletedOk:WritableSignal<boolean|undefined> = signal(undefined);
  private producersColors:any;
  private statusColors:any;
  private previousRow?:HTMLTableRowElement;
  private previousRowBackground?:string;

  constructor(private service:InsuredService,private dialog:MatDialog){
    this.producersColors = {
      'tiki':'#D17CFA',
      'pepe':'#A4FFE2',
      'checo':'#FFF188',
    }
    this.statusColors = {
      'activa':'greenyellow',
      'en juicio':'aqua',
      'anulada':'red'
    }
  }    

  evaluateColor(company?:number,prod?:Producer,status?:string):string{
    if(prod){
      const def:string = 'white';
      if(company! == 1)
        return `${this.producersColors[prod.firstname] || def}`
      else if(company! == 2)
        return prod.id == 5 
          ? `${this.producersColors[prod.firstname] || def}`
          : def;
    }
    else if(status)
      return `${this.statusColors[status.toLowerCase()] || 'white'}`;
    return '';
  }

  onSelected(actualRow:HTMLTableRowElement):void{
    if(this.previousRow){
      this.previousRow.style.backgroundColor = this.previousRowBackground!;
      this.previousRow.style.color = 'black';
    }
    
    this.previousRowBackground = actualRow.style.backgroundColor;
    actualRow.style.backgroundColor = '#6E7BF0';
    actualRow.style.color = 'white';
    this.previousRow = actualRow;
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
    return phones.map((phone:Phone) => 
      phone.description != null ? `${phone.description} ` : ''
    )
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
