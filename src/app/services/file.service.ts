import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Insured } from '../models/Insured';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  private API_URL:string = environment.backendURL;

  constructor(private api:HttpClient) {}

  send(file:File):Observable<Insured[]>{
    const data:FormData = new FormData();
    data.append('file',file,file.name);
    const headers:HttpHeaders = new HttpHeaders().append(
      'Content-Disposition','multipart/form-data'
    );
    return this.api.post<Insured[]>(`${this.API_URL}/api/file/upload`,data,{
      reportProgress:true, 
      headers
    });
  }

}
