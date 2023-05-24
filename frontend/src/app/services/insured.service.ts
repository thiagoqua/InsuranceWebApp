import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Insured } from '../models/Insured';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class InsuredService {
  private API_URL:string = environment.backendURL;

  constructor(private api:HttpClient) {}

  all():Observable<Insured[]>{
    return this.api.get<Insured[]>(`${this.API_URL}/insured/all`);
  }

  search(query:string):Observable<Insured[]>{
    return this.api.get<Insured[]>(`${this.API_URL}/insured/march?query=${query}`);
  }
}
