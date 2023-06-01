import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producer } from '../models/Producer';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ProducerService {
  private API_URL:string = environment.backendURL;
  
  constructor(private api:HttpClient) {}

  getAll():Observable<Producer[]>{
    return this.api.get<Producer[]>(`${this.API_URL}/api/producer/all`);
  }
}
