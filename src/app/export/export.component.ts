import { Component, WritableSignal, signal } from '@angular/core';
import { FileService } from '../services/file.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-export',
  templateUrl: './export.component.html',
  styleUrls: ['./export.component.css']
})
export class ExportComponent {
  public error:WritableSignal<string|undefined> = signal(undefined);
  public fileSended:WritableSignal<boolean> = signal(false);
  public fileOk:WritableSignal<boolean> = signal(false);
  public exportTo:string;

  constructor(private service:FileService,private router:Router){
    this.exportTo = "excel";
  }

  export():void{
    this.fileSended.set(true);
    const format:string = this.exportTo === "PDF" ? this.exportTo : "XLSX";
    this.service.download(format).subscribe({
      next:(data:any) => {
        this.fileOk.set(true);
        const fileName:string = 
          data.headers.get('content-disposition')?.split(';')[1].split('=')[1];
        const file:Blob = data.body as Blob;
        const url:string = window.URL.createObjectURL(file);
        const a = document.createElement('a');
        
        a.download = fileName;
        a.href = url;
        a.click();

        setTimeout(() => {
          this.router.navigate(['/']);
        }, 5000);
      },
      error: (err:HttpErrorResponse) => {
        let message:string;
        switch(err.status){
          case 0:
            message = "No se pudo contactar con el servidor. Comuníquese con los desarrolladores"
          break;
          case 500:
            message = "Hubo un problema en el servidor. Comuníquese con los desarrolladores"
          break;
          default:
            message = "Error inalcanzado"
        }
        this.error.set(message);
        this.fileSended.set(false);
      }
    });
  }
}

