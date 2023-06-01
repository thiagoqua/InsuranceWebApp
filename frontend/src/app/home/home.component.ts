import { Component, OnInit, WritableSignal, signal } from '@angular/core';
import { InsuredService } from '../services/insured.service';
import { Observable, of } from 'rxjs';
import { Insured } from '../models/Insured';
import * as insuredsMock from '../mock/insureds.json';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  insureds$:Observable<Insured[]> = of([]);
  allInsureds:Insured[] = [];
  usingMocks:WritableSignal<boolean> = signal<boolean>(false);

  constructor(private service:InsuredService){
    this.insureds$ = this.service.all();
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

  ngOnInit(): void {}

  makeSearch(event:string):void{
    this.insureds$ = this.service.search(event);
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
}
