import { Component, WritableSignal, signal } from '@angular/core';
import { FileService } from '../services/file.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { Insured } from '../models/Insured';
import { Observable, of } from 'rxjs';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-backup',
  templateUrl: './backup.component.html',
  styleUrls: ['./backup.component.css']
})
export class BackupComponent {
  public error:WritableSignal<string|undefined> = signal(undefined);
  public backupSelected:WritableSignal<string|undefined> = signal(undefined);
  //false when it was sent, true when it comes
  public backupGetted:WritableSignal<boolean|undefined> = signal(undefined);
  public backupsAvailables:string[];
  public backupData:Observable<Insured[]>;

  constructor(private service:FileService,
              private dialog:MatDialog,
              private location:Location,
              private router:Router){
    this.backupsAvailables = [];
    this.backupData = of([]);
    this.service.getBackupsDates().subscribe({
      next:(data:string[]) => this.backupsAvailables = data,
      error: (err:HttpErrorResponse) => this.error.set(err.message)
    })
  }

  seeBackup(which:string):void{
    this.backupGetted.set(false);
    this.backupSelected.set(which);
    this.backupData = this.service.getBackupData(which);
    this.service.getBackupData(which).subscribe({
      next: _ => {
        setTimeout(() => {
          if(this.location.path() == '/importar-exportar')
            this.router.navigate(['']);
        },60000)
        this.backupGetted.set(true);
      },
      error: (err:HttpErrorResponse) => this.error.set(err.message)
    })
  }

  makeChanges():void{
    const ref:MatDialogRef<DialogComponent> = this.openDialog({display:3,aux:'restauración'});
    ref.afterClosed().subscribe((proceed:boolean) => {
      if(proceed){
        this.service.proceed().subscribe({
          next:_ => {
            this.backupGetted.set(true);
            this.openDialog({display:3,status:true});
          },
          error:(err:HttpErrorResponse) => {
            this.error.set(err.message);
          }
        })
      }
    });
  }

  cancel():void{
    this.service.cancel().subscribe();
  }

  openDialog(data:{}): MatDialogRef<DialogComponent> {
    return this.dialog.open(DialogComponent, {
      width: '500px',
      height:'fit-content',
      data: data
    });
  }
}
