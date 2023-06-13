import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Company } from '../models/Company';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  private API_URL:string = `${environment.backendURL}/api/company`;

  constructor(private api:HttpClient) {}

  getAll():Observable<Company[]>{
    return this.api.get<Company[]>(`${this.API_URL}/all`);
  }
}
