import { Component, WritableSignal, signal } from '@angular/core';
import { FileService } from '../services/file.service';
import { HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { Insured } from '../models/Insured';
import { Observable, of } from 'rxjs';
import { DialogComponent } from '../dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ExcelDataResultDTO } from '../models/ExcelDataResultDTO';
import { Router } from '@angular/router';

@Component({
  selector: 'app-import',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.css']
})
export class ImportComponent {
  public export:WritableSignal<boolean|undefined> = signal(undefined);
  public error:WritableSignal<string> = signal('');
  public fileName:WritableSignal<string> = signal('Elegir archivo Excel');
  public fileOk:WritableSignal<boolean> = signal(false);
  public fileSended:WritableSignal<boolean> = signal(false);
  public uploadResponse:WritableSignal<boolean|undefined> = signal(undefined);
  public insureds$:Observable<Insured[]>;
  private file?:File;

  constructor(private fileService:FileService,
              private dialog:MatDialog,
              private router:Router){
    this.insureds$ = of([]);
  }

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
    this.error.set('');
    this.fileService.send(this.file!).subscribe({
      next:(insureds:any) => {
        this.uploadResponse.set(true);
        this.insureds$ = of(insureds.interpreted);
        setTimeout(() => {
          this.router.navigate(['']);
        },60000)
      },
      error:(err:HttpErrorResponse) => {
        if(err.status == 406)
          this.error.set("el contenido del excel no es válido");
        else if(err.status == 500)
          this.error.set('error en el servidor, por favor, intente nuevamente más tarde o comuníquese con el desarrollador');
        else 
          this.error.set(err.message);
        this.uploadResponse.set(false);
        this.fileSended.set(false);
      }
    });
  }
  
  clearSelection(input:any){
    input.value = null;
    this.fileName.set('Elegir archivo Excel');
    this.fileOk.set(false);
    this.fileSended.set(false);
    this.uploadResponse.set(false);
  }

  openDialog(): void {
    const ref = this.dialog.open(DialogComponent, {
      width: '500px',
      height:'fit-content',
      data: {display:3}
    });

    ref.afterClosed().subscribe((proceed:boolean) => {
      if(proceed)
        this.fileService.proceed().subscribe({
          next:(res:Response) => {
            alert('cambios satisfactorios');
          },
          error:(err:HttpErrorResponse) => {
            this.error.set(err.message);
          }
        })
    });
  }

  onCancel():void{
    this.fileService.cancel().subscribe({
      next:_ => {
        
      },
      error:(err:HttpErrorResponse) => {
        this.error.set(err.message);
      }
    })
  }
}
