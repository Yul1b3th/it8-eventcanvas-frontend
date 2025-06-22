import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';


@Component({
    selector: 'app-categories-filter',
    imports: [CommonModule, FormsModule,],
    templateUrl: './categories-filter.component.html',
    styleUrl: './categories-filter.component.scss'
})

export class CategoriesFilterComponent {
  @Output() filterChange = new EventEmitter<Record<string, boolean>>();

  categories = ['garages', 'info points', 'parkings'];
  filter: Record<string, boolean> = {
    garages: true,
    'info points': true,
    parkings: true,
  };

  onFilterChange() {
    this.filterChange.emit(this.filter);
  }
}
