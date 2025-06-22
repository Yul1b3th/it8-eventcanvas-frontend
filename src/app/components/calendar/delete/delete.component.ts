import { Component, Inject, OnInit } from '@angular/core';

import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';

import { Event } from "../../../interfaces/calendar.interface";
import { EventsService } from '../../../services/calendar.service';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'app-delete',
    imports: [
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatDialogTitle,
        MatDialogContent,
        MatDialogActions,
        MatDialogClose,
        MatIconModule,
        MatSelectModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    templateUrl: './delete.component.html',
    styleUrl: './delete.component.scss'
})

export class DeleteComponent implements OnInit {
  public eventForm = new FormGroup({
    title: new FormControl<string>(''),
    description: new FormControl<string>(''),
    location: new FormControl<string>(''),
    color: new FormControl<string>(''),
    start: new FormControl<string>(''),
    end: new FormControl<string>(''),
  });

  constructor(
    public dialogRef: MatDialogRef<DeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Event,
  ) { }

  ngOnInit() {
    const startDate = new Date(this.data.start_date || Date.now());
    const startDateFormatted = startDate.toISOString().substring(0, 16);

    const endDate = new Date(this.data.end_date || Date.now());
    const endDateFormatted = endDate.toISOString().substring(0, 16);

    this.eventForm.setValue({
      title: this.data.title || '',
      description: this.data.description || '',
      location: this.data.location || '',
      color: this.data.color || '',
      start: startDateFormatted,
      end: endDateFormatted,
    });
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onConfirmDelete(): void {
    this.dialogRef.close('DELETE');
  }

  onConfirmEdit(): void {
    const updatedEvent = {
      ...this.data,
      ...this.eventForm.value,
    };
    this.dialogRef.close(updatedEvent);
  }
}
