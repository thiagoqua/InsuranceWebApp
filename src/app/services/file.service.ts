import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/enviorment.prod';
import { Insured } from '../models/Insured';
import { Observable, of } from 'rxjs';
import { ExcelDataResultDTO } from '../models/ExcelDataResultDTO';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  private API_URL:string = `${environment.backendURL}/api/file`;

  constructor(private api:HttpClient) {}

  send(file:File):Observable<ExcelDataResultDTO>{
    const data:FormData = new FormData();
    const headers:HttpHeaders = new HttpHeaders().append(
      'Content-Disposition','multipart/form-data'
    );

    data.append('file',file,file.name);
    return this.api.post<ExcelDataResultDTO>(`${this.API_URL}/upload`,data,{headers});
  }

  proceed():Observable<Response>{
    return this.api.get<Response>(`${this.API_URL}/store`);
  }
  
  cancel():Observable<Response>{
    return this.api.delete<Response>(`${this.API_URL}/cancel`);
  }

  download(to:string):Observable<any>{
    return this.api.get(`${this.API_URL}/export?${to}=true`,{
      observe:'response',
      responseType:'blob'
    });
  }

  getBackupsDates():Observable<string[]>{
    return this.api.get<string[]>(`${this.API_URL}/backup/all`);
  }

  getBackupData(which:string):Observable<Insured[]>{
    const backupName:string = which.replace(' ','+');
    //ENDPOINT CAMBIADO OJO
    return this.api.get<Insured[]>(`${this.API_URL}/backup/data?name=${backupName}`);
  }
}
