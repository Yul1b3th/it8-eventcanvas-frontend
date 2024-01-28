import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';

import { Event } from "../../../interfaces/calendar.interface";
import { EventsService } from '../../../services/calendar.service';


export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-add',
  standalone: true,
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
  templateUrl: './add.component.html',
  styleUrl: './add.component.scss'
})

export class AddComponent {

  public color?: string = '#ffffff';

  public eventForm = new FormGroup({
    title: new FormControl<string>(''),
    description: new FormControl<string>(''),
    location: new FormControl<string>(''),
    color: new FormControl<string>('this.color'),
    start: new FormControl<string>(''),
    end: new FormControl<string>(''),
  });

  constructor(
    public eventsService: EventsService,
    public dialogRef: MatDialogRef<AddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    // Inicializar los campos 'start' y 'end' con la fecha y hora seleccionada
    const initialDateTime = this.getDateTimeForInput(data.date);
    this.eventForm.get('start')?.setValue(initialDateTime);
    this.eventForm.get('end')?.setValue(initialDateTime);
  }

  getDateTimeForInput(dateStr: string): string {
    const date = new Date(dateStr);
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}T00:00`;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    if (this.eventForm.valid) {
      const startValue = this.eventForm.get('start')?.value;
      const endValue = this.eventForm.get('end')?.value;

      const startDate = startValue && !isNaN(Date.parse(startValue)) ? new Date(startValue) : new Date();
      const endDate = endValue && !isNaN(Date.parse(endValue)) ? new Date(endValue) : new Date();

      const newEvent: Event = {
        title: this.eventForm.get('title')?.value || null,
        description: this.eventForm.get('description')?.value || null,
        location: this.eventForm.get('location')?.value || null,
        color: this.eventForm.get('color')?.value || null,
        start_date: startDate.toISOString(),
        end_date: endDate.toISOString(),
        all_day: true,
        state: true,
      };

      this.eventsService.addEvent(newEvent).subscribe(
        (event) => {
          console.log('Evento añadido:', event);
          this.dialogRef.close(event);
        },
        (error) => {
          console.error('Error al añadir el evento:', error);
        }
      );
    }
  }

}
