import { Component, OnInit, WritableSignal, signal } from '@angular/core';
import { InsuredService } from '../services/insured.service';
import { Observable, of } from 'rxjs';
import { Insured } from '../models/Insured';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  insureds$:Observable<Insured[]> = of([]);
  allInsureds$:Observable<Insured[]> = of([]);
  search:WritableSignal<string> = signal<string>('');

  constructor(private service:InsuredService){
    this.allInsureds$ = this.service.all();
  }

  ngOnInit(): void {}

  makeSearch(event:string):void{
    this.insureds$ = this.service.search(event);
    this.insureds$.subscribe()
  }
}
