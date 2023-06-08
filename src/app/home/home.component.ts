import { Component, OnInit, WritableSignal, signal } from '@angular/core';
import { InsuredService } from '../services/insured.service';
import { Observable, of } from 'rxjs';
import { Insured } from '../models/Insured';
import * as insuredsMock from '../mock/insureds.json';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent{
  insureds$:Observable<Insured[]> = of([]);
  allInsureds:Insured[] = [];
  usingMocks:WritableSignal<boolean> = signal<boolean>(false);
  insuredInput?:string;

  constructor(private insuredService:InsuredService,
              private authService:AuthenticationService){
    this.insureds$ = this.insuredService.all();
    this.insureds$.subscribe({
      next: (data:Insured[]) => this.allInsureds = data,
      error: _ => {
        let mocks:Insured[] = [];
        Object.assign(mocks,insuredsMock)
        this.insureds$ = of(mocks);
        this.usingMocks.set(true);
      }
    });
  }

  makeSearch(event:string):void{
    this.insureds$ = this.insuredService.search(event);
    this.insureds$.subscribe()
  }

  clearInput(event:HTMLInputElement):void{
    event.value = '';
    this.resetInsureds({data:null});
  }

  resetInsureds(event:any){
    if(!event.data || event.data === '')
      this.insureds$ = of(this.allInsureds);
  }

  endSession():void{
    this.authService.userLogged = null;
    localStorage.removeItem('logged');
  }
}
