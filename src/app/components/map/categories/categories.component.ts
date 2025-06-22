// categories.component.ts

import { Component, Inject } from '@angular/core';

import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';



import { AppMarker } from '../../../interfaces/map.interfaces';

@Component({
    selector: 'app-categories',
    imports: [
        MatAutocompleteModule,
        MatButtonModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
    ],
    templateUrl: './categories.component.html',
    styleUrl: './categories.component.scss'
})

export class CategoriesComponent {
  selectedCategory?: string;

  constructor(
    public dialogRef: MatDialogRef<CategoriesComponent>,
    @Inject(MAT_DIALOG_DATA) public appMarker: AppMarker,
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onConfirm(): void {
    this.dialogRef.close(this.selectedCategory); // Asegúrate de cerrar el diálogo y pasar la categoría seleccionada
  }
}

