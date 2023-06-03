import { Component, WritableSignal, signal } from '@angular/core';
import { Phone } from '../models/Phone';
import { NativeDateAdapter } from "@angular/material/core";
import * as moment from 'moment';
import { Producer } from '../models/Producer';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Insured } from '../models/Insured';
import { Address } from '../models/Address';
import { Company } from '../models/Company';
import { CompanyService } from '../services/company.service';
import * as companiesMock from '../mock/companies.json';
import { InsuredService } from '../services/insured.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-administrate',
  templateUrl: './administrate.component.html',
  styleUrls: ['./administrate.component.css']
})

export class AdministrateComponent {
  public usingMocks:WritableSignal<boolean> = signal(false);
  public userLogged:Producer;
  public insuredForm:FormGroup;
  public operation:WritableSignal<number>;
  public countries:string[];
  public maxDate:Date;
  public phones:Phone[];
  public companies:Company[];

  constructor(private insuredService:InsuredService,
              private companyService:CompanyService,
              public dialog:MatDialog){
    this.userLogged = new Producer('tiki','quaglia',new Date(),1);
    const today:Date = new Date();
    this.operation = signal(0);
    this.countries  = ['Argentina','Brasil','Uruguay','Paraguay','Chile'];
    this.phones = [];
    this.maxDate = new Date(today.getFullYear() - 18,today.getMonth(),today.getDay());
    this.companies = [];
    this.companyService.getAll().subscribe({
      next: (data:Company[]) => this.companies = data,
      error: _ => {
          let mocks:Company[] = [];
          Object.assign(mocks,companiesMock)
          this.usingMocks.set(true);
          this.companies = mocks;
      }
    });

    
    this.insuredForm = new FormGroup({
      firstname: new FormControl('',Validators.required),
      lastname: new FormControl('',Validators.required),
      born: new FormControl('',Validators.required),
      company: new FormControl('',Validators.required),
      phones: new FormControl('',Validators.required),
      description: new FormControl(''),
      dni: new FormControl('',Validators.required),
      cuit: new FormControl(''),
      street: new FormControl('',Validators.required),
      number: new FormControl('',Validators.required),
      city: new FormControl('',Validators.required),
      province: new FormControl('',Validators.required),
      country: new FormControl('',Validators.required),
      floor: new FormControl(''),
      departament: new FormControl(''),
      license: new FormControl('',Validators.required),
      folder: new FormControl('',Validators.required),
      start: new FormControl('',Validators.required),
      end: new FormControl('',Validators.required),
    });
  }
  
  addPhone(number:HTMLInputElement,description:HTMLInputElement){
    this.phones.push(new Phone(number.value,description.value));
    number.value = '';
    description.value = '';
    this.insuredForm.get('phones')?.setErrors(null);
  }

  handleSubmit(){
    const newInsured:Insured = new Insured(
      this.insuredForm.controls['firstname'].value,
      this.insuredForm.controls['lastname'].value,
      this.insuredForm.controls['company'].value,
      this.insuredForm.controls['license'].value,
      this.insuredForm.controls['folder'].value,
      this.formatLife(),
      this.insuredForm.controls['born'].value as Date,
      this.formatAddress(),
      this.insuredForm.controls['dni'].value,
      this.userLogged.id!,
      this.phones,
      undefined,
      undefined,
      this.insuredForm.controls['description'].value,
      this.insuredForm.controls['cuit'].value
    );
    this.insuredService.create(newInsured).subscribe({
      next: res => this.openDialog(true),
      error: error => this.openDialog(false)
    });
  }

  formatLife():string{
    let start:string = new Date(this.insuredForm.controls['start'].value)
      .toLocaleDateString('en-AU'); // format dd/mm/yyyy
    let end:string = new Date(this.insuredForm.controls['end'].value)
      .toLocaleDateString('en-AU');
    start = start.split('/',2).join('/');
    end = end.split('/',2).join('/');
    return `${start}-${end}`;
  }

  formatAddress():Address{
    const floor:number|undefined = this.insuredForm.controls['floor'].value != '' 
      ? this.insuredForm.controls['floor'].value
      : undefined;
    const depto:number|undefined = this.insuredForm.controls['departament'].value != ''
      ? this.insuredForm.controls['departament'].value
      : undefined;
    return new Address(
      this.insuredForm.controls['street'].value,
      this.insuredForm.controls['number'].value,
      this.insuredForm.controls['city'].value,
      this.insuredForm.controls['province'].value,
      this.insuredForm.controls['country'].value,
      floor,
      depto
    );
  }

  openDialog(status:boolean): void {
    this.dialog.open(DialogComponent, {
      width: '250px',
      data: {display:1,status:status}
    });
  }
}

export class AppDateAdapter extends NativeDateAdapter {
  override format(date: Date, displayFormat: Object): string {
   return moment(date).format('DD MMM');
 }
}