import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { LoginRequest } from '../models/LoginRequest';
import { Observable } from 'rxjs';
import { Admin } from '../models/Admin';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private API_URL:string = `${environment.backendURL}/api/auth`;
  private logged:Admin|null;

  constructor(private api:HttpClient) {
    this.logged = null;
  }

  public set userLogged(v:Admin|null) {
    this.logged = v;
  }

  
  public get userLogged():Admin|null {
    return this.logged;
  }
  
  authenticate(request:LoginRequest):Observable<Admin>{
    return this.api.post<Admin>(this.API_URL,request);
  }
}
