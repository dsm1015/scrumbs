import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormField } from '@angular/material/form-field';
  
@Component({
  selector: 'app-project-dialog',
  templateUrl: 'project-dialog.component.html',
})
export class ProjectDialogComponent {
  
  constructor(
    public dialogRef: MatDialogRef<ProjectDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }
  
  onCancel(): void {
    this.dialogRef.close();
  }
  
}