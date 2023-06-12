import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent {
  //positive or negative
  public status?:boolean;
  //the info to display
  public display:number;
  //in case deleting an insured, the name of the insured
  public delete?:string;

  constructor(public dialogRef: MatDialogRef<DialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data:any){
    this.status = data.status;
    this.display = data.display;
    this.delete = data.delete;
  }


}
