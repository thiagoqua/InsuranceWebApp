import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producer } from '../models/Producer';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/enviorment.prod';

@Injectable({
  providedIn: 'root'
})
export class ProducerService {
  private API_URL:string = `${environment.backendURL}/api/producer`;
  
  constructor(private api:HttpClient) {}

  getAll():Observable<Producer[]>{
    return this.api.get<Producer[]>(`${this.API_URL}/all`);
  }
}
