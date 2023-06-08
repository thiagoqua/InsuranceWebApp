import { Component, WritableSignal, signal } from '@angular/core';
import { Phone } from '../models/Phone';
import { NativeDateAdapter } from "@angular/material/core";
import * as moment from 'moment';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Insured } from '../models/Insured';
import { Address } from '../models/Address';
import { Company } from '../models/Company';
import { CompanyService } from '../services/company.service';
import * as companiesMock from '../mock/companies.json';
import { InsuredService } from '../services/insured.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { ActivatedRoute } from '@angular/router';
import { Admin } from '../models/Admin';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-administrate',
  templateUrl: './administrate.component.html',
  styleUrls: ['./administrate.component.css']
})

export class AdministrateComponent {
  public usingMocks:WritableSignal<boolean> = signal(false);
  public editingPhone:WritableSignal<number|null> = signal(null);
  public loading:WritableSignal<boolean> = signal(true);
  public userLogged:Admin;
  public insuredForm:FormGroup;
  public countries:string[];
  public statuses:string[];
  public maxDate:Date;
  public phones:Phone[];
  public companies:Company[];
  //exists if the component is used to modify an user
  public insuredId?:number;

  constructor(private insuredService:InsuredService,
              private companyService:CompanyService,
              private authService:AuthenticationService,
              public dialog:MatDialog,
              private route:ActivatedRoute){
    this.userLogged = authService.userLogged!;
    const today:Date = new Date();
    this.countries  = ['Argentina','Brasil','Uruguay','Paraguay','Chile'];
    this.statuses = ['Activa','En juicio','Anulada'];
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
      policyStatus: new FormControl('',Validators.required),
      insurancePolicy: new FormControl(''),
    });

    if(this.route.snapshot.paramMap.get('insuredId') != null){
      this.insuredId = parseInt(this.route.snapshot.paramMap.get('insuredId')!);
      this.setInsuredValues(this.insuredId);
    }
  }
  
  addPhone(number:HTMLInputElement,description:HTMLInputElement){
    if(this.editingPhone() != null){
      const index:number = this.editingPhone()!;
      this.phones[index].number = number.value;
      this.phones[index].description = description.value;
      this.editingPhone.set(null);
    }
    else
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
      // this.userLogged.id,
      this.userLogged!.id,
      this.phones,
      this.insuredForm.controls['policyStatus'].value,
      undefined,
      undefined,
      this.insuredForm.controls['description'].value,
      this.insuredForm.controls['cuit'].value,
      this.insuredForm.controls['insurancePolicy'].value,
    );
    if(this.insuredId){
      newInsured.id = this.insuredId;
      this.insuredService.update(newInsured).subscribe({
        next: res => this.openDialog(true),
        error: error => this.openDialog(false)
      });
    }
    else {
      this.insuredService.create(newInsured).subscribe({
        next: res => this.openDialog(true),
        error: error => this.openDialog(false)
      });
    }
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

  editPhone(phone:Phone,numberInput:HTMLInputElement,descInput:HTMLInputElement):void{
    const index:number = this.phones.indexOf(phone);
    this.editingPhone.set(index);
    numberInput.value = phone.number;
    if(phone.description)
      descInput.value = phone.description;
  }

  deletePhone(numberInput:HTMLInputElement,descInput:HTMLInputElement):void{
    const index:number = this.editingPhone()!;
    this.phones.splice(index,1);
    this.editingPhone.set(null);
    numberInput.value = '';
    descInput.value = '';
  }

  setInsuredValues(insuredId:number):void{
    this.insuredService.getById(insuredId).subscribe((data:Insured) => {
      const [start,end] = this.handleLife(data.life);
      this.insuredForm.get('firstname')?.setValue(data.firstname);
      this.insuredForm.get('lastname')?.setValue(data.lastname);
      this.insuredForm.get('company')?.setValue(data.companyNavigation!.id);
      this.insuredForm.get('license')?.setValue(data.license);
      this.insuredForm.get('folder')?.setValue(data.folder);
      this.insuredForm.get('start')?.setValue(start);
      this.insuredForm.get('end')?.setValue(end);
      this.insuredForm.get('born')?.setValue(data.born);
      this.insuredForm.get('street')?.setValue(data.addressNavigation.street);
      this.insuredForm.get('number')?.setValue(data.addressNavigation.number);
      this.insuredForm.get('city')?.setValue(data.addressNavigation.city);
      this.insuredForm.get('province')?.setValue(data.addressNavigation.province);
      this.insuredForm.get('country')?.setValue(data.addressNavigation.country);
      this.insuredForm.get('floor')?.setValue(data.addressNavigation.floor);
      this.insuredForm.get('departament')?.setValue(data.addressNavigation.departament);
      this.insuredForm.get('dni')?.setValue(data.dni);
      this.insuredForm.get('phones')?.setValue(data.phones);
      this.phones = data.phones;
      this.insuredForm.get('description')?.setValue(data.description);
      this.insuredForm.get('cuit')?.setValue(data.cuit);
      this.insuredForm.get('insurancePolicy')?.setValue(data.insurancePolicy);
      this.insuredForm.get('policyStatus')?.setValue(data.status);
      this.loading.set(false);
      console.log(this.insuredForm.get('policyStatus')?.setValue(data.status));
    });
  }

  handleLife(life:string):Date[]{
    const ret:Date[] = [];
    life.split('-').forEach((dayMonth:string) => {
      let helper:Date = new Date();
      const dayMonthSplitted:string[] = dayMonth.split('/');
      const day:number = parseInt(dayMonthSplitted[0]);
      const month:number = parseInt(dayMonthSplitted[1]) - 1;
      helper.setDate(day);
      helper.setMonth(month);
      ret.push(helper);
    })
    
    return ret;
  }

  openDialog(status:boolean): void {
    this.dialog.open(DialogComponent, {
      width: '250px',
      data: {
        display:this.insuredId ? 2 : 1,
        status:status
      }
    });
  }
}

export class AppDateAdapter extends NativeDateAdapter {
  override format(date: Date, displayFormat: Object): string {
   return moment(date).format('DD MMM');
 }
}