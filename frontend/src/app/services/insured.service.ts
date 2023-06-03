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
    return this.api.get<Insured[]>(`${this.API_URL}/api/insured/all`);
  }

  search(query:string):Observable<Insured[]>{
    const param:string = query.replace(' ','+');
    return this.api.get<Insured[]>(`${this.API_URL}/api/insured/search?query=${param}`);
  }

  create(insured:Insured):Observable<Response>{
    return this.api.post<Response>(`${this.API_URL}/api/insured/new`,insured);
  }
}
