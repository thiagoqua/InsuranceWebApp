import { Component, WritableSignal, signal } from '@angular/core';
import { Phone } from '../models/Phone';
import {DateAdapter, NativeDateAdapter, MAT_DATE_FORMATS} from "@angular/material/core";
import * as moment from 'moment';
import { ProducerService } from '../services/producer.service';
import { Producer } from '../models/Producer';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Insured } from '../models/Insured';
import { Address } from '../models/Address';

@Component({
  selector: 'app-administrate',
  templateUrl: './administrate.component.html',
  styleUrls: ['./administrate.component.css']
})

export class AdministrateComponent {
  public userLogged:Producer;
  public insuredForm:FormGroup;
  public operation:WritableSignal<number>;
  public countries:string[];
  public maxDate:Date;
  public phones:Phone[];
  public producers:Producer[];
  public company:string;

  constructor(private producerService:ProducerService){
    this.userLogged = new Producer('tiki','quaglia',new Date(),7);
    const today:Date = new Date();
    this.operation = signal(0);
    this.countries  = ['Argentina','Brasil','Uruguay','Paraguay','Chile'];
    this.phones = [];
    this.maxDate = new Date(today.getFullYear() - 18,today.getMonth(),today.getDay());
    this.producers = [];
    this.producerService.getAll().subscribe((data:Producer[]) => this.producers = data);
    this.company = '';
    
    this.insuredForm = new FormGroup({
      firstname: new FormControl('',Validators.required),
      lastname: new FormControl('',Validators.required),
      born: new FormControl('',Validators.required),
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
  
  addInsured():void{ 
    this.operation.set(1);
  }

  removeInsured():void{
    this.operation.set(2);
  }

  addPhone(number:HTMLInputElement,description:HTMLInputElement){
    this.phones.push(new Phone(number.value,description.value));
    number.value = '';
    description.value = '';
  }

  handleSubmit(){
    const newInsured:Insured = new Insured(
      this.insuredForm.controls['firstname'].value,
      this.insuredForm.controls['lastname'].value,
      this.company,
      this.insuredForm.controls['license'].value,
      this.insuredForm.controls['folder'].value,
      this.formatLife(),
      this.insuredForm.controls['born'].value,
      this.formatAddress(),
      this.insuredForm.controls['dni'].value,
      this.userLogged.id!,
      this.phones,
      undefined,
      undefined,
      this.insuredForm.controls['description'].value,
      this.insuredForm.controls['cuit'].value
    )
  }

  formatLife():string{
    const start:Date = this.insuredForm.controls['start'].value;
    const end:Date = this.insuredForm.controls['end'].value;
    return `${start.toLocaleDateString('en-AU')}-${end.toLocaleDateString('en-AU')}`;
  }

  formatAddress():Address{
    return new Address(
      this.insuredForm.controls['street'].value,
      this.insuredForm.controls['number'].value,
      this.insuredForm.controls['city'].value,
      this.insuredForm.controls['province'].value,
      this.insuredForm.controls['country'].value,
      this.insuredForm.controls['floor'].value,
      this.insuredForm.controls['departament'].value
    );
  }
}

export class AppDateAdapter extends NativeDateAdapter {
  override format(date: Date, displayFormat: Object): string {
   return moment(date).format('DD MMM');
 }
}