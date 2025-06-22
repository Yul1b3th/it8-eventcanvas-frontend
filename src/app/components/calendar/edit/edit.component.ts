import { Component, Inject } from '@angular/core';

import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

export interface DialogData {
  animal: string;
  name: string;
}


@Component({
    selector: 'app-edit',
    imports: [
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        MatButtonModule,
        MatDialogTitle,
        MatDialogContent,
        MatDialogActions,
        MatDialogClose,
    ],
    templateUrl: './edit.component.html',
    styleUrl: './edit.component.scss'
})
export class EditComponent {
  constructor(public dialogRef: MatDialogRef<EditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) { }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
