import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormField } from '@angular/material/form-field';
  
@Component({
  selector: 'app-message',
  templateUrl: 'message.component.html',
})
export class MessageDialogComponent {
  
  constructor(
    public dialogRef: MatDialogRef<MessageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }
  
  onCancel(): void {
    this.dialogRef.close();
  }
  
}