import { Component, WritableSignal, signal } from '@angular/core';
import { FileService } from '../services/file.service';
import { HttpEventType } from '@angular/common/http';
import { Insured } from '../models/Insured';

@Component({
  selector: 'app-import',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.css']
})
export class ImportComponent {
  public wantsImport:WritableSignal<boolean|undefined> = signal(undefined);
  public error:WritableSignal<string> = signal('');
  public fileName:WritableSignal<string> = signal('Elegir archivo Excel');
  public fileOk:WritableSignal<boolean> = signal(false);
  public fileSended:WritableSignal<boolean> = signal(false);
  private file?:File;

  constructor(private fileService:FileService){}

  handleFileSelected(event:any):void{
    const file:File = event.target.files[0];
    if(file.type === 'application/vnd.ms-excel' ||
      file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'){
        this.fileName.set(file.name);
        this.fileOk.set(true);
        this.file = file;
        this.error.set('');
    } else {
      this.error.set("Los únicos tipos de archvios soportados son .xls y .xlsx");
      this.fileName.set('Elegir archivo Excel');
      this.fileOk.set(false);
    } 
  }

  send():void{
    this.fileSended.set(true);
    this.fileService.send(this.file!).subscribe({
      next:(insureds:Insured[]) => {
        console.log(insureds);
        this.fileSended.set(false);
      },
      error:(err:any) => {
        this.error.set(err.message);
        this.fileSended.set(false);
      }
    });
  }
  
  clearSelection(input:any){
    input.value = null;
    this.fileName.set('Elegir archivo Excel');
    this.fileOk.set(false);
    this.fileSended.set(false);
  }
}
