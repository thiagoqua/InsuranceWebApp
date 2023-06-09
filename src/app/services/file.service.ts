import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Insured } from '../models/Insured';
import { Observable, of } from 'rxjs';
import { ExcelDataResultDTO } from '../models/ExcelDataResultDTO';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  private API_URL:string = environment.backendURL;

  constructor(private api:HttpClient) {}

  send(file:File):Observable<ExcelDataResultDTO>{
    const data:FormData = new FormData();
    const headers:HttpHeaders = new HttpHeaders().append(
      'Content-Disposition','multipart/form-data'
    );

    data.append('file',file,file.name);
    return this.api.post<ExcelDataResultDTO>(`${this.API_URL}/api/file/upload`,data,{headers});
  }

  proceed():Observable<Response>{
    return this.api.get<Response>(`${this.API_URL}/api/file/store`);
  }
  
  cancel():Observable<Response>{
    return this.api.delete<Response>(`${this.API_URL}/api/file/cancel`);
  }
}
